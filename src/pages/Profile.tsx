import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Mail, Calendar, Award,
  Image, Video, ArrowLeft, Edit3, Check, Copy,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Profile() {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [copied, setCopied] = useState(false);

  if (!user) {
    navigate('/auth?mode=login');
    return null;
  }

  const handleSave = () => {
    useStore.getState().updateUser({ name });
    setIsEditing(false);
    useStore.getState().showToast('Profile updated!', 'success');
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Videos Created', value: user.videoUsed, icon: Video, color: 'text-neon-cyan' },
    { label: 'Images Created', value: user.imageUsed, icon: Image, color: 'text-neon-purple' },
    { label: 'Plan', value: user.plan.charAt(0).toUpperCase() + user.plan.slice(1), icon: Award, color: 'text-yellow-400' },
    { label: 'Member Since', value: new Date(user.createdAt).toLocaleDateString(), icon: Calendar, color: 'text-emerald-400' },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 page-content">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-20 h-20 rounded-2xl border-2 border-neon-cyan/30" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-indigo to-neon-purple flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-3 py-1.5 bg-dark-surface border border-white/10 rounded-lg text-white text-lg font-heading font-semibold focus:outline-none focus:border-neon-cyan"
                    />
                    <button onClick={handleSave} className="p-2 text-neon-cyan hover:bg-white/5 rounded-lg">
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="font-heading text-2xl font-bold text-white">{user.name}</h1>
                    <button onClick={() => setIsEditing(true)} className="p-1 text-zinc-500 hover:text-neon-cyan">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <p className="text-zinc-400 text-sm flex items-center gap-1 mt-1">
                  <Mail className="w-3 h-3" /> {user.email}
                </p>
                <span className="inline-block mt-2 px-3 py-1 bg-neon-indigo/20 rounded-full text-xs text-neon-cyan capitalize">
                  {user.plan} Plan
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 bg-white/5 rounded-xl text-center">
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                <p className="text-xs text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Usage */}
          <div className="space-y-4 mb-8">
            <h3 className="font-heading font-semibold text-white">Usage This Month</h3>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-400">Video Generations</span>
                <span className="text-white">{user.videoUsed} / {user.videoLimit}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-indigo rounded-full transition-all"
                  style={{ width: `${Math.min((user.videoUsed / user.videoLimit) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-400">Image Generations</span>
                <span className="text-white">{user.imageUsed} / {user.imageLimit}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-purple to-pink-500 rounded-full transition-all"
                  style={{ width: `${Math.min((user.imageUsed / user.imageLimit) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Referral */}
          <div className="p-4 bg-white/5 rounded-xl mb-8">
            <h3 className="font-heading font-semibold text-white mb-2">Referral Code</h3>
            <p className="text-sm text-zinc-400 mb-3">Share with friends to earn bonus generations!</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={user.referralCode}
                disabled
                className="flex-1 px-4 py-2.5 bg-dark-surface border border-white/10 rounded-lg text-white text-sm font-mono"
              />
              <button
                onClick={copyReferral}
                className="px-4 py-2.5 glass rounded-lg text-zinc-300 hover:text-white transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-neon-cyan" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              to="/dashboard"
              className="flex-1 py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-neon-indigo to-neon-purple rounded-xl hover:shadow-neon-indigo transition-all"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="px-6 py-3 text-sm font-medium text-red-400 glass rounded-xl hover:bg-white/5 transition-all"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
