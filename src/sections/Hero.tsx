import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MetaballCanvas from '../components/MetaballCanvas';
import { ChevronDown, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '50% top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === heroRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      <MetaballCanvas />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 35%, transparent 60%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <p
          className="uppercase tracking-[0.15em] mb-6"
          style={{
            color: 'var(--accent-gold)',
            fontSize: '0.85rem',
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: '0.15em',
          }}
        >
          GENERATIVE AI PLATFORM
        </p>

        <h1
          className="text-white"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            textShadow: '0 2px 40px rgba(0,0,0,0.5)',
          }}
        >
          Create Anything
        </h1>

        <p
          className="mt-6 max-w-[560px] mx-auto"
          style={{
            fontSize: '1.25rem',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          Transform your ideas into stunning visuals with AI-powered image generation, video synthesis, and creative tools.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="btn-primary"
            style={{ padding: '0.85rem 2rem', fontSize: '1.05rem', fontWeight: 600 }}
          >
            Start Creating
          </Link>
          <button
            className="btn-secondary flex items-center gap-2"
            style={{ padding: '0.85rem 2rem', fontSize: '1.05rem', fontWeight: 600 }}
          >
            <Play className="w-4 h-4" />
            Watch Demo
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ animation: 'bounce-gentle 2s ease-in-out infinite', color: 'rgba(255,255,255,0.4)' }}
      >
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}
