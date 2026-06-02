import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uMetaballs[6];
uniform int uMetaballCount;
uniform float uBlobRadius;
uniform float uGlassThickness;
uniform float uChromaSpread;
uniform float uIridescenceScale;
uniform float uCausticIntensity;

varying vec2 vUv;

float metaballField(vec2 p, out vec3 metaColor) {
  float field = 0.0;
  vec3 colAcc = vec3(0.0);
  for (int i = 0; i < 6; i++) {
    vec3 mb = uMetaballs[i];
    vec2 center = mb.xy;
    float radius = mb.z * uBlobRadius;
    float d = length(p - center);
    float f = radius * radius / (d * d + 0.0001);
    field += f;
    float t = clamp(d / radius, 0.0, 1.0);
    vec3 mCol = 0.5 + 0.5 * cos(vec3(0.0, 1.0, 2.0) + float(i) * 1.2 + center.x * 3.0);
    colAcc += mCol * f;
  }
  metaColor = colAcc / max(field, 0.001);
  return field;
}

vec2 glassRefraction(vec2 uv, vec2 normal, float thickness) {
  vec3 refract = refract(vec3(0.0, 0.0, 1.0), vec3(normal, 0.3), 0.75);
  return (refract.xy * thickness * 0.1);
}

vec4 chromaticOffset(vec2 uv, vec2 refractDir, float spread) {
  vec3 r = vec3(0.92, 0.85, 0.78) * (1.0 + spread * 0.5);
  vec3 g = vec3(0.88, 0.82, 0.72);
  vec3 b = vec3(0.85, 0.78, 0.68) * (1.0 - spread * 0.3);
  return vec4(
    r.x + refractDir.x * 0.02,
    g.y + refractDir.y * 0.01,
    b.z + refractDir.x * 0.01,
    1.0
  );
}

vec3 iridescence(vec2 uv, vec2 normal, float t) {
  float angle = atan(normal.y, normal.x);
  float film = sin(angle * 3.0 + t * 0.5) * sin(length(normal) * 10.0 - t * 0.3);
  vec3 rainbow = 0.5 + 0.5 * cos(vec3(0.0, 1.0, 2.0) + film * 6.0 + t * 0.2);
  return rainbow * (1.0 - length(normal));
}

vec3 causticHighlight(vec2 p, vec3 metaColor, float t) {
  float c = 0.0;
  for (int i = 0; i < 6; i++) {
    vec3 mb = uMetaballs[i];
    float d = length(p - mb.xy);
    float r = mb.z * uBlobRadius;
    c += pow(max(0.0, sin(d * 15.0 - t * 2.0) * 0.5 + 0.5), 8.0) * smoothstep(r * 2.0, 0.0, d);
  }
  return metaColor * c * uCausticIntensity;
}

