import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/effects/ParticleBackground';
import Toast from '@/components/ui-custom/Toast';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Gallery from '@/pages/Gallery';
import Profile from '@/pages/Profile';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isAuth = location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-dark-base text-white">
      <ParticleBackground />
      <ScrollToTop />
      <Toast />

      {!isDashboard && <Navigation />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {!isDashboard && !isAuth && <Footer />}
    </div>
  );
}
