import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/features/Hero';
import { BentoFeatures } from './components/features/BentoFeatures';
import { FitnessFeatures } from './components/features/FitnessFeatures';
import { ConnectFeatures } from './components/features/ConnectFeatures';
import { ProductCustomizer } from './components/shop/ProductCustomizer';
import { SpecsTable } from './components/features/SpecsTable';
import { NewsletterSubscription } from './components/features/NewsletterSubscription';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/shop/CartDrawer';
import { WishlistDrawer } from './components/shop/WishlistDrawer';
import { Chatbot } from './components/chatbot/Chatbot';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <>
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />
      <main style={{ flexGrow: 1 }}>
        <Hero
          onCtaClick={() => {
            const el = document.getElementById('customizer');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreClick={() => {
            const el = document.getElementById('features');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <BentoFeatures />
        <FitnessFeatures />
        <ConnectFeatures />
        <ProductCustomizer />
        <SpecsTable />
        <NewsletterSubscription />
      </main>
      <Footer />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <Chatbot />
    </>
  );
};


export default App;
