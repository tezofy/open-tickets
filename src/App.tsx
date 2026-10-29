import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SearchModal } from './components/SearchModal';
import { StoryViewerModal } from './components/StoryViewerModal';
import { MobileAppSimulator, ToastContainer } from './components/ToastContainer';

import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { CartPage } from './pages/CartPage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { FindMyTicketsPage } from './pages/FindMyTicketsPage';
import { HostPage } from './pages/HostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { AuthPage } from './pages/AuthPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/signup';

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground focus:shadow-lg"
      >
        Skip to content
      </a>

      <ScrollToTop />

      {!isAuthRoute && <SiteHeader />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/o/:organizerSlug/:slug" element={<EventDetailPage />} />
        <Route path="/event/:slug" element={<EventDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<MyTicketsPage />} />
        <Route path="/profile/tickets" element={<MyTicketsPage />} />
        <Route path="/find-my-tickets" element={<FindMyTicketsPage />} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/signup" element={<AuthPage mode="register" />} />
        <Route path="/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/terms" element={<LegalPage type="terms" />} />
        <Route path="/refund-policy" element={<LegalPage type="refund-policy" />} />
        <Route path="/refund-guarantee" element={<LegalPage type="refund-guarantee" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!isAuthRoute && <SiteFooter />}

      {/* Mobile App Floating Liquid-Glass Navigation + Bottom Sheet Drawer */}
      <MobileBottomNav />

      {/* Global Overlays */}
      <SearchModal />
      <StoryViewerModal />
      <ToastContainer />
      <MobileAppSimulator />
    </div>
  );
};
