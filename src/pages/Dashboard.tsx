import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from '../sections/Navigation';
import {
  Image, Video, Clapperboard, Palette, Instagram,
  Type, FileText, Hash, PenTool, Sparkles, Wand2,
  Upload, Download, Loader2, Copy, Check, Zap, ImagePlus,
  LogOut, CreditCard, User, ChevronRight
} from 'lucide-react';

const tools = [
  { id: 'text-to-image', icon: Image, name: 'Text to Image', desc: 'Generate stunning images from text descriptions', color: '#d4a853' },
  { id: 'text-to-video', icon: Video, name: 'Text to Video', desc: 'Create videos from text prompts', color: '#7c5cff' },
  { id: 'image-to-video', icon: Clapperboard, name: 'Image to Video', desc: 'Animate any still image into video', color: '#e91e8c' },
  { id: 'thumbnail', icon: Palette, name: 'AI Thumbnail', desc: 'Generate eye-catching thumbnails', color: '#22c55e' },
  { id: 'instagram', icon: Instagram, name: 'Instagram Post', desc: 'Create social media content', color: '#f472b6' },
  { id: 'youtube-title', icon: Type, name: 'YouTube Title', desc: 'Craft attention-grabbing titles', color: '#ef4444' },
  { id: 'youtube-desc', icon: FileText, name: 'YouTube Description', desc: 'Write compelling descriptions', color: '#3b82f6' },
  { id: 'hashtag', icon: Hash, name: 'Hashtag Generator', desc: 'Discover trending hashtags', color: '#f59e0b' },
  { id: 'logo', icon: PenTool, name: 'AI Logo', desc: 'Design professional logos', color: '#10b981' },
  { id: 'prompt-enhancer', icon: Wand2, name: 'Prompt Enhancer', desc: 'Enhance your prompts for better results', color: '#8b5cf6' },
];

