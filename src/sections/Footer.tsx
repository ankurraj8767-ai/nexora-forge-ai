import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, MessageCircle } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Image Gen', href: '/dashboard' },
    { label: 'Video Gen', href: '/dashboard' },
    { label: 'Prompt Enhancer', href: '/dashboard' },
    { label: 'API Docs', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '4rem 0 2rem',
      }}
    >
      <div className="content-container section-padding">
        <div
          className="grid gap-8 mb-12"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
        >
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
              <span
                className="text-sm font-semibold tracking-[0.08em]"
                style={{ color: '#fff' }}
              >
                NEXORA
              </span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Generative AI platform for creators. Create. Animate. Scale.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="mb-4 font-medium"
                style={{
                  color: '#fff',
                  fontSize: '0.9rem',
                  letterSpacing: '0.01em',
                }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="transition-colors duration-200 hover:text-white"
                      style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em' }}>
            2025 Nexora AI. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[
              { icon: Twitter, label: 'Twitter' },
              { icon: Github, label: 'GitHub' },
              { icon: MessageCircle, label: 'Discord' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="transition-colors duration-200 hover:text-white"
                style={{ color: 'var(--text-muted)' }}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
