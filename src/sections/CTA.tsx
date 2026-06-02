import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useAuth } from '../context/AuthContext';
import { Sparkles } from 'lucide-react';

export default function CTA() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
  const { isAuthenticated } = useAuth();

  return (
    <section
      className="relative flex items-center justify-center"
      style={{
        minHeight: '60vh',
        background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.08) 0%, transparent 70%)',
        backgroundColor: '#000',
      }}
    >
      <div
        ref={ref}
        className="text-center px-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8"
          style={{
            background: 'linear-gradient(135deg, rgba(212,168,83,0.15), rgba(124,92,255,0.1))',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Sparkles className="w-7 h-7" style={{ color: 'var(--accent-gold)' }} />
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: '1rem',
          }}
        >
          Ready to create?
        </h2>

        <p
          className="mx-auto mb-10"
          style={{
            fontSize: '1.25rem',
            lineHeight: 1.5,
            color: 'var(--text-secondary)',
            maxWidth: 500,
          }}
        >
          Join thousands of creators pushing the boundaries of what's possible with AI.
        </p>

        <Link
          to={isAuthenticated ? '/dashboard' : '/register'}
          className="inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 hover:scale-[1.04]"
          style={{
            background: 'var(--accent-gold)',
            color: '#000',
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            boxShadow: '0 0 40px rgba(212,168,83,0.25)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 60px rgba(212,168,83,0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(212,168,83,0.25)';
          }}
        >
          Start Creating Free
        </Link>
      </div>
    </section>
  );
}
