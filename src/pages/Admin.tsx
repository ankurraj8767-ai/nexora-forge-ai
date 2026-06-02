import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../sections/Navigation';
import {
  Users, CreditCard, BarChart3, Shield, TrendingUp, Image, Video,
  DollarSign, Activity, Search, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '12,847', change: '+12.5%', up: true, icon: Users, color: '#d4a853' },
  { label: 'Revenue', value: '\u20b93.2L', change: '+23.1%', up: true, icon: DollarSign, color: '#22c55e' },
  { label: 'Images Generated', value: '1.2M', change: '+45.2%', up: true, icon: Image, color: '#7c5cff' },
  { label: 'Videos Generated', value: '89K', change: '+18.7%', up: true, icon: Video, color: '#e91e8c' },
  { label: 'Active Now', value: '342', change: '+5.3%', up: true, icon: Activity, color: '#3b82f6' },
  { label: 'Conversion', value: '8.4%', change: '-1.2%', up: false, icon: TrendingUp, color: '#f59e0b' },
];

const users = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', plan: 'Pro', joined: '2025-01-15', images: 1240, videos: 89, status: 'active' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', plan: 'Starter', joined: '2025-02-20', images: 340, videos: 12, status: 'active' },
  { id: 3, name: 'Amit Kumar', email: 'amit@example.com', plan: 'Free', joined: '2025-03-05', images: 28, videos: 2, status: 'active' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', plan: 'Pro', joined: '2024-12-10', images: 5670, videos: 423, status: 'premium' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', plan: 'Starter', joined: '2025-04-01', images: 156, videos: 8, status: 'active' },
  { id: 6, name: 'Anjali Mehta', email: 'anjali@example.com', plan: 'Free', joined: '2025-04-15', images: 15, videos: 0, status: 'trial' },
  { id: 7, name: 'Deepak Joshi', email: 'deepak@example.com', plan: 'Pro', joined: '2024-11-20', images: 8920, videos: 678, status: 'premium' },
  { id: 8, name: 'Kavita Reddy', email: 'kavita@example.com', plan: 'Starter', joined: '2025-03-25', images: 245, videos: 18, status: 'active' },
];

const payments = [
  { id: 'pay_1a2b3c', user: 'Rahul Sharma', plan: 'Pro', amount: 299, date: '2025-06-01', status: 'completed' },
  { id: 'pay_4d5e6f', user: 'Priya Patel', plan: 'Starter', amount: 99, date: '2025-06-01', status: 'completed' },
  { id: 'pay_7g8h9i', user: 'Sneha Gupta', plan: 'Pro', amount: 299, date: '2025-05-30', status: 'completed' },
  { id: 'pay_0j1k2l', user: 'Vikram Singh', plan: 'Starter', amount: 99, date: '2025-05-29', status: 'pending' },
  { id: 'pay_3m4n5o', user: 'Deepak Joshi', plan: 'Pro', amount: 299, date: '2025-05-28', status: 'completed' },
  { id: 'pay_6p7q8r', user: 'Kavita Reddy', plan: 'Starter', amount: 99, date: '2025-05-28', status: 'completed' },
];

