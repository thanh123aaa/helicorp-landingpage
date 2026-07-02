import React, { useRef, useEffect, useState } from 'react';
import { Moon, Heart, ShieldAlert, Sparkles, Navigation } from 'lucide-react';
import { useTracking } from '../hooks/useTracking';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bento-card ${className} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const BentoFeatures: React.FC = () => {
  const { trackEvent } = useTracking();

  const handleCardClick = (title: string) => {
    trackEvent(`Xem chi tiết tính năng: ${title}`, 'Features Section', 'Bento Card Click');
  };

  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="title-section">
          Công nghệ tiên phong, <span>Cuộc sống</span> hoàn hảo
        </h2>
        <p className="section-desc">
          HelioRing gói gọn các cảm biến sinh học tinh vi nhất trong một vòng tròn hoàn mỹ, cung cấp cho bạn thông tin sức khỏe chuẩn xác nhất.
        </p>

        <div className="bento-grid">
          {/* Card 1: Sleep matrix (Large) */}
          <BentoCard className="bento-item bento-large sleep-card" delay={100}>
            <div className="card-content" onClick={() => handleCardClick('Theo dõi giấc ngủ')}>
              <div className="icon-badge sleep-icon">
                <Moon size={24} />
              </div>
              <div className="card-info">
                <h3>Sleep Matrix™</h3>
                <p className="card-tagline">Phân tích giấc ngủ 4 giai đoạn chuyên sâu</p>
                <p className="card-description">
                  Theo dõi chính xác thời gian ngủ sâu (Deep), ngủ mơ (REM), ngủ nông (Light) và thời gian thức dậy. Nhận điểm số giấc ngủ hàng sáng kèm gợi ý cá nhân hóa từ AI Coach giúp bạn hồi phục năng lượng tối ưu.
                </p>
              </div>
              <div className="sleep-visual">
                <div className="sleep-bar-chart">
                  <div className="bar rem" style={{ height: '40%' }}><span className="bar-tooltip">REM (25%)</span></div>
                  <div className="bar deep" style={{ height: '75%' }}><span className="bar-tooltip">Sâu (35%)</span></div>
                  <div className="bar light" style={{ height: '90%' }}><span className="bar-tooltip">Nông (30%)</span></div>
                  <div className="bar awake" style={{ height: '20%' }}><span className="bar-tooltip">Thức (10%)</span></div>
                </div>
                <div className="sleep-score-circle">
                  <span className="score-num">88</span>
                  <span className="score-label">Tốt</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Heart rate (Medium) */}
          <BentoCard className="bento-item heart-card" delay={200}>
            <div className="card-content" onClick={() => handleCardClick('Đo tim & HRV')}>
              <div className="icon-badge heart-icon">
                <Heart size={24} />
              </div>
              <div className="card-info">
                <h3>Đo Tim & HRV 24/7</h3>
                <p className="card-description">
                  Theo dõi liên tục nhịp tim, nhịp thở và Biến thiên nhịp tim (HRV). Giúp bạn hiểu rõ mức độ căng thẳng của cơ thể và trạng thái phục hồi của hệ thần kinh tự chủ.
                </p>
              </div>
              <div className="heart-visual">
                <div className="heart-pulse-wave">
                  <svg viewBox="0 0 100 30" className="wave-svg">
                    <path d="M0,15 L20,15 L25,5 L30,25 L35,12 L40,17 L45,15 L65,15 L70,2 L75,28 L80,10 L85,18 L90,15 L100,15" fill="none" stroke="var(--brand-error)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="heart-rate-num">72 <span>BPM</span></span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Gesture Control (Medium) */}
          <BentoCard className="bento-item gesture-card" delay={300}>
            <div className="card-content" onClick={() => handleCardClick('Cử chỉ thông minh')}>
              <div className="icon-badge gesture-icon">
                <Navigation size={24} />
              </div>
              <div className="card-info">
                <h3>Smart Gesture</h3>
                <p className="card-description">
                  Điều khiển điện thoại từ xa thông qua cử chỉ chạm ngón tay đơn giản. Chụp ảnh selfie, lướt trang trình chiếu hoặc tạm dừng bài nhạc ưa thích mà không cần chạm màn hình.
                </p>
              </div>
              <div className="gesture-visual">
                <div className="gesture-circles">
                  <div className="circle-pulse ring-1"></div>
                  <div className="circle-pulse ring-2"></div>
                  <div className="circle-pulse ring-3"></div>
                  <div className="gesture-icon-inner">✨</div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: Material & Waterproof (Long / Horizontal) */}
          <BentoCard className="bento-item bento-wide material-card" delay={400}>
            <div className="card-content" onClick={() => handleCardClick('Vật liệu Titanium')}>
              <div className="icon-badge material-icon">
                <ShieldAlert size={24} />
              </div>
              <div className="card-info-row">
                <div className="text-section">
                  <h3>Titanium Shell & Chống Nước 50m</h3>
                  <p className="card-description">
                    Lớp vỏ bằng chất liệu Titanium cấp hàng không vũ trụ cao cấp đem lại độ bền đáng kinh ngạc trong một trọng lượng siêu nhẹ (chỉ từ 2.4g). Kết hợp chuẩn chống nước 5ATM (50m) cho phép bạn bơi lội, rửa tay hay đi mưa hoàn toàn thoải mái.
                  </p>
                </div>
                <div className="material-visual">
                  <div className="titanium-badge">Ti</div>
                  <div className="water-drop-effect">💧 50m</div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 5: AI Insights */}
          <BentoCard className="bento-item ai-card" delay={500}>
            <div className="card-content" onClick={() => handleCardClick('AI Coaching')}>
              <div className="icon-badge ai-icon">
                <Sparkles size={24} />
              </div>
              <div className="card-info">
                <h3>Trợ Lý Sức Khỏe AI</h3>
                <p className="card-description">
                  Phân tích tổng quan dữ liệu hàng ngày để đưa ra lời khuyên thiết thực. AI tự học theo cơ địa để dự báo xu hướng sức khỏe của bạn theo thời gian thực.
                </p>
              </div>
              <div className="ai-coach-bubble glass-panel">
                <div className="ai-avatar">💬</div>
                <div className="ai-text">Hôm nay chỉ số phục hồi của bạn là 92%. Rất thích hợp cho một buổi tập cường độ cao!</div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>

      <style>{`
        .features-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
          position: relative;
        }

        .section-desc {
          text-align: center;
          color: var(--text-secondary);
          max-width: 650px;
          margin: -2rem auto 4.5rem;
          font-size: 1.1rem;
        }

        /* Bento Grid Layout */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 280px;
          gap: 1.5rem;
        }

        .bento-item {
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease,
                      opacity 0.8s ease-out,
                      translate 0.8s ease-out;
          
          /* Intersection observer initial state */
          opacity: 0;
          transform: translateY(40px);
        }

        .bento-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .bento-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--glass-shadow);
          border-color: var(--text-primary);
        }

        .bento-large {
          grid-column: span 2;
          grid-row: span 2;
        }

        .bento-wide {
          grid-column: span 2;
        }

        .card-content {
          padding: 2.2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .icon-badge {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .sleep-icon { background: rgba(59, 130, 246, 0.1); color: var(--brand-primary); }
        .heart-icon { background: rgba(239, 68, 68, 0.1); color: var(--brand-error); }
        .gesture-icon { background: rgba(16, 185, 129, 0.1); color: var(--brand-success); }
        .material-icon { background: rgba(197, 168, 128, 0.1); color: var(--primary-gold); }
        .ai-icon { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

        .card-info h3 {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .card-tagline {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--primary-gold);
          margin-bottom: 0.75rem;
        }

        .card-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Sleep Card Visuals */
        .sleep-card .card-content {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2rem;
          align-items: center;
        }

        .sleep-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          position: relative;
        }

        .sleep-bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          height: 120px;
          width: 100%;
          max-width: 180px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
        }

        .sleep-bar-chart .bar {
          flex: 1;
          border-radius: 6px;
          position: relative;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .sleep-bar-chart .bar:hover {
          filter: brightness(1.2);
          transform: scaleX(1.05);
        }

        .bar.rem { background-color: #60a5fa; }
        .bar.deep { background-color: #1d4ed8; }
        .bar.light { background-color: #93c5fd; }
        .bar.awake { background-color: #fca5a5; }

        .bar-tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--text-primary);
          color: var(--bg-primary);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          transition: var(--transition-fast);
        }

        .sleep-bar-chart .bar:hover .bar-tooltip {
          opacity: 1;
          top: -35px;
        }

        .sleep-score-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 4px solid var(--brand-primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: -20px;
          right: -20px;
          background-color: var(--surface-primary);
          box-shadow: var(--glass-shadow);
        }

        .score-num {
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1;
        }

        .score-label {
          font-size: 0.65rem;
          color: var(--text-tertiary);
          font-weight: 700;
          text-transform: uppercase;
        }

        /* Heart Card Visuals */
        .heart-visual {
          margin-top: 1rem;
          background-color: var(--bg-secondary);
          border-radius: 16px;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .heart-pulse-wave {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
        }

        .wave-svg {
          height: 30px;
          flex-grow: 1;
        }

        .heart-rate-num {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .heart-rate-num span {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        /* Gesture Visual */
        .gesture-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80px;
          margin-top: 1rem;
        }

        .gesture-circles {
          position: relative;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .circle-pulse {
          position: absolute;
          border: 1px solid var(--brand-success);
          border-radius: 50%;
          animation: gesture-pulse-anim 2s infinite linear;
        }

        .circle-pulse.ring-1 { animation-delay: 0s; }
        .circle-pulse.ring-2 { animation-delay: 0.6s; }
        .circle-pulse.ring-3 { animation-delay: 1.2s; }

        @keyframes gesture-pulse-anim {
          0% { width: 20px; height: 20px; opacity: 1; }
          100% { width: 70px; height: 70px; opacity: 0; }
        }

        .gesture-icon-inner {
          font-size: 1.5rem;
          z-index: 2;
        }

        /* Material Wide Card */
        .card-info-row {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 2rem;
          align-items: center;
          height: 100%;
        }

        .material-visual {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .titanium-badge {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e6e8eb 0%, #a0a5ad 100%);
          color: #12131a;
          font-weight: 800;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .water-drop-effect {
          padding: 0.5rem 1rem;
          border-radius: 30px;
          background-color: rgba(59, 130, 246, 0.1);
          color: var(--brand-primary);
          font-size: 0.85rem;
          font-weight: 700;
          align-self: center;
        }

        /* AI insights card styling */
        .ai-coach-bubble {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 16px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          background-color: var(--bg-secondary);
        }

        .ai-avatar {
          font-size: 1.2rem;
        }

        .ai-text {
          font-size: 0.825rem;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 992px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: minmax(280px, auto);
          }

          .bento-large {
            grid-column: span 2;
            grid-row: span 1;
          }

          .sleep-card .card-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .sleep-visual {
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
          }

          .sleep-score-circle {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }

          .bento-large, .bento-wide {
            grid-column: span 1;
          }

          .card-info-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .card-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};
