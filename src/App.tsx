import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Header 
        onCartClick={() => {}} 
        onWishlistClick={() => {}}
        onTrackingClick={() => {}}
      />
      <main style={{ flexGrow: 1, paddingTop: '120px', paddingBottom: '100px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>
            HelioRing - Giao di?n n?n t?ng & Theme System
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Giao di?n dang du?c hoàn thi?n và ghép ráp các b? ph?n ? các nhánh tính nang ti?p theo.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