type TabType = 'overview' | 'users' | 'payments' | 'analytics';

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs: { id: TabType; label: string; icon: typeof Users }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#000' }}>
      <Navigation />

      <div className="pt-[60px]">
        {/* Admin Header */}
        <div
          className="px-4 lg:px-8 py-6"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(212,168,83,0.1)', border: '1px solid rgba(212,168,83,0.2)' }}
              >
                <Shield className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
              </div>
              <div>
                <h1 className="text-xl font-light text-white">Admin Panel</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Logged in as {user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>System Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 lg:px-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap"
                  style={{
                    color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
                    borderBottom: activeTab === tab.id ? '2px solid var(--accent-gold)' : '2px solid transparent',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-8 py-8 max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: `${stat.color}15` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: stat.color }} />
                        </div>
                        <div
                          className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                          style={{
                            color: stat.up ? '#22c55e' : '#ef4444',
                            background: stat.up ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                          }}
                        >
                          {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stat.change}
                        </div>
                      </div>
                      <p className="text-2xl font-light text-white mb-1">{stat.value}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div
                  className="rounded-xl p-6"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h3 className="text-white font-medium mb-4">Revenue Overview</h3>
                  <div className="flex items-end justify-between h-40 gap-2">
                    {[35, 52, 45, 68, 55, 78, 62, 85, 72, 90, 88, 95].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t transition-all duration-500"
                          style={{
                            height: `${h * 1.5}px`,
                            background: i === 11 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.08)',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
                      <span key={m} className="text-xs" style={{ color: 'var(--text-muted)' }}>{m}</span>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-xl p-6"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h3 className="text-white font-medium mb-4">Plan Distribution</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Free', value: 8420, total: 12847, color: '#666' },
                      { label: 'Starter', value: 3127, total: 12847, color: '#7c5cff' },
                      { label: 'Pro', value: 1300, total: 12847, color: '#d4a853' },
                    ].map(plan => (
                      <div key={plan.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{plan.label}</span>
                          <span className="text-sm font-medium text-white">{((plan.value / plan.total) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${(plan.value / plan.total) * 100}%`, background: plan.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h3 className="text-white font-medium">All Users</h3>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search users..."
                    className="w-full sm:w-64 rounded-lg text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none"
                    style={{
                      padding: '0.5rem 0.75rem 0.5rem 2rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['User', 'Plan', 'Joined', 'Images', 'Videos', 'Status'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'var(--accent-gold)', color: '#000' }}>
                              {u.name[0]}
                            </div>
                            <div>
                              <p className="text-sm text-white">{u.name}</p>
                              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              background: u.plan === 'Pro' ? 'rgba(212,168,83,0.15)' : u.plan === 'Starter' ? 'rgba(124,92,255,0.15)' : 'rgba(255,255,255,0.05)',
                              color: u.plan === 'Pro' ? 'var(--accent-gold)' : u.plan === 'Starter' ? 'var(--accent-purple)' : 'var(--text-muted)',
                            }}
                          >
                            {u.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{u.joined}</td>
                        <td className="px-4 py-3 text-sm text-white">{u.images.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-white">{u.videos.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{
                              background: u.status === 'premium' ? '#d4a853' : u.status === 'trial' ? '#f59e0b' : '#22c55e'
                            }} />
                            <span className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>{u.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="p-4">
                <h3 className="text-white font-medium">Recent Payments</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['Payment ID', 'User', 'Plan', 'Amount', 'Date', 'Status'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(p => (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td className="px-4 py-3 text-sm font-mono" style={{ color: 'var(--accent-gold)' }}>{p.id}</td>
                        <td className="px-4 py-3 text-sm text-white">{p.user}</td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium" style={{
                            background: p.plan === 'Pro' ? 'rgba(212,168,83,0.15)' : 'rgba(124,92,255,0.15)',
                            color: p.plan === 'Pro' ? 'var(--accent-gold)' : 'var(--accent-purple)',
                          }}>{p.plan}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-white">&#8377;{p.amount}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{p.date}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.status === 'completed' ? '#22c55e' : '#f59e0b' }} />
                            <span style={{ color: 'var(--text-secondary)' }} className="capitalize">{p.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-white font-medium mb-4">Usage Trends</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Text to Image', usage: 45, color: '#d4a853' },
                    { label: 'Text to Video', usage: 23, color: '#7c5cff' },
                    { label: 'Image to Video', usage: 15, color: '#e91e8c' },
                    { label: 'AI Thumbnail', usage: 8, color: '#22c55e' },
                    { label: 'Instagram Post', usage: 5, color: '#f472b6' },
                    { label: 'Others', usage: 4, color: '#666' },
                  ].map(tool => (
                    <div key={tool.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{tool.label}</span>
                        <span className="text-sm text-white">{tool.usage}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="h-full rounded-full" style={{ width: `${tool.usage}%`, background: tool.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-white font-medium mb-4">Platform Health</h3>
                <div className="space-y-4">
                  {[
                    { label: 'API Latency', value: '124ms', status: 'good' },
                    { label: 'Queue Length', value: '23', status: 'good' },
                    { label: 'Error Rate', value: '0.02%', status: 'good' },
                    { label: 'Uptime', value: '99.97%', status: 'good' },
                    { label: 'Storage', value: '68% used', status: 'warning' },
                  ].map(metric => (
                    <div key={metric.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white font-medium">{metric.value}</span>
                        <div className="w-2 h-2 rounded-full" style={{ background: metric.status === 'good' ? '#22c55e' : '#f59e0b' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
