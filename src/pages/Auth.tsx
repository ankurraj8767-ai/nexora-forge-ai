import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Mail, Lock, User, ArrowRight, Eye, EyeOff,
  Chrome, Github, AlertCircle,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, showToast } = useStore();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'signup' || modeParam === 'login' || modeParam === 'forgot') {
      setMode(modeParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      login({
        uid: `user_${Date.now()}`,
        name: formData.name || 'New User',
        email: formData.email,
        plan: 'free',
        videoUsed: 0,
        imageUsed: 0,
        videoLimit: 15,
        imageLimit: 30,
        createdAt: new Date().toISOString(),
        referralCode: `NEX${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      });
      showToast('Account created successfully!', 'success');
      navigate('/dashboard');
    } else if (mode === 'login') {
      login({
        uid: `user_${Date.now()}`,
        name: 'Demo User',
        email: formData.email,
        photoURL: '/images/avatars/avatar2.jpg',
        plan: 'free',
        videoUsed: 5,
        imageUsed: 12,
        videoLimit: 15,
        imageLimit: 30,
        createdAt: new Date().toISOString(),
        referralCode: `NEX${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      });
      showToast('Welcome back!', 'success');
      navigate('/dashboard');
    } else if (mode === 'forgot') {
      showToast('Password reset link sent to your email!', 'success');
      setMode('login');
    }

    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    login({
      uid: `user_${Date.now()}`,
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      photoURL: `/images/avatars/avatar${Math.floor(Math.random() * 4) + 1}.jpg`,
      plan: 'free',
      videoUsed: 0,
      imageUsed: 0,
      videoLimit: 15,
      imageLimit: 30,
      createdAt: new Date().toISOString(),
      referralCode: `NEX${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    });
    showToast(`Signed in with ${provider}!`, 'success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 page-content">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-indigo flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-white">
              Nexora<span className="text-neon-cyan">Forge</span>
            </span>
          </Link>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 sm:p-8"
        >
          <div className="text-center mb-6">
            <h1 className="font-heading text-2xl font-bold text-white">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              {mode === 'login'
                ? 'Sign in to your account'
                : mode === 'signup'
                ? 'Start creating with AI'
                : 'Enter your email to reset'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-neon-cyan transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-dark-surface border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="Min 6 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setError(''); }}
                  className="text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-neon-indigo to-neon-purple rounded-xl hover:shadow-neon-indigo transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-surface text-zinc-500 rounded">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <Chrome className="w-4 h-4" />
                Google
              </button>
              <button
                onClick={() => handleSocialLogin('GitHub')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </button>
            </div>
          </div>

          {/* Toggle Mode */}
          <div className="mt-6 text-center text-sm text-zinc-400">
            {mode === 'login' ? (
              <>
                Do not have an account?{' '}
                <button
                  onClick={() => { setMode('signup'); setError(''); }}
                  className="text-neon-cyan hover:text-neon-cyan/80 font-medium"
                >
                  Sign up
                </button>
              </>
            ) : mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-neon-cyan hover:text-neon-cyan/80 font-medium"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Remember your password?{' '}
                <button
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-neon-cyan hover:text-neon-cyan/80 font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
