import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Sparkles, LogOut, LayoutDashboard, Shield } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const navLinks = [
    { label: 'Create', onClick: () => scrollToSection('hero') },
    { label: 'Tools', onClick: () => scrollToSection('tools') },
    { label: 'Gallery', onClick: () => scrollToSection('gallery') },
    { label: 'Pricing', onClick: () => scrollToSection('pricing') },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: 60,
        background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="flex items-center justify-between h-full section-padding max-w-[1400px] mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
          <span
            className="text-sm font-semibold tracking-[0.08em] text-white"
            style={{ fontSize: '0.85rem', letterSpacing: '0.08em', fontWeight: 600 }}
          >
            NEXORA
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={link.onClick}
              className="text-sm font-medium transition-colors duration-200 hover:text-white"
              style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.01em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-white"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-white"
                style={{ color: 'var(--text-secondary)' }}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="flex items-center gap-2 ml-2">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" />
                ) : (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: 'var(--accent-gold)', color: '#000' }}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg transition-colors duration-200 hover:bg-white/5"
                style={{ color: 'var(--text-muted)' }}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium transition-colors duration-200 hover:text-white"
                style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold transition-all duration-150 hover:scale-[1.04]"
                style={{ background: 'var(--accent-gold)', color: '#000', fontSize: '0.85rem', fontWeight: 600 }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: 'var(--text-primary)' }}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-3"
          style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={link.onClick}
              className="text-left py-2 text-sm font-medium transition-colors hover:text-white"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </button>
          ))}
          <div className="border-t border-white/10 pt-3 mt-1 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2" style={{ color: 'var(--text-secondary)' }}>
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2" style={{ color: 'var(--text-secondary)' }}>
                    Admin Panel
                  </Link>
                )}
                <button onClick={() => { logout(); setMobileOpen(false); }} className="text-left text-sm font-medium py-2" style={{ color: 'var(--text-muted)' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2" style={{ color: 'var(--text-secondary)' }}>
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold"
                  style={{ background: 'var(--accent-gold)', color: '#000' }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
