import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 'Free',
    period: '',
    description: 'Perfect for getting started',
    features: [
      '15 Video Generations',
      '30 Image Generations',
      'Watermark Enabled',
      'Standard Queue',
      'Basic Support',
    ],
    highlighted: false,
    cta: 'Get Started',
  },
  {
    name: 'Starter',
    price: '\u20b999',
    period: '/mo',
    description: 'Best for growing creators',
    features: [
      '200 Video Generations/mo',
      '500 Image Generations/mo',
      'HD Export',
      'No Watermark',
      'Faster Queue',
    ],
    highlighted: true,
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '\u20b9299',
    period: '/mo',
    description: 'For professional creators',
    features: [
      'Unlimited Generations',
      'Premium Models',
      'Priority Queue',
      'No Watermark',
      'Commercial Usage Rights',
    ],
    highlighted: false,
    cta: 'Get Pro',
  },
];

export default function Pricing() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section
      id="pricing"
      style={{ background: '#000', padding: '6rem 0' }}
    >
      <div className="content-container section-padding">
        <div className="text-center mb-16">
          <p
            className="uppercase mb-3"
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              color: 'var(--accent-gold)',
            }}
          >
            PRICING
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
            Choose your creative plan
          </h2>
        </div>

        <div
          ref={ref}
          className="grid gap-6 justify-center"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className="relative flex flex-col"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: plan.highlighted
                  ? '1px solid rgba(212,168,83,0.3)'
                  : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                padding: '2.5rem',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                boxShadow: plan.highlighted
                  ? '0 0 40px rgba(212,168,83,0.08)'
                  : 'none',
              }}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'var(--accent-gold)', color: '#000' }}
                >
                  Most Popular
                </div>
              )}

              <h3
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 400,
                  color: plan.highlighted ? 'var(--accent-gold)' : '#fff',
                  marginBottom: '0.5rem',
                }}
              >
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-2">
                <span
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 300,
                    color: plan.highlighted ? 'var(--accent-gold)' : '#fff',
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  {plan.period}
                </span>
              </div>

              <p
                className="mb-6"
                style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}
              >
                {plan.description}
              </p>

              <ul className="flex flex-col gap-3 mb-8 flex-grow">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--accent-gold)' }}
                    />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: plan.highlighted ? 'var(--accent-gold)' : 'transparent',
                  color: plan.highlighted ? '#000' : '#fff',
                  border: plan.highlighted ? 'none' : '1px solid rgba(255,255,255,0.2)',
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
