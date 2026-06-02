import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const galleryItems = [
  { src: '/images/gallery-1.jpg', caption: 'Aetheria · Text to Image' },
  { src: '/images/gallery-2.jpg', caption: 'Golden Fragment · Image to Video' },
  { src: '/images/gallery-3.jpg', caption: 'Neon Horizons · Text to Image' },
  { src: '/images/gallery-4.jpg', caption: 'Crimson Flow · AI Thumbnail' },
  { src: '/images/gallery-5.jpg', caption: 'Drakonis · Text to Image' },
  { src: '/images/gallery-6.jpg', caption: 'Biolume Garden · Text to Video' },
  { src: '/images/gallery-7.jpg', caption: 'Galactic Spiral · Text to Image' },
  { src: '/images/gallery-8.jpg', caption: 'Kintsuki Hand · AI Logo' },
  { src: '/images/gallery-9.jpg', caption: 'Sanctum · Text to Image' },
  { src: '/images/gallery-10.jpg', caption: 'Sacred Geometry · Instagram Post' },
  { src: '/images/showcase-1.jpg', caption: 'Ethereal · Image to Video' },
  { src: '/images/showcase-2.jpg', caption: 'Neo Tokyo · Text to Image' },
  { src: '/images/showcase-3.jpg', caption: 'Neural Bloom · AI Thumbnail' },
  { src: '/images/showcase-4.jpg', caption: 'Studio X · Text to Image' },
  { src: '/images/gallery-7.jpg', caption: 'Void Walker · Text to Video' },
];

export default function GallerySection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="gallery"
      className="relative"
      style={{ background: '#000', paddingTop: '6rem', paddingBottom: '6rem' }}
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
          GALLERY
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
          Creations from our community
        </h2>
      </div>

      <div
        ref={ref}
        className="grid gap-4 section-padding"
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        }}
      >
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl cursor-pointer"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`,
              aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1/1' : '4/5',
            }}
          >
            <img
              src={item.src}
              alt={item.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ filter: 'brightness(0.9) saturate(1.1)' }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
              }}
            >
              <div className="p-4 w-full">
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.7)',
                    textAlign: 'center',
                  }}
                >
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
