import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layers = container.querySelectorAll<HTMLElement>('.parallax-layer');

    const ctx = gsap.context(() => {
      layers.forEach((layer, index) => {
        const initialScale = 1 + index * 0.15;
        gsap.set(layer, { scale: initialScale });

        gsap.to(layer, {
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 25%',
            end: 'bottom 25%',
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const separation = (index - layers.length / 2) * progress * 0.5;
              gsap.set(layer, {
                scale: initialScale + progress * 0.5,
                x: separation * 20,
                y: separation * 10,
              });
            },
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="atmosphere"
      className="relative w-full overflow-hidden"
      style={{ height: '80vh', background: '#000' }}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div
          className="parallax-images absolute inset-0 flex items-center justify-center"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <img
              key={i}
              src="/images/ai-studio.jpg"
              alt="AI Studio"
              className="parallax-layer absolute inset-0 w-full h-full object-cover"
              style={{
                willChange: 'transform',
                transformOrigin: 'center',
              }}
            />
          ))}
        </div>

        <div
          className="absolute z-10 text-center pointer-events-none"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.7)' }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 400,
              color: '#fff',
              marginBottom: '1rem',
            }}
          >
            A new dimension of creativity
          </h2>
          <p
            className="mx-auto"
            style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 480,
            }}
          >
            Step into a workspace designed for the future of creation.
          </p>
        </div>
      </div>
    </section>
  );
}
