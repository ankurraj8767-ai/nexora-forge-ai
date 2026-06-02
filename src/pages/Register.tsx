import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User, Chrome, ArrowRight, Loader2 } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleLogin();
      navigate('/dashboard');
    } catch {
      setError('Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#000' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, var(--accent-gold), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, var(--accent-purple), transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative w-full max-w-md" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '2.5rem' }}>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
            <span className="text-sm font-semibold tracking-[0.08em] text-white">NEXORA</span>
          </Link>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Create your account
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Start creating AI-powered content today
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ background: 'rgba(220,38,38,0.1)', color: '#ef4444', border: '1px solid rgba(220,38,38,0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full rounded-lg text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none" style={{ padding: '0.75rem 0.75rem 0.75rem 2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.95rem' }} required />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-lg text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none" style={{ padding: '0.75rem 0.75rem 0.75rem 2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.95rem' }} required />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" className="w-full rounded-lg text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none" style={{ padding: '0.75rem 0.75rem 0.75rem 2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.95rem' }} required />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm password" className="w-full rounded-lg text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none" style={{ padding: '0.75rem 0.75rem 0.75rem 2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.95rem' }} required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60" style={{ background: 'var(--accent-gold)', color: '#000' }}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 text-xs" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>OR CONTINUE WITH</span>
          </div>
        </div>

        <button onClick={handleGoogle} disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-sm transition-all duration-200 hover:bg-white/5 disabled:opacity-60" style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}>
          <Chrome className="w-4 h-4" /> Google
        </button>

        <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-medium" style={{ color: 'var(--accent-gold)' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
