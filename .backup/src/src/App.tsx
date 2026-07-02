import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BentoFeatures } from './components/BentoFeatures';
import { ProductCustomizer } from './components/ProductCustomizer';
import { SpecsTable } from './components/SpecsTable';
import { NewsletterForm } from './components/NewsletterForm';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { TrackingConsole } from './components/TrackingConsole';
import { SocialProof } from './components/SocialProof';
import { ChatbotWidget } from './components/ChatbotWidget';
import { useTracking } from './hooks/useTracking';

const App: React.FC = () => {
  const { trackEvent } = useTracking();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);

  const handleOpenCart = () => {
    setCartOpen(true);
    trackEvent('Mở drawer Giỏ hàng', 'E-commerce', 'Cart Open');
  };

  const handleOpenWishlist = () => {
    setWishlistOpen(true);
    trackEvent('Mở drawer Yêu thích', 'E-commerce', 'Wishlist Open');
  };

  const handleOpenTracking = () => {
    setTrackingOpen(true);
    trackEvent('Mở Console theo dõi hành vi', 'Scroll', 'Tracking Console Open');
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Header 
        onCartClick={handleOpenCart} 
        onWishlistClick={handleOpenWishlist}
        onTrackingClick={handleOpenTracking}
      />

      <main style={{ flexGrow: 1 }}>
        <Hero 
          onCtaClick={() => handleScrollToSection('customizer')}
          onExploreClick={() => handleScrollToSection('features')}
        />
        <BentoFeatures />
        <ProductCustomizer />
        <SpecsTable />
        <NewsletterForm />
      </main>

      <Footer />

      {/* Interactive Floating widgets */}
      <ChatbotWidget />
      <SocialProof />

      {/* Slidout drawers & Dialogs */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />
      <WishlistDrawer 
        isOpen={wishlistOpen} 
        onClose={() => setWishlistOpen(false)}
        onCartOpen={handleOpenCart}
      />
      <TrackingConsole 
        isOpen={trackingOpen} 
        onClose={() => setTrackingOpen(false)} 
      />
    </>
  );
};

export default App;
