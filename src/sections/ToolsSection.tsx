import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Image, Video, Clapperboard, Palette, Instagram,
  Type, FileText, Hash, PenTool
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { icon: Image, name: 'Text to Image', desc: 'Describe anything, see it come alive in photorealistic detail.' },
  { icon: Video, name: 'Text to Video', desc: 'Bring motion to your ideas with AI-generated video clips.' },
  { icon: Clapperboard, name: 'Image to Video', desc: 'Animate any still image into a living, breathing scene.' },
  { icon: Palette, name: 'AI Thumbnail', desc: 'Generate eye-catching thumbnails that demand clicks.' },
  { icon: Instagram, name: 'Instagram Post', desc: 'Create scroll-stopping social content in seconds.' },
  { icon: Type, name: 'YouTube Title', desc: 'Craft titles that capture attention and drive views.' },
  { icon: FileText, name: 'YouTube Description', desc: 'Write compelling descriptions that rank and convert.' },
  { icon: Hash, name: 'Hashtag Generator', desc: 'Discover trending hashtags tailored to your content.' },
  { icon: PenTool, name: 'AI Logo', desc: 'Design professional logos from a simple text prompt.' },
];

export default function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!section || !wrapper || !container) return;

    const ctx = gsap.context(() => {
      gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - container.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${wrapper.scrollWidth - container.clientWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: () => {
          const viewportCenter = container.clientWidth / 2;
          document.querySelectorAll<HTMLElement>('.glass-card-tool').forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(viewportCenter - cardCenter);
            const maxDistance = container.clientWidth * 0.8;
            const progress = Math.min(distance / maxDistance, 1);
            const opacity = 1 - progress * 0.7;
            const blur = progress * 1;
            const scale = 1 - progress * 0.05;
            gsap.set(card, { opacity, filter: `blur(${blur}px)`, scale });
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#000', paddingTop: 120 }}
    >
      <div className="text-center mb-12 relative z-10">
        <p
          className="uppercase mb-3"
          style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: 'var(--accent-gold)',
          }}
        >
          AI-POWERED TOOLS
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          Your creative arsenal
        </h2>
      </div>

      <div
        ref={containerRef}
        className="horizontal-scroll-container"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          background: '#000',
          zIndex: 1,
        }}
      >
        <div
          ref={wrapperRef}
          className="flex gap-6"
          style={{
            paddingLeft: '4rem',
            paddingRight: '4rem',
            willChange: 'transform',
            width: 'max-content',
          }}
        >
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div
                key={i}
                className="glass-card-tool flex-shrink-0 relative flex flex-col overflow-hidden"
                style={{
                  width: 280,
                  height: 380,
                  padding: '2rem',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  willChange: 'transform, opacity, filter',
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 mb-6"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(212,168,83,0.15), rgba(124,92,255,0.1))',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    color: '#fff',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {tool.name}
                </h3>
                <p
                  className="flex-grow"
                  style={{
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.5,
                    marginBottom: 'auto',
                  }}
                >
                  {tool.desc}
                </p>
                <span
                  className="mt-auto pt-4 cursor-pointer font-medium transition-colors duration-200"
                  style={{ fontSize: '0.9rem', color: 'var(--accent-gold)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e8c880')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                >
                  Try Now
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
