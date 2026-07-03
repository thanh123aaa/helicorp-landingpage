import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BentoFeatures } from './components/BentoFeatures';
import { FitnessFeatures } from './components/FitnessFeatures';
import { ConnectFeatures } from './components/ConnectFeatures';
import { ProductCustomizer } from './components/ProductCustomizer';
import { SpecsTable } from './components/SpecsTable';
import { NewsletterSubscription } from './components/NewsletterSubscription';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Chatbot } from './components/Chatbot';

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
          onCtaClick={() => { }}
          onExploreClick={() => { }}
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
