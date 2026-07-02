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
        <div className="container animate-slide-up">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            HelioRing - Giao diện nền tảng & Theme System
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Chào mừng bạn đến với HelioRing! Đây là nhánh tính năng <strong>feature/theme-layout</strong>. Chúng tôi đã xây dựng xong cấu trúc Layout, Hệ thống màu sáng tối (Light/Dark Mode), và hệ thống thông báo Toast. Các tính năng tiếp theo sẽ được ghép nối từng bước ở các nhánh tương ứng.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
