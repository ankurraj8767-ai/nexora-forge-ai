import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Image, Video, Wand2, Sparkles, Instagram, Youtube,
  Type, Hash, PenTool, Lightbulb, LayoutDashboard, Settings,
  LogOut, User, CreditCard, History, Star, Download, Share2,
  Copy, Check, X, Menu,
  Trash2, Loader2, ImagePlus, Globe,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

/* ---------- Tool Configuration ---------- */
const tools = [
  { id: 'text-to-image', name: 'Text to Image', icon: Image, color: 'from-neon-cyan to-teal-400', desc: 'Generate images from text descriptions' },
  { id: 'text-to-video', name: 'Text to Video', icon: Video, color: 'from-neon-indigo to-purple-500', desc: 'Create videos from text prompts' },
  { id: 'image-to-video', name: 'Image to Video', icon: Wand2, color: 'from-pink-500 to-rose-400', desc: 'Animate still images' },
  { id: 'thumbnail', name: 'AI Thumbnail', icon: Sparkles, color: 'from-amber-400 to-orange-500', desc: 'YouTube thumbnail generator' },
  { id: 'instagram', name: 'Instagram Post', icon: Instagram, color: 'from-fuchsia-500 to-pink-500', desc: 'Instagram content creator' },
  { id: 'youtube-title', name: 'YouTube Title', icon: Youtube, color: 'from-red-500 to-rose-500', desc: 'Click-worthy title generator' },
  { id: 'youtube-desc', name: 'YouTube Description', icon: Type, color: 'from-emerald-400 to-teal-500', desc: 'SEO description writer' },
  { id: 'hashtag', name: 'Hashtag Generator', icon: Hash, color: 'from-sky-400 to-blue-500', desc: 'Trending hashtag finder' },
  { id: 'logo', name: 'AI Logo', icon: PenTool, color: 'from-violet-500 to-purple-600', desc: 'Professional logo designer' },
  { id: 'prompt-enhancer', name: 'Prompt Enhancer', icon: Lightbulb, color: 'from-yellow-400 to-amber-500', desc: 'Optimize your prompts' },
];

const sidebarItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', name: 'My Projects', icon: History },
  { id: 'favorites', name: 'Favorites', icon: Star },
  { id: 'billing', name: 'Billing', icon: CreditCard },
  { id: 'settings', name: 'Settings', icon: Settings },
];

/* ---------- Mock Generation Results ---------- */
const mockResults: Record<string, string[]> = {
  'text-to-image': ['/images/gallery/gallery1.jpg', '/images/gallery/gallery2.jpg', '/images/gallery/gallery3.jpg'],
  'text-to-video': ['/images/hero/hero1.jpg', '/images/hero/hero2.jpg'],
  'image-to-video': ['/images/hero/hero3.jpg', '/images/hero/hero4.jpg'],
  'thumbnail': ['/images/models/text-to-video.jpg', '/images/models/image.jpg'],
  'instagram': ['/images/gallery/gallery4.jpg', '/images/gallery/gallery5.jpg'],
  'youtube-title': [],
  'youtube-desc': [],
  'hashtag': [],
  'logo': ['/images/models/voice.jpg', '/images/models/code.jpg'],
  'prompt-enhancer': [],
};

const mockTextResults: Record<string, string> = {
  'youtube-title': '10 Mind-Blowing AI Tools That Will Change Your Life Forever | Must Watch 2026',
  'youtube-desc': 'Discover the most incredible AI tools that are revolutionizing content creation in 2026. From text-to-video generation to AI-powered thumbnails, these tools will supercharge your creative workflow.\n\nTimestamps:\n0:00 - Introduction\n1:30 - Tool #1\n3:45 - Tool #2\n\nSubscribe for more!',
  'hashtag': '#AItools #ContentCreation #DigitalMarketing #TechTrends #Innovation #CreatorTools #AIGenerated #FutureTech',
  'prompt-enhancer': 'A highly detailed, photorealistic cyberpunk cityscape at night with neon lights reflecting on wet streets, flying vehicles, holographic advertisements, cinematic lighting, 8k resolution, ultra-wide angle, moody atmosphere, blade runner aesthetic',
};

