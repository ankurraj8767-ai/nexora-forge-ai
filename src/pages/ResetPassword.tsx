import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, ArrowLeft, Check, Loader2 } from 'lucide-react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#000' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, var(--accent-gold), transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative w-full max-w-md" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '2.5rem' }}>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
            <span className="text-sm font-semibold tracking-[0.08em] text-white">NEXORA</span>
          </Link>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Reset password
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Enter your email to receive a reset link
          </p>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <Check className="w-6 h-6" style={{ color: '#22c55e' }} />
            </div>
            <p className="text-white mb-2">Reset link sent!</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Check your inbox for instructions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-lg text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none" style={{ padding: '0.75rem 0.75rem 0.75rem 2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.95rem' }} required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60" style={{ background: 'var(--accent-gold)', color: '#000' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
            </button>
          </form>
        )}

        <Link to="/login" className="flex items-center justify-center gap-2 mt-6 text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
