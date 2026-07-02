import React, { useRef, useEffect, useState } from 'react';
import { Moon, Heart, Shield, Activity, Compass, Smartphone, Sparkles } from 'lucide-react';
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
      className={`apple-bento-card ${className} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const BentoFeatures: React.FC = () => {
  const { trackEvent } = useTracking();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCardClick = (title: string) => {
    trackEvent(`Xem chi tiết tính năng: ${title}`, 'Features Section', 'Apple Bento Card Click');
  };

  return (
    <section id="features" className="apple-features-section">
      <div className="container">
        <div className="section-header animate-slide-up">
          <h2 className="apple-section-title">
            Công nghệ vượt trội. <br />
            <span>Phong cách dẫn đầu.</span>
          </h2>
          <p className="apple-section-desc">
            HelioWatch sở hữu loạt cảm biến sức khỏe tối tân nhất cùng màn hình AMOLED đỉnh cao, gói gọn tất cả trong một thiết kế tinh xảo, thời thượng.
          </p>
        </div>

        <div className="apple-bento-grid">
          {/* Card 1: Vòng hoạt động Activity Rings (Large - 2x2) */}
          <BentoCard className="bento-span-2 bento-row-span-2 activity-card" delay={100}>
            <div className="card-inner" onClick={() => handleCardClick('Vòng hoạt động Activity')}>
              <div className="card-header-icon text-pink">
                <Activity size={24} />
              </div>
              <div className="card-info">
                <span className="card-tag text-pink">Vòng hoạt động</span>
                <h3 className="card-title">Hoàn thành mục tiêu mỗi ngày</h3>
                <p className="card-desc">
                  Theo dõi ba chỉ số quan trọng: Di chuyển (Đỏ), Luyện tập (Xanh lá) và Đứng (Xanh dương). Hệ thống vòng tròn hoạt động tự động lấp đầy, khích lệ bạn năng động hơn mỗi ngày để đạt cuộc sống khỏe mạnh.
                </p>
              </div>
              
              <div className="rings-visual-wrapper">
                <svg className="activity-rings-svg" viewBox="0 0 160 160">
                  {/* Track backgrounds */}
                  <circle cx="80" cy="80" r="65" stroke="rgba(250, 17, 79, 0.15)" strokeWidth="12" fill="none" />
                  <circle cx="80" cy="80" r="50" stroke="rgba(58, 226, 73, 0.15)" strokeWidth="12" fill="none" />
                  <circle cx="80" cy="80" r="35" stroke="rgba(0, 180, 255, 0.15)" strokeWidth="12" fill="none" />
                  
                  {/* Red Ring (Move) - 80% */}
                  <circle 
                    cx="80" cy="80" r="65" 
                    stroke="#fa114f" strokeWidth="12" fill="none" 
                    strokeLinecap="round"
                    strokeDasharray="408.4"
                    strokeDashoffset="81.7"
                    className="animated-ring ring-red"
                  />
                  {/* Green Ring (Exercise) - 65% */}
                  <circle 
                    cx="80" cy="80" r="50" 
                    stroke="#3ae249" strokeWidth="12" fill="none" 
                    strokeLinecap="round"
                    strokeDasharray="314.1"
                    strokeDashoffset="110.0"
                    className="animated-ring ring-green"
                  />
                  {/* Blue Ring (Stand) - 50% */}
                  <circle 
                    cx="80" cy="80" r="35" 
                    stroke="#00b4ff" strokeWidth="12" fill="none" 
                    strokeLinecap="round"
                    strokeDasharray="220.0"
                    strokeDashoffset="110.0"
                    className="animated-ring ring-blue"
                  />
                </svg>
                <div className="rings-data-legend">
                  <div className="legend-item"><span className="dot red"></span> Di chuyển: 480/600 Calo</div>
                  <div className="legend-item"><span className="dot green"></span> Luyện tập: 20/30 Phút</div>
                  <div className="legend-item"><span className="dot blue"></span> Đứng: 8/12 Giờ</div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: ECG & Nhịp tim (Medium - 1x1) */}
          <BentoCard className="heart-ecg-card" delay={200}>
            <div className="card-inner" onClick={() => handleCardClick('Đo điện tâm đồ ECG')}>
              <div className="card-header-icon text-red">
                <Heart size={24} />
              </div>
              <div className="card-info">
                <span className="card-tag text-red">Điện tâm đồ</span>
                <h3 className="card-title">ECG ngay trên cổ tay</h3>
                <p className="card-desc">
                  Đo điện tâm đồ ECG bất cứ lúc nào để phát hiện các dấu hiệu bất thường của nhịp tim.
                </p>
              </div>
              
              <div className="ecg-visual-wrapper">
                <div className="ecg-wave-line">
                  <svg viewBox="0 0 120 40" className="wave-svg">
                    <path d="M0,20 L30,20 L35,10 L40,30 L45,16 L50,22 L55,20 L80,20 L85,5 L90,35 L95,12 L100,24 L105,20 L120,20" fill="none" stroke="#fa114f" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="ecg-current-rate">
                  72 <span>BPM</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Sleep Matrix (Medium - 1x1) */}
          <BentoCard className="sleep-matrix-card" delay={300}>
            <div className="card-inner" onClick={() => handleCardClick('Theo dõi giấc ngủ')}>
              <div className="card-header-icon text-purple">
                <Moon size={24} />
              </div>
              <div className="card-info">
                <span className="card-tag text-purple">Giấc ngủ</span>
                <h3 className="card-title">Thấu hiểu từng giấc ngủ</h3>
                <p className="card-desc">
                  Phân tích chi tiết 4 giai đoạn ngủ (REM, Sâu, Nông, Thức) để cải thiện thói quen nghỉ ngơi của bạn.
                </p>
              </div>
              <div className="sleep-score-visual">
                <div className="sleep-score-box">
                  <span className="score-number">88</span>
                  <span className="score-tag">ĐIỂM SỐ</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: GPS Định vị (Medium - 1x1) */}
          <BentoCard className="gps-navigation-card" delay={400}>
            <div className="card-inner" onClick={() => handleCardClick('Định vị GPS')}>
              <div className="card-header-icon text-orange">
                <Compass size={24} />
              </div>
              <div className="card-info">
                <span className="card-tag text-orange">Định vị GPS</span>
                <h3 className="card-title">GPS tần số kép chuẩn xác</h3>
                <p className="card-desc">
                  Tích hợp anten định vị GPS đa tần số giúp vẽ lại lộ trình chạy bộ hoặc đi bộ chính xác ngay cả trong đô thị đông đúc.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Card 5: Smart Notifications (Medium - 1x1) */}
          <BentoCard className="smart-notifications-card" delay={500}>
            <div className="card-inner" onClick={() => handleCardClick('Thông báo thông minh')}>
              <div className="card-header-icon text-cyan">
                <Smartphone size={24} />
              </div>
              <div className="card-info">
                <span className="card-tag text-cyan">Kết nối</span>
                <h3 className="card-title">Kết nối không gián đoạn</h3>
                <p className="card-desc">
                  Nhận thông báo, điều khiển nhạc, cuộc gọi và tin nhắn trực tiếp mà không cần chạm điện thoại.
                </p>
              </div>
              <div className="notification-bubble-visual glass-panel">
                <div className="bubble-sender">✉️ Tin nhắn</div>
                <div className="bubble-msg">"Hôm nay bạn có lịch tập chạy lúc 18:00 nhé!"</div>
              </div>
            </div>
          </BentoCard>

          {/* Card 6: Titanium Case & Chống nước (Wide - 2x1) */}
          <BentoCard className="bento-span-2 durability-card" delay={600}>
            <div className="card-inner-row" onClick={() => handleCardClick('Độ bền Titanium')}>
              <div className="card-info-side">
                <div className="card-header-icon text-gold">
                  <Shield size={24} />
                </div>
                <span className="card-tag text-gold">Độ bền vượt thời gian</span>
                <h3 className="card-title">Vỏ Titanium & Kháng nước 5ATM</h3>
                <p className="card-desc">
                  Khung vỏ chế tác từ chất liệu hợp kim Titanium nguyên khối siêu bền bỉ thường dùng trong hàng không, nhẹ nhàng nhưng chịu lực tốt. Đi kèm khả năng chống nước hoàn hảo ở độ sâu 50m (5ATM), sẵn sàng đồng hành cùng bạn trong mọi điều kiện thời tiết.
                </p>
              </div>
              <div className="durability-visual-side">
                <div className="durability-badge-circle">Ti</div>
                <div className="waterproof-badge">💧 50m</div>
              </div>
            </div>
          </BentoCard>

          {/* Card 7: AI Insights Coach (Medium - 1x1) */}
          <BentoCard className="ai-coach-card" delay={700}>
            <div className="card-inner" onClick={() => handleCardClick('AI Coaching')}>
              <div className="card-header-icon text-green">
                <Sparkles size={20} />
              </div>
              <div className="card-info">
                <span className="card-tag text-green">Huấn luyện AI</span>
                <h3 className="card-title">Insight y tế cá nhân hóa</h3>
                <p className="card-desc">
                  Nhận phân tích và đề xuất luyện tập phù hợp nhất với trạng thái thể lực hiện tại của bạn.
                </p>
              </div>
              <div className="coach-msg-bubble glass-panel">
                <p>"Thể lực của bạn phục hồi rất tốt (92%). Hôm nay thích hợp cho một bài tập cường độ cao!"</p>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>

      <style>{`
        .apple-features-section {
          padding: 8rem 0;
          background-color: #000000; /* Apple Deep Black background */
          color: #ffffff;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .apple-section-title {
          font-family: var(--font-sans);
          font-size: clamp(2.5rem, 5vw, 4.2rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #ffffff;
        }

        .apple-section-title span {
          background: linear-gradient(135deg, #a1a1a6 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .apple-section-desc {
          margin-top: 1.5rem;
          color: #a1a1a6; /* Apple classic gray */
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          font-size: 1.15rem;
          line-height: 1.6;
        }

        /* Apple Bento Grid */
        .apple-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 320px;
          gap: 1.25rem;
        }

        .apple-bento-card {
          background-color: #1c1c1e; /* Apple System Gray 6 */
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.02);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.3s ease,
                      box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          
          /* Fade-in and slide-up observer */
          opacity: 0;
          transform: translateY(35px);
        }

        .apple-bento-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .apple-bento-card:hover {
          transform: translateY(-4px);
          background-color: #2c2c2e;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .bento-span-2 {
          grid-column: span 2;
        }

        .bento-row-span-2 {
          grid-row: span 2;
        }

        .card-inner {
          padding: 2.2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-inner-row {
          padding: 2.2rem;
          height: 100%;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          align-items: center;
          gap: 2rem;
        }

        .card-header-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
        }

        /* Color accents */
        .text-pink { color: #fa114f; }
        .text-red { color: #fa114f; }
        .text-purple { color: #af52de; }
        .text-orange { color: #ff9500; }
        .text-cyan { color: #32d7c0; }
        .text-gold { color: #ffd60a; }
        .text-green { color: #30d158; }

        .card-info {
          display: flex;
          flex-direction: column;
        }

        .card-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }

        .card-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin-bottom: 0.6rem;
          line-height: 1.25;
        }

        .card-desc {
          font-size: 0.9rem;
          color: #a1a1a6;
          line-height: 1.5;
        }

        /* Activity Rings Visual */
        .rings-visual-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-top: 1.5rem;
          gap: 2rem;
          width: 100%;
        }

        .activity-rings-svg {
          width: 140px;
          height: 140px;
          transform: rotate(-90deg);
        }

        .animated-ring {
          transition: stroke-dashoffset 2s ease-out;
        }

        .rings-data-legend {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-item .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot.red { background-color: #fa114f; }
        .dot.green { background-color: #3ae249; }
        .dot.blue { background-color: #00b4ff; }

        /* ECG Visual */
        .ecg-visual-wrapper {
          margin-top: 1rem;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 16px;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
        }

        .ecg-wave-line {
          flex-grow: 1;
          display: flex;
          align-items: center;
        }

        .wave-svg {
          height: 35px;
          width: 100%;
        }

        .ecg-current-rate {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          white-space: nowrap;
          padding-left: 10px;
        }

        .ecg-current-rate span {
          font-size: 0.75rem;
          color: #a1a1a6;
        }

        /* Sleep visual */
        .sleep-score-visual {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
        }

        .sleep-score-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 4px solid #af52de;
          background-color: rgba(175, 82, 222, 0.05);
        }

        .score-number {
          font-size: 1.7rem;
          font-weight: 800;
          line-height: 1;
          color: #ffffff;
        }

        .score-tag {
          font-size: 0.55rem;
          color: #a1a1a6;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        /* Smart Notification Visual */
        .notification-bubble-visual {
          margin-top: 1rem;
          padding: 0.8rem 1rem;
          border-radius: 14px;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .bubble-sender {
          font-weight: 700;
          color: #32d7c0;
        }

        .bubble-msg {
          color: #e5e5ea;
        }

        /* Durability visual side */
        .durability-visual-side {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .durability-badge-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a1a1a6 0%, #2c2c2e 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .waterproof-badge {
          padding: 4px 12px;
          border-radius: 30px;
          background-color: rgba(255, 214, 10, 0.1);
          color: #ffd60a;
          font-size: 0.8rem;
          font-weight: 700;
        }

        /* AI coach card message */
        .coach-msg-bubble {
          margin-top: 1rem;
          padding: 0.8rem 1rem;
          border-radius: 14px;
          background-color: rgba(48, 209, 88, 0.05);
          border: 1px solid rgba(48, 209, 88, 0.1);
          font-size: 0.8rem;
          color: #e5e5ea;
          line-height: 1.45;
          font-style: italic;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .apple-bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
          }

          .bento-span-2 {
            grid-column: span 2;
          }

          .bento-row-span-2 {
            grid-row: span 1;
          }

          .rings-visual-wrapper {
            flex-direction: row;
            padding: 1rem 0;
          }
        }

        @media (max-width: 768px) {
          .apple-bento-grid {
            grid-template-columns: 1fr;
          }

          .bento-span-2 {
            grid-column: span 1;
          }

          .card-inner-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .durability-visual-side {
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
          }

          .rings-visual-wrapper {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};
