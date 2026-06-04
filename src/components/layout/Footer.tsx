import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Instagram, Linkedin, MessageCircle, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { name: 'AI Tools', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'API Access', href: '#' },
  ],
  Tools: [
    { name: 'Text to Image', href: '/dashboard?tool=text-to-image' },
    { name: 'Text to Video', href: '/dashboard?tool=text-to-video' },
    { name: 'AI Thumbnail', href: '/dashboard?tool=thumbnail' },
    { name: 'Logo Generator', href: '/dashboard?tool=logo' },
  ],
  Company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  Legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Github', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'WhatsApp', icon: MessageCircle, href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 glass">
      {/* Marquee */}
      <div className="py-6 overflow-hidden border-b border-white/5">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-6xl md:text-8xl font-heading font-bold text-white/5 mx-8 select-none">
              NEXORA
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-indigo flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                Nexora<span className="text-neon-cyan">Forge</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 mb-4">
              Create. Animate. Scale. The future of AI-powered content creation.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-neon-cyan hover:bg-white/10 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-zinc-500 hover:text-neon-cyan transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-600">
            &copy; 2026 Nexora Forge AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Mail className="w-4 h-4" />
            support@nexoraforge.ai
          </div>
        </div>
      </div>
    </footer>
  );
}
