import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import TrustedBy from '../sections/TrustedBy';
import Showcase from '../sections/Showcase';
import ToolsSection from '../sections/ToolsSection';
import ParallaxSection from '../sections/ParallaxSection';
import HowSection from '../sections/HowSection';
import GallerySection from '../sections/GallerySection';
import Pricing from '../sections/Pricing';
import CTA from '../sections/CTA';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <div className="relative" style={{ background: '#000' }}>
      <Navigation />
      <Hero />
      <TrustedBy />
      <Showcase />
      <ToolsSection />
      <ParallaxSection />
      <HowSection />
      <GallerySection />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
