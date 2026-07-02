import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BentoFeatures } from './components/BentoFeatures';
import { ProductCustomizer } from './components/ProductCustomizer';
import { SpecsTable } from './components/SpecsTable';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Header
        onCartClick={() => { }}
        onWishlistClick={() => { }}
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
    </>
  );
};


export default App;