vec2 glassSurface(vec2 p, float field, float t) {
  float eps = 0.002;
  vec3 tmp;
  float dx = metaballField(p + vec2(eps, 0.0), tmp) - field;
  float dy = metaballField(p + vec2(0.0, eps), tmp) - field;
  return normalize(vec2(dx, dy) / eps);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = (gl_FragCoord.xy - uResolution * 0.5) / min(uResolution.x, uResolution.y);
  vec2 mInfluence = (uMouse - 0.5) * 0.3;
  vec3 tmp = vec3(0.0);
  float field = metaballField(p, tmp);
  float threshold = float(uMetaballCount) * 0.5;
  float glassEdge = smoothstep(threshold - 0.5, threshold + 0.5, field);
  vec2 glassNormal = glassSurface(p, field, uTime) + vec2(mInfluence * 2.0);
  vec3 col = vec3(0.0);

  if (glassEdge > 0.01) {
    vec3 metaColor;
    metaballField(p, metaColor);
    vec2 refractDir = glassRefraction(uv, glassNormal, uGlassThickness);
    vec4 chromResult = chromaticOffset(uv, refractDir, uChromaSpread);
    vec3 glassColor = vec3(0.92, 0.85, 0.78);
    glassColor += vec3(0.08, 0.06, 0.04) * length(glassNormal);
    glassColor += iridescence(uv, glassNormal, uTime) * uIridescenceScale * 0.3;
    glassColor += causticHighlight(p, metaColor, uTime);
    float fresnel = pow(1.0 - abs(dot(normalize(vec3(glassNormal, 1.0)), vec3(0.0, 0.0, 1.0))), 3.0);
    vec3 dispersion = vec3(fresnel * 1.0, fresnel * 0.9, fresnel * 0.8) * uChromaSpread * 5.0;
    float innerGlow = smoothstep(threshold + 2.0, threshold, field) * 0.15;
    vec3 transmit = (glassColor + dispersion) * (0.7 + innerGlow);
    col += transmit * glassEdge;
    float rimLight = pow(abs(sin(p.x * 2.0 + uTime * 0.5 + p.y * 3.0)), 8.0) * 0.8;
    col += vec3(1.0, 0.95, 0.85) * rimLight * glassEdge * fresnel * 0.4;
    col += vec3(1.0, 0.98, 0.92) * pow(max(dot(normalize(vec3(glassNormal, 1.0)), normalize(vec3(0.3, 0.5, 1.0))), 0.0), 64.0) * glassEdge * 0.6;
  }

  col += vec3(0.15, 0.18, 0.25) * (1.0 - glassEdge) * smoothstep(threshold + 0.5, threshold - 0.3, field);
  col += vec3(0.9, 0.8, 0.65) * smoothstep(0.05, 0.0, abs(glassEdge - 0.5)) * 0.3;
  col *= (0.98 + fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + uTime) * 43758.5453) * 0.04);
  col *= smoothstep(0.0, 1.0, 1.0 - dot(p, p) * 0.4);
  col = col / (col + vec3(0.8)) * 1.3;
  gl_FragColor = vec4(pow(max(col, vec3(0.0)), vec3(0.95)), 1.0);
}
`;

const orbitData = [
  { baseR: 0.28, offsetPhase: 0.0, yAmp: 0.15, yFreq: 0.5, xAmp: 0.1 },
  { baseR: 0.18, offsetPhase: 2.094, yAmp: 0.1, yFreq: 0.7, xAmp: 0.08 },
  { baseR: 0.15, offsetPhase: 4.188, yAmp: 0.12, yFreq: 0.6, xAmp: 0.06 },
  { baseR: 0.13, offsetPhase: 1.047, yAmp: 0.08, yFreq: 0.9, xAmp: 0.12 },
  { baseR: 0.1, offsetPhase: 3.142, yAmp: 0.14, yFreq: 0.4, xAmp: 0.09 },
  { baseR: 0.08, offsetPhase: 5.236, yAmp: 0.11, yFreq: 0.8, xAmp: 0.07 },
];

export default function MetaballCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const uniforms: Record<string, THREE.IUniform> = {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMetaballs: { value: Array(6).fill(new THREE.Vector3(0.5, 0.5, 0.1)) },
      uMetaballCount: { value: 6 },
      uSpeed: { value: 0.12 },
      uBlobRadius: { value: 0.55 },
      uGlassThickness: { value: 0.9 },
      uChromaSpread: { value: 0.045 },
      uIridescenceScale: { value: 0.35 },
      uCausticIntensity: { value: 0.55 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    const clock = new THREE.Clock();
    const mousePos = { x: 0.5, y: 0.5 };
    const mouseTarget = { x: 0.5, y: 0.5 };

    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.x = e.clientX / window.innerWidth;
      mouseTarget.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;

      mousePos.x += (mouseTarget.x - mousePos.x) * 0.08;
      mousePos.y += (mouseTarget.y - mousePos.y) * 0.08;
      material.uniforms.uMouse.value.set(mousePos.x, mousePos.y);

      const mbArray: THREE.Vector3[] = [];
      const speed = material.uniforms.uSpeed.value as number;
      const blobRadius = material.uniforms.uBlobRadius.value as number;

      for (let i = 0; i < 6; i++) {
        const od = orbitData[i];
        const angle = t * speed + od.offsetPhase;
        const posX = 0.5 + Math.cos(angle) * (od.baseR + od.xAmp) + (mousePos.x - 0.5) * 0.15;
        const posY = 0.5 + Math.sin(angle * od.yFreq) * od.yAmp + (mousePos.y - 0.5) * 0.1;
        const radius = blobRadius * (0.4 + od.baseR * 0.6);
        mbArray.push(new THREE.Vector3(posX, posY, radius));
      }
      material.uniforms.uMetaballs.value = mbArray;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
}
