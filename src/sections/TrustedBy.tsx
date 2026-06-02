import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Cpu, Zap, Globe, Layers, Rocket, Shield } from 'lucide-react';

const logos = [
  { icon: Cpu, label: 'TechCorp' },
  { icon: Zap, label: 'Voltix' },
  { icon: Globe, label: 'GlobalAI' },
  { icon: Layers, label: 'Stackify' },
  { icon: Rocket, label: 'LaunchPad' },
  { icon: Shield, label: 'SecureNet' },
];

export default function TrustedBy() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        height: 100,
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div ref={ref} className="flex items-center gap-8 flex-wrap justify-center section-padding">
        <span
          className="hidden sm:block"
          style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            marginRight: '1rem',
          }}
        >
          Trusted by creators at
        </span>
        {logos.map((logo, i) => (
          <div
            key={logo.label}
            className="flex items-center gap-1.5 transition-opacity duration-500"
            style={{
              opacity: isVisible ? 0.4 : 0,
              transitionDelay: `${i * 0.1}s`,
              filter: 'grayscale(1)',
            }}
          >
            <logo.icon className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            <span
              className="text-sm font-medium hidden md:inline"
              style={{ color: 'var(--text-muted)' }}
            >
              {logo.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
