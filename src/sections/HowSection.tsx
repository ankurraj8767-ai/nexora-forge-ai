import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: 'Describe Your Vision', desc: 'Type a detailed description of what you want to create. The more specific, the better the result.' },
  { title: 'Choose Your Tool', desc: 'Select from image generation, video synthesis, or any of our specialized creative tools.' },
  { title: 'AI Works Its Magic', desc: 'Our models process your prompt using state-of-the-art diffusion and transformer architectures.' },
  { title: 'Refine & Customize', desc: 'Adjust parameters, iterate on variations, and fine-tune until it\'s perfect.' },
  { title: 'Export & Share', desc: 'Download in your preferred format or share directly to your favorite platform.' },
];

export default function HowSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const path = section.querySelector<SVGPathElement>('.how-path');
    const nodes = section.querySelectorAll<SVGCircleElement>('.how-node');
    const stepEls = section.querySelectorAll<HTMLElement>('.how-step');

    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    stepEls.forEach(step => {
      step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      step.style.opacity = '0.3';
      step.style.transform = 'translateY(20px)';
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            nodes.forEach((node, i) => {
              const threshold = (i + 1) / (nodes.length + 1);
              if (progress >= threshold) {
                node.classList.add('visible');
              } else {
                node.classList.remove('visible');
              }
            });

            stepEls.forEach((step, i) => {
              const threshold = (i + 1) / (stepEls.length + 1);
              if (progress >= threshold) {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
              } else {
                step.style.opacity = '0.3';
                step.style.transform = 'translateY(20px)';
              }
            });
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative flex items-center"
      style={{ background: '#000', padding: '6rem 0', minHeight: '100vh' }}
    >
      <div className="content-container section-padding w-full">
        <div className="text-center mb-12">
          <p
            className="uppercase mb-3"
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: 'var(--accent-gold)',
            }}
          >
            HOW IT WORKS
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            From prompt to masterpiece
          </h2>
        </div>

        <div
          className="grid items-center gap-8"
          style={{ gridTemplateColumns: '1fr 1fr', maxWidth: 1100, margin: '0 auto' }}
        >
          <div className="relative flex items-center justify-center">
            <svg
              className="how-svg"
              viewBox="0 0 376 1080"
              preserveAspectRatio="xMidYMid slice"
              style={{
                width: '100%',
                maxWidth: 400,
                height: 'auto',
                overflow: 'visible',
                display: 'block',
                margin: '0 auto',
              }}
            >
              <defs>
                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4a853" />
                  <stop offset="33%" stopColor="#7c5cff" />
                  <stop offset="66%" stopColor="#e91e8c" />
                  <stop offset="100%" stopColor="#d4a853" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0"
                    result="glowAlpha"
                  />
                  <feMerge>
                    <feMergeNode in="glowAlpha" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                className="how-path"
                d="M 350 0 L 350 100 Q 350 200 250 200 L 120 200 Q 20 200 20 300 L 20 350 Q 20 450 120 450 L 250 450 Q 350 450 350 550 L 350 600 Q 350 700 250 700 L 120 700 Q 20 700 20 800 L 20 850 Q 20 950 120 950 L 200 950 Q 300 950 300 1050 L 300 1080"
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#glow)"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  vectorEffect: 'non-scaling-stroke',
                  willChange: 'stroke-dashoffset',
                }}
              />

              <circle className="how-node" cx="350" cy="100" r="20" />
              <circle className="how-node" cx="20" cy="350" r="20" />
              <circle className="how-node" cx="350" cy="600" r="20" />
              <circle className="how-node" cx="20" cy="850" r="20" />
              <circle className="how-node" cx="300" cy="1050" r="15" />
            </svg>
          </div>

          <div className="flex flex-col" style={{ gap: '4rem' }}>
            {steps.map((step, i) => (
              <div key={i} className="how-step" style={{ maxWidth: 400 }}>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    color: '#fff',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .how-node {
          fill: #000;
          stroke: #d4a853;
          stroke-width: 2;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform, opacity;
        }
        .how-node.visible {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </section>
  );
}