const mockResults: Record<string, string[]> = {
  'text-to-image': ['/images/showcase-1.jpg', '/images/gallery-2.jpg', '/images/showcase-4.jpg'],
  'text-to-video': ['/images/showcase-2.jpg', '/images/gallery-3.jpg'],
  'image-to-video': ['/images/gallery-1.jpg', '/images/showcase-3.jpg'],
  'thumbnail': ['/images/gallery-4.jpg', '/images/gallery-5.jpg'],
  'instagram': ['/images/gallery-6.jpg', '/images/gallery-9.jpg'],
  'youtube-title': [],
  'youtube-desc': [],
  'hashtag': [],
  'logo': ['/images/gallery-8.jpg', '/images/gallery-10.jpg'],
  'prompt-enhancer': [],
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState('text-to-image');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeToolData = tools.find(t => t.id === activeTool);
  const isTextOnly = ['youtube-title', 'youtube-desc', 'hashtag', 'prompt-enhancer'].includes(activeTool);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 2500));

    if (isTextOnly) {
      const outputs: Record<string, string> = {
        'youtube-title': `10 Mind-Blowing ${prompt.split(' ').slice(0, 3).join(' ')} Hacks You Need to See`,
        'youtube-desc': `Discover the secrets behind ${prompt}. In this video, we explore everything you need to know about ${prompt.toLowerCase()} and how it can transform your workflow. Don't forget to subscribe!`,
        'hashtag': `#${prompt.replace(/\s/g, '')} #AI #Creative #DigitalArt #Trending #Viral #ContentCreator #Innovation`,
        'prompt-enhancer': `A highly detailed, cinematic, photorealistic masterpiece of ${prompt}, with dramatic lighting, ultra-high resolution, 8K quality, professional color grading, intricate details, award-winning composition`,
      };
      setResult(outputs[activeTool] || prompt);
    } else {
      const toolResults = mockResults[activeTool] || [];
      const randomResult = toolResults[Math.floor(Math.random() * toolResults.length)] || '/images/showcase-1.jpg';
      setResult(randomResult);
      setResults(prev => [randomResult, ...prev]);
    }
    setGenerating(false);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (result && result.startsWith('/')) {
      const a = document.createElement('a');
      a.href = result;
      a.download = `nexora-${Date.now()}.jpg`;
      a.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#000' }}>
      <Navigation />

      <div className="flex flex-1 pt-[60px]">
        {/* Sidebar */}
        <aside
          className="fixed lg:sticky top-[60px] left-0 z-40 h-[calc(100vh-60px)] w-64 flex-shrink-0 overflow-y-auto transition-transform duration-300 lg:translate-x-0"
          style={{
            background: 'var(--bg-elevated)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            transform: sidebarOpen ? 'translateX(0)' : undefined,
          }}
        >
          <div className="p-4">
            <div className="flex items-center gap-3 mb-6 px-2">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full" />
              ) : (
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: 'var(--accent-gold)', color: '#000' }}>
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
              </div>
            </div>

            <div className="mb-4 px-2">
              <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                <span>Plan: <span className="font-medium" style={{ color: 'var(--accent-gold)' }}>{user?.plan?.toUpperCase() || 'FREE'}</span></span>
                <Link to="/pricing" className="hover:underline" style={{ color: 'var(--accent-gold)' }}>Upgrade</Link>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <Zap className="w-3 h-3" style={{ color: 'var(--accent-gold)' }} />
                <span>{user?.imageUsed || 0} images used</span>
              </div>
              <div className="flex items-center gap-2 text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                <Video className="w-3 h-3" style={{ color: 'var(--accent-purple)' }} />
                <span>{user?.videoUsed || 0} videos used</span>
              </div>
            </div>

            <div className="border-t border-white/6 pt-4 mb-4">
              <p className="px-2 text-xs font-medium uppercase mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>AI Tools</p>
              {tools.map(tool => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => { setActiveTool(tool.id); setResult(null); setPrompt(''); setSidebarOpen(false); }}
                    className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors duration-200 text-left"
                    style={{
                      color: activeTool === tool.id ? '#fff' : 'var(--text-secondary)',
                      background: activeTool === tool.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                    }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: activeTool === tool.id ? tool.color : 'var(--text-muted)' }} />
                    <span className="truncate">{tool.name}</span>
                    {activeTool === tool.id && <ChevronRight className="w-3 h-3 ml-auto flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/6 pt-4">
              <button
                onClick={() => navigate('/pricing')}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors duration-200 text-left hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                <CreditCard className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <span>Billing</span>
              </button>
              <button
                onClick={() => {}}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors duration-200 text-left hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                <User className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <span>Profile</span>
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors duration-200 text-left hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                <LogOut className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center gap-3 p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg" style={{ color: '#fff' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-2">
              {activeToolData && <activeToolData.icon className="w-5 h-5" style={{ color: activeToolData.color }} />}
              <span className="text-white font-medium">{activeToolData?.name}</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-4 lg:p-8">
            {/* Tool header */}
            <div className="mb-8">
              <div className="hidden lg:flex items-center gap-3 mb-4">
                {activeToolData && <activeToolData.icon className="w-8 h-8" style={{ color: activeToolData.color }} />}
                <div>
                  <h1 className="text-2xl font-light text-white">{activeToolData?.name}</h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{activeToolData?.desc}</p>
                </div>
              </div>
            </div>

            {/* Prompt input */}
            <div
              className="rounded-2xl p-6 mb-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                {isTextOnly ? 'Enter your topic or idea' : 'Describe what you want to create'}
              </label>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder={isTextOnly ? "e.g., AI art tips" : "e.g., A majestic dragon soaring through golden clouds at sunset..."}
                className="w-full rounded-xl text-white placeholder:text-[var(--text-muted)] focus:outline-none resize-none"
                style={{
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  minHeight: 100,
                }}
              />

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  {!isTextOnly && (
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                      style={{ color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload
                    </button>
                  )}
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={generating || !prompt.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'var(--accent-gold)', color: '#000' }}
                >
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {generating ? 'Generating...' : isTextOnly ? 'Generate' : 'Create'}
                </button>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>Result</h3>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {isTextOnly ? (
                    <div className="p-6">
                      <p className="text-white whitespace-pre-wrap leading-relaxed">{result}</p>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
                        style={{ color: 'var(--accent-gold)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  ) : (
                    <>
                      <img src={result} alt="Generated" className="w-full max-h-[600px] object-contain" />
                      <div className="flex items-center gap-3 p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <button
                          onClick={handleDownload}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
                          style={{ color: 'var(--accent-gold)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <Download className="w-4 h-4" /> Download
                        </button>
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
                          style={{ color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <Copy className="w-4 h-4" /> Share
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Generation placeholder / loading */}
            {generating && !result && (
              <div className="mb-8">
                <div
                  className="rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    minHeight: 400,
                  }}
                >
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'var(--accent-gold)' }} />
                      <div className="relative w-full h-full rounded-full flex items-center justify-center" style={{ background: 'rgba(212,168,83,0.1)', border: '1px solid rgba(212,168,83,0.2)' }}>
                        <Sparkles className="w-8 h-8 animate-pulse" style={{ color: 'var(--accent-gold)' }} />
                      </div>
                    </div>
                    <p className="text-white font-medium mb-1">AI is creating...</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>This may take a few seconds</p>
                  </div>
                </div>
              </div>
            )}

            {/* Recent generations */}
            {results.length > 0 && !isTextOnly && (
              <div>
                <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>Recent Generations</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {results.slice(0, 6).map((img, i) => (
                    <div key={i} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer" onClick={() => setResult(img)}>
                      <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <ImagePlus className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
