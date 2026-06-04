import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Zap,
  Sparkles,
  Image,
  Video,
  Wand2,
  Code,
  Mic,
  LayoutDashboard,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const navLinks = [
  { name: 'Home', href: '/', icon: Zap },
  { name: 'Features', href: '/#features', icon: Sparkles },
  { name: 'Gallery', href: '/gallery', icon: Image },
  { name: 'Pricing', href: '/#pricing', icon: Video },
];

const toolLinks = [
  { name: 'Text to Image', href: '/dashboard?tool=text-to-image', icon: Image },
  { name: 'Text to Video', href: '/dashboard?tool=text-to-video', icon: Video },
  { name: 'Image to Video', href: '/dashboard?tool=image-to-video', icon: Wand2 },
  { name: 'AI Thumbnail', href: '/dashboard?tool=thumbnail', icon: Sparkles },
  { name: 'Instagram Post', href: '/dashboard?tool=instagram', icon: Image },
  { name: 'YouTube Title', href: '/dashboard?tool=youtube-title', icon: Video },
  { name: 'YouTube Desc', href: '/dashboard?tool=youtube-desc', icon: Code },
  { name: 'Hashtag Gen', href: '/dashboard?tool=hashtag', icon: Mic },
  { name: 'AI Logo', href: '/dashboard?tool=logo', icon: Sparkles },
  { name: 'Prompt Enhancer', href: '/dashboard?tool=prompt-enhancer', icon: Wand2 },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-indigo flex items-center justify-center group-hover:shadow-neon transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-white">
              Nexora<span className="text-neon-cyan">Forge</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                {link.name}
              </button>
            ))}

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all flex items-center gap-1"
              >
                AI Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 glass rounded-xl overflow-hidden shadow-2xl"
                  >
                    <div className="p-2 grid grid-cols-1 gap-1">
                      {toolLinks.map((tool) => (
                        <Link
                          key={tool.name}
                          to={tool.href}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          onClick={() => setIsToolsOpen(false)}
                        >
                          <tool.icon className="w-4 h-4 text-neon-cyan" />
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border border-white/20" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-indigo to-neon-purple flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-white">{user?.name || 'User'}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-56 glass rounded-xl overflow-hidden shadow-2xl"
                    >
                      <div className="p-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4 text-neon-cyan" />
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                          <User className="w-4 h-4 text-neon-cyan" />
                          Profile
                        </Link>
                        <button
                          onClick={() => { logout(); navigate('/'); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/auth?mode=login"
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-neon-indigo to-neon-purple rounded-xl hover:shadow-neon-indigo transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <link.icon className="w-4 h-4 text-neon-cyan" />
                  {link.name}
                </button>
              ))}
              <div className="pt-2 border-t border-white/10">
                <p className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  AI Tools
                </p>
                {toolLinks.map((tool) => (
                  <Link
                    key={tool.name}
                    to={tool.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <tool.icon className="w-4 h-4 text-neon-cyan" />
                    {tool.name}
                  </Link>
                ))}
              </div>
              <div className="pt-2 border-t border-white/10 flex gap-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-white/5 rounded-lg"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); navigate('/'); }}
                      className="flex-1 px-4 py-3 text-sm font-medium text-red-400 bg-white/5 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth?mode=login"
                      className="flex-1 px-4 py-3 text-sm font-medium text-zinc-300 bg-white/5 rounded-lg text-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth?mode=signup"
                      className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-neon-indigo to-neon-purple rounded-lg text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
