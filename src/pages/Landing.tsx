import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Zap, Sparkles, Image, Video, Wand2, Eye,
  ArrowRight, Check, Star, ChevronDown, Shield,
  Gauge, Layers, Globe, Palette,
  Instagram, Youtube, Hash, Type, PenTool, Lightbulb,
} from 'lucide-react';
import NeonStroke from '@/components/effects/NeonStroke';

/* ---------- Animation helper ---------- */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero ---------- */
function HeroSection() {
  const navigate = useNavigate();
  const images = [
    '/images/hero/hero1.jpg',
    '/images/hero/hero2.jpg',
    '/images/hero/hero3.jpg',
    '/images/hero/hero4.jpg',
    '/images/hero/hero5.jpg',
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-indigo/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-neon-cyan"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Content Creation Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
            >
              Create AI Content{' '}
              <span className="text-gradient-rainbow">That Feels Like</span>{' '}
              <span className="text-neon-cyan">The Future</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-zinc-400 max-w-xl"
            >
              Generate stunning images, videos, thumbnails, and social media content in seconds.
              10+ AI tools powered by cutting-edge machine learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-neon-indigo to-neon-purple rounded-xl hover:shadow-neon-indigo transition-all flex items-center gap-2"
              >
                Start Creating
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/gallery')}
                className="px-8 py-4 text-base font-medium text-white glass rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Explore Gallery
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-8 pt-4"
            >
              {[
                { value: '10+', label: 'AI Tools' },
                { value: '50K+', label: 'Users' },
                { value: '2M+', label: 'Creations' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden glass shadow-2xl">
              {images.map((img, i) => (
                <img
                  key={img}
                  src={img}
                  alt={`AI Creation ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentImage ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
              {/* Overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base/80 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="glass px-3 py-1.5 rounded-lg text-xs text-neon-cyan flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  Live Generation
                </div>
                <div className="glass px-3 py-1.5 rounded-lg text-xs text-zinc-300">
                  {currentImage + 1} / {images.length}
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-neon-cyan/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-neon-indigo/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate content in seconds with our optimized AI inference pipeline.',
    },
    {
      icon: Palette,
      title: 'Multiple Styles',
      description: 'Choose from photorealistic, anime, 3D, sketch, and many more art styles.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your creations are encrypted and stored securely. Full data ownership.',
    },
    {
      icon: Gauge,
      title: 'High Resolution',
      description: 'Export in up to 4K resolution with Pro plan. Crystal clear quality.',
    },
    {
      icon: Layers,
      title: 'Batch Processing',
      description: 'Generate multiple variations simultaneously to find the perfect result.',
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Lightning-fast downloads worldwide with our distributed content network.',
    },
  ];

  return (
    <section id="features" className="relative z-10 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-neon-cyan text-sm font-medium tracking-wider uppercase">Features</span>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Everything You Need to{' '}
            <span className="text-gradient-cyan">Create</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            A complete suite of AI-powered tools designed for creators, marketers, and developers.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.1}>
              <div className="glass-card glass p-6 rounded-2xl h-full group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-indigo/20 to-neon-purple/20 flex items-center justify-center mb-4 group-hover:shadow-neon-indigo transition-shadow">
                  <feature.icon className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AI Tools Grid ---------- */
function AIToolsSection() {
  const navigate = useNavigate();
  const tools = [
    {
      icon: Image,
      name: 'Text to Image',
      description: 'Transform text descriptions into stunning visuals',
      color: 'from-neon-cyan to-teal-400',
      href: '/dashboard?tool=text-to-image',
    },
    {
      icon: Video,
      name: 'Text to Video',
      description: 'Generate cinematic videos from text prompts',
      color: 'from-neon-indigo to-purple-500',
      href: '/dashboard?tool=text-to-video',
    },
    {
      icon: Wand2,
      name: 'Image to Video',
      description: 'Animate still images into dynamic videos',
      color: 'from-pink-500 to-rose-400',
      href: '/dashboard?tool=image-to-video',
    },
    {
      icon: Sparkles,
      name: 'AI Thumbnail',
      description: 'Create eye-catching thumbnails for YouTube',
      color: 'from-amber-400 to-orange-500',
      href: '/dashboard?tool=thumbnail',
    },
    {
      icon: Instagram,
      name: 'Instagram Post',
      description: 'Generate viral Instagram content instantly',
      color: 'from-fuchsia-500 to-pink-500',
      href: '/dashboard?tool=instagram',
    },
    {
      icon: Youtube,
      name: 'YouTube Title',
      description: 'Craft click-worthy video titles with AI',
      color: 'from-red-500 to-rose-500',
      href: '/dashboard?tool=youtube-title',
    },
    {
      icon: Type,
      name: 'YouTube Description',
      description: 'Write SEO-optimized video descriptions',
      color: 'from-emerald-400 to-teal-500',
      href: '/dashboard?tool=youtube-desc',
    },
    {
      icon: Hash,
      name: 'Hashtag Generator',
      description: 'Find trending hashtags for maximum reach',
      color: 'from-sky-400 to-blue-500',
      href: '/dashboard?tool=hashtag',
    },
    {
      icon: PenTool,
      name: 'AI Logo Generator',
      description: 'Design professional logos in seconds',
      color: 'from-violet-500 to-purple-600',
      href: '/dashboard?tool=logo',
    },
    {
      icon: Lightbulb,
      name: 'Prompt Enhancer',
      description: 'Optimize your prompts for better results',
      color: 'from-yellow-400 to-amber-500',
      href: '/dashboard?tool=prompt-enhancer',
    },
  ];

  return (
    <section className="relative z-10 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-neon-cyan text-sm font-medium tracking-wider uppercase">AI Tools</span>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            10 Powerful{' '}
            <span className="text-gradient-rainbow">AI Tools</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            From image generation to social media optimization, we have got every tool a creator needs.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <FadeIn key={tool.name} delay={i * 0.05}>
              <button
                onClick={() => navigate(tool.href)}
                className="w-full text-left glass-card glass p-5 rounded-2xl group h-full"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-white mb-1">{tool.name}</h3>
                <p className="text-xs text-zinc-400">{tool.description}</p>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Showcase ---------- */
function ShowcaseSection() {
  const galleryItems = [
    { src: '/images/gallery/gallery1.jpg', title: 'Cyberpunk City', type: 'Text to Image' },
    { src: '/images/gallery/gallery2.jpg', title: 'Crystal Islands', type: 'Text to Image' },
    { src: '/images/gallery/gallery3.jpg', title: 'Neon Sports Car', type: 'Text to Image' },
    { src: '/images/gallery/gallery4.jpg', title: 'Digital Eye', type: 'Text to Image' },
    { src: '/images/gallery/gallery5.jpg', title: 'Cyber Dragon', type: 'Text to Image' },
    { src: '/images/gallery/gallery6.jpg', title: 'Smart Home', type: 'Text to Image' },
  ];

  return (
    <section className="relative z-10 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-neon-cyan text-sm font-medium tracking-wider uppercase">Showcase</span>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            See What Others{' '}
            <span className="text-gradient-cyan">Created</span>
          </h2>
        </FadeIn>

        {/* Prompt Animation */}
        <FadeIn className="mb-12">
          <NeonStroke />
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <div className="group relative aspect-square rounded-2xl overflow-hidden glass">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-base/90 via-dark-base/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <span className="text-xs text-neon-cyan font-medium">{item.type}</span>
                  <h3 className="text-white font-heading font-semibold">{item.title}</h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white glass rounded-xl hover:bg-white/10 transition-all"
          >
            View All Creations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function PricingSection() {
  const navigate = useNavigate();
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        '15 Video Generations',
        '30 Image Generations',
        'Watermark on exports',
        'Standard queue',
        'Basic models',
        'Community support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Starter',
      price: '99',
      period: '/month',
      description: 'Best for creators',
      features: [
        '200 Video Generations',
        '500 Image Generations',
        'No watermark',
        'Faster queue',
        'HD export quality',
        'Priority support',
      ],
      cta: 'Start Trial',
      popular: true,
    },
    {
      name: 'Pro',
      price: '299',
      period: '/month',
      description: 'For professionals',
      features: [
        'Unlimited generations',
        'Premium AI models',
        '4K export quality',
        'Priority queue',
        'Commercial license',
        'API access',
        'Dedicated support',
      ],
      cta: 'Go Pro',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative z-10 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-neon-cyan text-sm font-medium tracking-wider uppercase">Pricing</span>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Simple, Transparent{' '}
            <span className="text-gradient-cyan">Pricing</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Choose the plan that fits your creative needs. Upgrade or downgrade anytime.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <div
                className={`relative glass p-6 lg:p-8 rounded-2xl h-full flex flex-col ${
                  plan.popular ? 'ring-2 ring-neon-cyan shadow-neon' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-cyan text-dark-base text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-heading font-semibold text-xl text-white">{plan.name}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{plan.description}</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-sm text-zinc-400">&</span>
                    <span className="font-heading text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-zinc-400 text-sm">{plan.period}</span>}
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/auth?mode=signup')}
                  className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-neon-indigo to-neon-purple text-white hover:shadow-neon-indigo'
                      : 'glass text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator',
      avatar: '/images/avatars/avatar1.jpg',
      content: 'Nexora Forge has completely transformed my workflow. I can generate thumbnails and social media content in minutes instead of hours.',
      rating: 5,
    },
    {
      name: 'Alex Rivera',
      role: 'YouTuber',
      avatar: '/images/avatars/avatar2.jpg',
      content: 'The AI video generation is mind-blowing. I created an entire intro sequence for my channel without any editing skills.',
      rating: 5,
    },
    {
      name: 'Emily Watson',
      role: 'Marketing Director',
      avatar: '/images/avatars/avatar3.jpg',
      content: 'Our marketing team uses Nexora daily. The Instagram post generator alone has doubled our engagement rates.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Startup Founder',
      avatar: '/images/avatars/avatar4.jpg',
      content: 'The logo generator saved us thousands in design costs. We got a professional brand identity in under an hour.',
      rating: 5,
    },
  ];

  return (
    <section className="relative z-10 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-neon-cyan text-sm font-medium tracking-wider uppercase">Testimonials</span>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Loved by{' '}
            <span className="text-gradient-cyan">Creators</span>
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <FadeIn key={testimonial.name} delay={i * 0.1}>
              <div className="glass p-6 rounded-2xl h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 flex-1 mb-4">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full border border-white/20"
                  />
                  <div>
                    <div className="text-sm font-medium text-white">{testimonial.name}</div>
                    <div className="text-xs text-zinc-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      q: 'How does the AI generation work?',
      a: 'Our platform uses state-of-the-art machine learning models including Stable Diffusion, GPT-4, and custom-trained models. Simply enter your prompt, select your preferences, and our AI will generate high-quality content in seconds.',
    },
    {
      q: 'Can I use generated content commercially?',
      a: 'Yes! With our Pro plan, you get full commercial usage rights for all generated content. Starter and Free plans are for personal use only.',
    },
    {
      q: 'What file formats are supported?',
      a: 'Images can be exported as PNG, JPG, or WebP. Videos are exported as MP4 in up to 4K resolution (Pro plan) or HD (Starter plan).',
    },
    {
      q: 'Is there a watermark on free generations?',
      a: 'Free plan exports include a small Nexora Forge watermark. Upgrade to Starter or Pro to remove watermarks completely.',
    },
    {
      q: 'How do referrals work?',
      a: 'Share your unique referral code with friends. When they sign up and subscribe, both of you get bonus generations. There is no limit to how many friends you can refer!',
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Absolutely. You can cancel your subscription at any time from your account settings. You will continue to have access until the end of your billing period.',
    },
  ];

  return (
    <section className="relative z-10 py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-neon-cyan text-sm font-medium tracking-wider uppercase">FAQ</span>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Frequently Asked{' '}
            <span className="text-gradient-cyan">Questions</span>
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-white pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neon-cyan flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="relative z-10 py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative glass rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-indigo/10 rounded-full blur-3xl" />

            <div className="relative text-center">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Start Creating?
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                Join 50,000+ creators who are already using Nexora Forge to bring their ideas to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/auth?mode=signup')}
                  className="px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-neon-indigo to-neon-purple rounded-xl hover:shadow-neon-indigo transition-all flex items-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/gallery')}
                  className="px-8 py-4 text-base font-medium text-white glass rounded-xl hover:bg-white/10 transition-all"
                >
                  Explore Gallery
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- Main Landing Page ---------- */
export default function Landing() {
  return (
    <main className="page-content">
      <HeroSection />
      <FeaturesSection />
      <AIToolsSection />
      <ShowcaseSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