/* ---------- Sidebar Component ---------- */
function Sidebar({ activeTab, onTabChange, isOpen, onClose }: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user, logout } = useStore();
  const routerNavigate = useNavigate();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass border-r border-white/10 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <button
            onClick={() => routerNavigate('/')}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-indigo flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-white">
              Nexora<span className="text-neon-cyan">Forge</span>
            </span>
          </button>
        </div>

        {/* User */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full border border-white/20" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-indigo to-neon-purple flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-zinc-500 capitalize">{user?.plan || 'Free'} Plan</p>
            </div>
          </div>
          {/* Usage bars */}
          <div className="mt-3 space-y-2">
            <div>
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>Videos</span>
                <span>{user?.videoUsed || 0}/{user?.videoLimit || 15}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-indigo rounded-full transition-all"
                  style={{ width: `${Math.min(((user?.videoUsed || 0) / (user?.videoLimit || 15)) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>Images</span>
                <span>{user?.imageUsed || 0}/{user?.imageLimit || 30}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-purple to-pink-500 rounded-full transition-all"
                  style={{ width: `${Math.min(((user?.imageUsed || 0) / (user?.imageLimit || 30)) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-neon-indigo/20 text-neon-cyan'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => routerNavigate('/gallery')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Globe className="w-4 h-4" />
            Public Gallery
          </button>
          <button
            onClick={() => { logout(); routerNavigate('/'); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-white/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------- Tool Interface ---------- */
function ToolInterface({ toolId }: { toolId: string }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [textResult, setTextResult] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, incrementImageUsage, incrementVideoUsage, canUseImage, canUseVideo, showToast, addProject } = useStore();

  const tool = tools.find((t) => t.id === toolId) || tools[0];
  const isTextTool = ['youtube-title', 'youtube-desc', 'hashtag', 'prompt-enhancer'].includes(toolId);

  const handleGenerate = async () => {
    if (!prompt.trim() && !uploadedImage) {
      showToast('Please enter a prompt or upload an image', 'error');
      return;
    }

    if (toolId === 'text-to-image' || toolId === 'thumbnail' || toolId === 'instagram' || toolId === 'logo') {
      if (!canUseImage()) {
        showToast('Image generation limit reached. Upgrade your plan!', 'error');
        return;
      }
    } else if (toolId === 'text-to-video' || toolId === 'image-to-video') {
      if (!canUseVideo()) {
        showToast('Video generation limit reached. Upgrade your plan!', 'error');
        return;
      }
    }

    setIsGenerating(true);
    setResults([]);
    setTextResult('');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000));

    if (isTextTool) {
      setTextResult(mockTextResults[toolId] || 'Generated content will appear here.');
    } else {
      const mockResult = mockResults[toolId] || ['/images/gallery/gallery1.jpg'];
      setResults(mockResult);
    }

    // Update usage
    if (toolId === 'text-to-image' || toolId === 'thumbnail' || toolId === 'instagram' || toolId === 'logo') {
      incrementImageUsage();
    } else if (toolId === 'text-to-video' || toolId === 'image-to-video') {
      incrementVideoUsage();
    } else {
      incrementImageUsage();
    }

    // Add to projects
    addProject({
      id: `proj_${Date.now()}`,
      userId: user?.uid || 'anon',
      type: tool.name,
      prompt: prompt || 'Image upload',
      status: 'completed',
      createdAt: new Date().toISOString(),
    });

    showToast('Generation complete!', 'success');
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(textResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Copied to clipboard!', 'success');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
          <tool.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-xl text-white">{tool.name}</h2>
          <p className="text-sm text-zinc-400">{tool.desc}</p>
        </div>
      </div>

      {/* Input Area */}
      <div className="glass rounded-2xl p-6 space-y-4">
        {/* Image Upload for image-to-video */}
        {toolId === 'image-to-video' && (
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Upload Image</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            {uploadedImage ? (
              <div className="relative rounded-xl overflow-hidden aspect-video max-h-48">
                <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-2 right-2 p-1 bg-black/60 rounded-lg text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 border-2 border-dashed border-white/20 rounded-xl text-zinc-400 hover:border-neon-cyan hover:text-neon-cyan transition-all flex flex-col items-center gap-2"
              >
                <ImagePlus className="w-8 h-8" />
                <span className="text-sm">Click to upload an image</span>
              </button>
            )}
          </div>
        )}

        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            {isTextTool ? 'Enter Topic or Description' : 'Enter Prompt'}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              toolId === 'text-to-image'
                ? 'A cyberpunk cityscape at night with neon lights...'
                : toolId === 'youtube-title'
                ? 'AI tools for content creators'
                : toolId === 'prompt-enhancer'
                ? 'A beautiful sunset over mountains'
                : 'Describe what you want to create...'
            }
            className="w-full h-32 px-4 py-3 bg-dark-surface border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-neon-cyan resize-none transition-colors"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-3.5 text-sm font-medium text-white bg-gradient-to-r from-neon-indigo to-neon-purple rounded-xl hover:shadow-neon-indigo transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate {tool.name}
            </>
          )}
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {(results.length > 0 || textResult) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-white">Results</h3>
              <span className="text-xs text-zinc-500">{results.length || 1} generated</span>
            </div>

            {isTextTool ? (
              <div className="glass rounded-2xl p-6 relative">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-body">{textResult}</pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 p-2 glass rounded-lg text-zinc-400 hover:text-neon-cyan transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 ${results.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                {results.map((src, i) => (
                  <div key={i} className="glass rounded-2xl overflow-hidden group">
                    <div className="relative aspect-video">
                      <img src={src} alt={`Result ${i + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-base/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform">
                        <button className="flex-1 py-2 bg-white/10 backdrop-blur rounded-lg text-xs text-white flex items-center justify-center gap-1 hover:bg-white/20">
                          <Download className="w-3 h-3" /> Download
                        </button>
                        <button className="flex-1 py-2 bg-white/10 backdrop-blur rounded-lg text-xs text-white flex items-center justify-center gap-1 hover:bg-white/20">
                          <Share2 className="w-3 h-3" /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Projects View ---------- */
function ProjectsView() {
  const { projects, deleteProject } = useStore();

  return (
    <div className="space-y-6">
      <h2 className="font-heading font-semibold text-xl text-white">My Projects</h2>
      {projects.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <History className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No projects yet. Start creating!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-neon-indigo/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-neon-cyan" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{project.type}</p>
                <p className="text-xs text-zinc-500 truncate">{project.prompt}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neon-cyan capitalize">{project.status}</span>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Billing View ---------- */
function BillingView() {
  const { user } = useStore();
  const plans = [
    { name: 'Free', price: '0', features: ['15 Videos', '30 Images', 'Watermark'] },
    { name: 'Starter', price: '99', features: ['200 Videos', '500 Images', 'No Watermark', 'HD Export'] },
    { name: 'Pro', price: '299', features: ['Unlimited', '4K Export', 'API Access', 'Commercial License'] },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-heading font-semibold text-xl text-white">Billing & Plans</h2>

      {/* Current Plan */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-zinc-400">Current Plan</p>
            <p className="text-2xl font-heading font-bold text-white capitalize">{user?.plan || 'Free'}</p>
          </div>
          <div className="px-4 py-2 bg-neon-indigo/20 rounded-lg text-neon-cyan text-sm font-medium">
            Active
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-xs text-zinc-500">Videos Used</p>
            <p className="text-lg font-semibold text-white">{user?.videoUsed || 0} / {user?.videoLimit || 15}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-xs text-zinc-500">Images Used</p>
            <p className="text-lg font-semibold text-white">{user?.imageUsed || 0} / {user?.imageLimit || 30}</p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid sm:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass rounded-xl p-4 ${
              (user?.plan || 'free').toLowerCase() === plan.name.toLowerCase() ? 'ring-2 ring-neon-cyan' : ''
            }`}
          >
            <p className="font-heading font-semibold text-white">{plan.name}</p>
            <p className="text-2xl font-bold text-white mt-1">&{plan.price}<span className="text-sm text-zinc-400">/mo</span></p>
            <ul className="mt-3 space-y-1">
              {plan.features.map((f) => (
                <li key={f} className="text-xs text-zinc-400 flex items-center gap-1">
                  <Check className="w-3 h-3 text-neon-cyan" /> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Settings View ---------- */
function SettingsView() {
  const { user, updateUser } = useStore();
  const [name, setName] = useState(user?.name || '');

  return (
    <div className="space-y-6">
      <h2 className="font-heading font-semibold text-xl text-white">Settings</h2>

      <div className="glass rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-neon-cyan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-xl text-zinc-500 text-sm"
          />
        </div>
        <button
          onClick={() => updateUser({ name })}
          className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-neon-indigo to-neon-purple rounded-xl hover:shadow-neon-indigo transition-all"
        >
          Save Changes
        </button>
      </div>

      {/* Referral */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-heading font-semibold text-white mb-2">Referral Program</h3>
        <p className="text-sm text-zinc-400 mb-4">Share your code and earn bonus generations!</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={user?.referralCode || ''}
            disabled
            className="flex-1 px-4 py-3 bg-dark-surface border border-white/10 rounded-xl text-white text-sm font-mono"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(user?.referralCode || '');
              useStore.getState().showToast('Referral code copied!', 'success');
            }}
            className="px-4 py-3 glass rounded-xl text-zinc-300 hover:text-white transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main Dashboard ---------- */
export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTool, setSelectedTool] = useState(searchParams.get('tool') || 'text-to-image');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const tool = searchParams.get('tool');
    if (tool) {
      setSelectedTool(tool);
      setActiveTab('dashboard');
    }
  }, [searchParams]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen page-content flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-4 p-4 border-b border-white/10 glass sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-zinc-400">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-heading font-semibold text-white">Dashboard</span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Welcome */}
                <div>
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                    What will you <span className="text-gradient-cyan">create</span> today?
                  </h1>
                  <p className="text-zinc-400 mt-1">Select a tool and start generating</p>
                </div>

                {/* Tool Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {tools.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTool(t.id)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        selectedTool === t.id
                          ? 'ring-2 ring-neon-cyan bg-neon-indigo/10'
                          : 'glass hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center mb-2`}>
                        <t.icon className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs font-medium text-white">{t.name}</p>
                    </button>
                  ))}
                </div>

                {/* Active Tool */}
                <ToolInterface toolId={selectedTool} />
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProjectsView />
              </motion.div>
            )}

            {activeTab === 'favorites' && (
              <motion.div key="favorites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="glass rounded-2xl p-12 text-center">
                  <Star className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">No favorites yet. Star items from the gallery!</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div key="billing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <BillingView />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SettingsView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
