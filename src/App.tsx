import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BentoFeatures } from './components/BentoFeatures';
import { ProductCustomizer } from './components/ProductCustomizer';
import { SpecsTable } from './components/SpecsTable';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <>
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onTrackingClick={() => { }}
      />
      <main style={{ flexGrow: 1 }}>
        <Hero
          onCtaClick={() => { }}
          onExploreClick={() => { }}
        />
        <BentoFeatures />
        <ProductCustomizer />
        <SpecsTable />
      </main>
      <Footer />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
};


export default App;
