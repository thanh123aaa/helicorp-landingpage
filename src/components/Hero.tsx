import React from 'react';
import { useTracking } from '../hooks/useTracking';

interface HeroProps {
  onCtaClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onExploreClick }) => {
  const { trackEvent } = useTracking();

  const handleCta = () => {
    trackEvent('Click CTA Mua hàng trên Hero Banner', 'Hero Section', 'Button Buy');
    onCtaClick();
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-banner-container">
        {/* Bottom Left Content */}
        <div className="hero-text-wrapper animate-slide-up">
          <div className="hero-brand-title">
            <span className="brand-logo"></span> HELIO WATCH SERIES 3
          </div>
          <h1 className="hero-main-title">
            Siêu công cụ chăm sóc <br />
            sức khỏe của bạn.
          </h1>
        </div>

        {/* Bottom Right CTA Card */}
        <div className="hero-cta-card-wrapper animate-fade-in">
          <div className="hero-cta-pill glass-panel">
            <span className="price-text">Từ 9.990.000đ</span>
            <button className="buy-btn" onClick={handleCta}>
              Mua
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          width: 100%;
          height: 100vh;
          position: relative;
          background: #000000;
          overflow: hidden;
        }

        .hero-banner-container {
          width: 100%;
          height: 100%;
          background: url('/assets/hero-banner.webp') center center / cover no-repeat;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 5rem 6.5rem;
          position: relative;
        }

        /* Overlay to ensure text readability */
        .hero-banner-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 100%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-text-wrapper {
          position: relative;
          z-index: 2;
          max-width: 600px;
          text-align: left;
        }

        .hero-brand-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: -0.01em;
          margin-bottom: 0.8rem;
          font-family: var(--font-sans);
        }

        .brand-logo {
          font-size: 1.8rem;
          line-height: 1;
        }

        .hero-main-title {
          font-family: var(--font-sans);
          font-size: clamp(2.5rem, 4.5vw, 4rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #ffffff;
        }

        .hero-cta-card-wrapper {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
        }

        .hero-cta-pill {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 8px 8px 8px 24px;
          border-radius: 100px;
          background: rgba(25, 25, 27, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          height: 52px;
        }

        .price-text {
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          font-family: var(--font-sans);
          letter-spacing: -0.01em;
        }

        .buy-btn {
          height: 36px;
          padding: 0 20px;
          border-radius: 18px;
          background-color: #0071e3;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
          font-family: var(--font-sans);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .buy-btn:hover {
          background-color: #147ce5;
          transform: scale(1.03);
        }

        @media (max-width: 992px) {
          .hero-banner-container {
            padding: 4rem 3rem;
          }
        }

        @media (max-width: 768px) {
          .hero-banner-container {
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            gap: 2rem;
            padding: 4rem 2rem;
          }

          .hero-main-title {
            font-size: 2.5rem;
          }

          .hero-cta-card-wrapper {
            width: 100%;
            justify-content: flex-start;
          }
          
          .hero-cta-pill {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </section>
  );
};
