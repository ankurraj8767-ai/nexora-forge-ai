import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const showcases = [
  {
    title: 'From imagination\nto image in seconds',
    caption: 'Generate stunning images from text',
    image: '/images/showcase-1.jpg',
  },
  {
    title: 'Video that moves\nwith your vision',
    caption: 'Transform stills into cinematic video',
    image: '/images/showcase-2.jpg',
  },
  {
    title: 'Prompts that write\nthemselves',
    caption: 'AI-enhanced prompts for better results',
    image: '/images/showcase-3.jpg',
  },
  {
    title: 'Your creative workflow,\namplified',
    caption: 'Seamless tools for every creator',
    image: '/images/showcase-4.jpg',
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const areas = section.querySelectorAll<HTMLElement>('.showcase__area');
    const images = section.querySelectorAll<HTMLElement>('.showcase__images .showcase__image');

    areas.forEach((area, i) => {
      const title = area.querySelector<HTMLElement>('.showcase__title');
      const areaImage = area.querySelector<HTMLElement>('.showcase__image');
      const isOdd = i % 2 === 0;

      if (title) {
        gsap.set(title, { opacity: 0, filter: 'blur(8px)' });

        ScrollTrigger.create({
          trigger: area,
          start: 'top center',
          end: 'bottom center',
          scrub: 1.5,
          onEnter: () => {
            gsap.to(title, { opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', overwrite: true });
          },
          onLeave: () => {
            gsap.to(title, { opacity: 0, filter: 'blur(8px)', duration: 0.4, ease: 'power2.in', overwrite: true });
          },
          onEnterBack: () => {
            gsap.to(title, { opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', overwrite: true });
          },
          onLeaveBack: () => {
            gsap.to(title, { opacity: 0, filter: 'blur(8px)', duration: 0.4, ease: 'power2.in', overwrite: true });
          },
        });
      }

      if (areaImage) {
        gsap.set(areaImage, {
          x: isOdd ? '50vw' : '-50vw',
          clipPath: isOdd
            ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
            : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        });

        gsap.to(areaImage, {
          x: 0,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: area,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          },
        });
      }

      const galleryImage = images[i];
      if (galleryImage) {
        gsap.set(galleryImage, {
          y: 60,
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        });

        gsap.to(galleryImage, {
          y: 0,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: galleryImage,
            start: 'top 100%',
            end: 'top 20%',
            scrub: 1,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="showcase relative w-full"
      style={{ background: '#000' }}
    >
      <div
        className="showcase__wrapper relative w-full mx-auto grid"
        style={{ maxWidth: 1280, gridTemplateColumns: '1fr 1fr' }}
      >
        <div
          className="showcase__window sticky overflow-hidden"
          style={{ top: 0, height: '100vh', zIndex: 1 }}
        >
          {showcases.map((item, i) => (
            <div
              key={i}
              className="showcase__area absolute inset-0 flex flex-col items-center justify-center"
            >
              <h2
                className="showcase__title absolute whitespace-nowrap"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 5rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  opacity: 0,
                }}
              >
                {item.title.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j === 0 && <br />}
                  </span>
                ))}
              </h2>
              <div
                className="showcase__image absolute inset-0 flex items-center justify-center"
                style={{ willChange: 'transform, clip-path' }}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  style={{
                    width: '100%',
                    maxWidth: 400,
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    borderRadius: 12,
                    willChange: 'transform, clip-path',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="showcase__images relative" style={{ zIndex: 2 }}>
          {showcases.map((item, i) => (
            <div
              key={i}
              className="showcase__image sticky top-0 flex items-center justify-center"
              style={{ height: '100vh' }}
            >
              <div className="text-center">
                <img
                  src={item.image}
                  alt={item.caption}
                  style={{
                    width: '100%',
                    maxWidth: 400,
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    borderRadius: 12,
                    willChange: 'transform, clip-path',
                  }}
                />
                <p
                  className="mt-6 text-center"
                  style={{
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
