import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Battery, Shield, Award } from 'lucide-react';
import { useTracking } from '../hooks/useTracking';

interface HeroProps {
  onCtaClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onExploreClick }) => {
  const { trackEvent } = useTracking();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeBadge, setActiveBadge] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 35;
    const y = (clientY - window.innerHeight / 2) / 35;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBadge(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCta = () => {
    trackEvent('Click CTA Đặt hàng ngay', 'Hero Section', 'Button Primary');
    onCtaClick();
  };

  const handleExplore = () => {
    trackEvent('Click CTA Khám phá', 'Hero Section', 'Button Secondary');
    onExploreClick();
  };

  const badges = [
    { icon: <Battery size={16} />, text: "7 Ngày Thời Lượng Pin" },
    { icon: <Shield size={16} />, text: "Titan Hàng Không Cao Cấp" },
    { icon: <Award size={16} />, text: "Chuẩn Chống Nước 5ATM" }
  ];

  return (
    <section id="hero" className="hero-section" onMouseMove={handleMouseMove}>
      {/* Background Glows */}
      <div className="hero-glow-1" style={{ transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` }}></div>
      <div className="hero-glow-2" style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}></div>

      <div className="container hero-container-grid">
        <div className="hero-content animate-slide-up">
          <div className="badge-slider glass-panel">
            <span className="badge-pulse"></span>
            <div className="badge-track" style={{ transform: `translateY(-${activeBadge * 40}px)` }}>
              {badges.map((badge, idx) => (
                <div key={idx} className="badge-slide">
                  {badge.icon}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          <h1 className="title-large hero-title">
            Sức khỏe trong tầm tay, <br />
            <span>Tinh tế</span> từng đường nét.
          </h1>
          
          <p className="text-lead hero-desc">
            HelioRing Gen 3 kết hợp công nghệ cảm biến sinh học tiên tiến cùng thiết kế vỏ Titanium sang trọng. Theo dõi giấc ngủ, nhịp tim và hoạt động của bạn 24/7 một cách âm thầm và thanh lịch.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={handleCta}>
              Đặt hàng ngay <ArrowRight size={16} />
            </button>
            <button className="btn btn-secondary btn-explore" onClick={handleExplore}>
              <Play size={14} className="play-icon" /> Khám phá tính năng
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">2.4g</div>
              <div className="stat-label">Siêu Nhẹ</div>
            </div>
            <div className="stat-item-divider"></div>
            <div className="stat-item">
              <div className="stat-number">5ATM</div>
              <div className="stat-label">Chống Nước (50m)</div>
            </div>
            <div className="stat-item-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Theo Dõi Chủ Động</div>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-fade-in" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}>
          <div className="ring-display-wrapper">
            <img 
              src="/assets/ring-black.webp" 
              alt="HelioRing Black Premium Edition" 
              className="hero-ring-image"
              width="600"
              height="600"
            />
            <div className="ring-shadow-effect"></div>
            <div className="ring-sensor-pulse"></div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          position: relative;
          padding-top: calc(var(--header-height) + 4rem);
          padding-bottom: 5rem;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: var(--bg-primary);
        }

        .hero-glow-1, .hero-glow-2 {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.12;
          z-index: 1;
          pointer-events: none;
          transition: transform 0.1s ease-out;
        }

        .hero-glow-1 {
          width: 500px;
          height: 500px;
          background: var(--primary-gold);
          top: -100px;
          right: -100px;
        }

        [data-theme='dark'] .hero-glow-1 {
          background: #3b82f6;
          opacity: 0.15;
        }

        .hero-glow-2 {
          width: 600px;
          height: 600px;
          background: var(--brand-primary);
          bottom: -200px;
          left: -200px;
        }

        [data-theme='dark'] .hero-glow-2 {
          background: #8b5cf6;
          opacity: 0.1;
        }

        .hero-container-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .badge-slider {
          display: inline-flex;
          align-items: center;
          height: 40px;
          padding: 0 16px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 2rem;
          position: relative;
          background-color: var(--surface-primary);
        }

        .badge-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--brand-success);
          margin-right: 12px;
          position: relative;
        }

        .badge-pulse::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid var(--brand-success);
          opacity: 0.5;
          animation: pulse-glow 1.5s infinite;
        }

        .badge-track {
          display: flex;
          flex-direction: column;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .badge-slide {
          height: 40px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hero-title span {
          color: var(--primary-gold);
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
        }

        .hero-desc {
          margin-top: 1.5rem;
          max-width: 600px;
          color: var(--text-secondary);
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .btn-explore {
          font-weight: 600;
        }

        .play-icon {
          fill: currentColor;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-top: 4rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .stat-item-divider {
          width: 1px;
          height: 40px;
          background-color: var(--border-color);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transition: transform 0.1s ease-out;
        }

        .ring-display-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-ring-image {
          width: 100%;
          height: auto;
          z-index: 2;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.15));
          animation: float-ring 6s ease-in-out infinite;
        }

        @keyframes float-ring {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .ring-shadow-effect {
          position: absolute;
          bottom: -20px;
          width: 70%;
          height: 20px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
          z-index: 1;
          filter: blur(5px);
          animation: float-shadow 6s ease-in-out infinite;
        }

        @keyframes float-shadow {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(0.9); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0.8; }
        }

        .ring-sensor-pulse {
          position: absolute;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0) 70%);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          animation: sensor-pulse 3s infinite ease-out;
        }

        @keyframes sensor-pulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
        }

        @media (max-width: 992px) {
          .hero-container-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .hero-desc {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
          }

          .ring-display-wrapper {
            max-width: 400px;
          }
        }
      `}</style>
    </section>
  );
};
