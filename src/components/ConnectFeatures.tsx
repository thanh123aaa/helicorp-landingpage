import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Scroll reveal (chạy động cả lúc vào và ra khỏi màn hình)
const useReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
    }, { threshold, rootMargin: '-40px 0px -40px 0px' });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const { ref, visible } = useReveal();
  return <div ref={ref} className={`rv ${className} ${visible ? 'rv--on' : ''}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

// ParallaxCard: Tích hợp Reveal & Parallax
const ParallaxCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  parallaxSpeed?: number;
}> = ({ children, className = '', delay = 0, parallaxSpeed = -0.06 }) => {
  const { ref: revealRef, visible } = useReveal();
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = parallaxRef.current; if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      if (rect.top < viewHeight && rect.bottom > 0) {
        const centerOffset = (rect.top + rect.height / 2) - viewHeight / 2;
        const translateY = centerOffset * parallaxSpeed;
        const targets = el.querySelectorAll('.fn-card-bg, .cn-card-img');
        targets.forEach((t) => {
          (t as HTMLElement).style.setProperty('--parallax-y', `${translateY}px`);
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxSpeed]);

  const setRefs = (node: HTMLDivElement | null) => {
    // @ts-ignore
    revealRef.current = node;
    // @ts-ignore
    parallaxRef.current = node;
  };

  return (
    <div
      ref={setRefs}
      className={`rv ${className} ${visible ? 'rv--on' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const ConnectFeatures: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="connectivity" className="cn-section">
      <div className="container">
        
        {/* Main Title */}
        <Reveal>
          <h2 className="cn-main-title">Kết Nối</h2>
        </Reveal>

        {/* ── 2x2 Grid of Cards ── */}
        <div className="cn-grid">
          
          {/* CARD 1: Keep in touch */}
          <ParallaxCard className="cn-card" parallaxSpeed={-0.08}>
            {/* Background watch image */}
            <div className="cn-card-media cn-card-media--contact">
              <img src="/assets/connect-contact.png" alt="Liên lạc" className="cn-card-img cn-card-img--contact" loading="lazy" />
            </div>
            <div className="cn-card-overlay" />
            
            <div className="cn-card-content">
              <h3 className="cn-card-title">Giữ liên lạc ngay trên cổ tay.</h3>
              <p className="cn-card-desc">
                Gọi điện, nhắn tin, thanh toán, nghe nhạc và hơn thế nữa – HelioWatch giúp bạn dễ dàng duy trì kết nối khi đang di chuyển. Và với gói dịch vụ dữ liệu di động, bạn có thể làm được mọi việc ngay cả khi không có iPhone ở gần.
              </p>
              <a href="#data-plan" className="cn-card-link">Tìm hiểu thêm về mạng dữ liệu di động &gt;</a>
            </div>
          </ParallaxCard>

          {/* CARD 2: Music & Pay */}
          <ParallaxCard className="cn-card" parallaxSpeed={-0.05} delay={100}>
            {/* Side-by-side watch renders inside card */}
            <div className="cn-card-media cn-card-media--dual">
              <img src="/assets/watch-silver.webp" alt="Music" className="cn-card-img cn-card-img--dual-left" loading="lazy" />
              <img src="/assets/watch-black.webp" alt="Pay" className="cn-card-img cn-card-img--dual-right" loading="lazy" />
            </div>
            <div className="cn-card-overlay" />
            
            <div className="cn-card-content">
              <h3 className="cn-card-title">Nghe trực tuyến. Tải về. Thanh toán. Phát nhạc. Dù bạn đi bất cứ đâu.</h3>
              <p className="cn-card-desc">
                Nghe trực tuyến hơn 100 triệu bài hát với Apple Music. Tải các ứng dụng mới từ App Store xuống thẳng đồng hồ. Mua mọi thứ một cách nhanh chóng và an toàn với Apple Pay. Và làm mọi việc mà không cần phải lấy iPhone ra.
              </p>
            </div>
          </ParallaxCard>

          {/* CARD 3: Translation */}
          <ParallaxCard className="cn-card" parallaxSpeed={-0.05} delay={150}>
            <div className="cn-card-media cn-card-media--single">
              <img src="/assets/watch-rose.webp" alt="Dịch trực tiếp" className="cn-card-img cn-card-img--single" loading="lazy" />
            </div>
            <div className="cn-card-overlay" />
            
            <div className="cn-card-content">
              <h3 className="cn-card-title">Giới thiệu Dịch Trực Tiếp.</h3>
              <p className="cn-card-desc">
                HelioWatch có thể sử dụng các thuật toán dịch tin nhắn thông minh tự động dịch sang ngôn ngữ bạn ưa thích, giúp bạn giữ liên lạc và không bỏ lỡ bất kỳ điều gì. Khi đi nước ngoài, bạn thậm chí có thể tải ngôn ngữ xuống đồng hồ để dịch ngoại tuyến mà không cần đến Wi-Fi hay kết nối di động. Thật cừ khôi.
              </p>
            </div>
          </ParallaxCard>

          {/* CARD 4: Smart stack */}
          <ParallaxCard className="cn-card" parallaxSpeed={-0.05} delay={200}>
            <div className="cn-card-media cn-card-media--single">
              <img src="/assets/watch-gold.webp" alt="Smart Stack" className="cn-card-img cn-card-img--single" loading="lazy" />
            </div>
            <div className="cn-card-overlay" />
            
            <div className="cn-card-content">
              <h3 className="cn-card-title">Thông minh hơn bao giờ hết.</h3>
              <p className="cn-card-desc">
                Ngăn Xếp Thông Minh tự động đề xuất các tiện ích để hiển thị thông tin có liên quan nhất trong suốt cả ngày dựa trên thời gian, vị trí của bạn và hơn thế nữa. Nhờ vậy bạn có thể thấy điểm số giấc ngủ và nhiều thông tin khác ngay khi thức dậy.
              </p>
            </div>
          </ParallaxCard>

        </div>
      </div>

      <style>{`
        /* ── SECTION ── */
        .cn-section {
          background: var(--bg-primary);
          padding: 80px 0 96px;
          color: var(--text-primary);
          transition: background 0.5s ease, color 0.5s ease;
        }

        .cn-main-title {
          font-family: var(--font-sans);
          font-size: clamp(2.4rem, 3.8vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 56px;
          text-align: left;
        }

        /* ── GRID ── */
        .cn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        /* ── CARD BASE ── */
        .cn-card {
          position: relative;
          height: 600px;
          border-radius: 28px;
          overflow: hidden;
          background: var(--surface-secondary);
          display: flex;
          flex-direction: column;
          cursor: default;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.8s ease;
          border: none;
        }

        .cn-card:hover {
          transform: scale(1.01) translateY(-4px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
        }

        [data-theme='dark'] .cn-card:hover {
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        /* Gradient overlays for text readability */
        .cn-card-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(245,245,247,0.95) 0%,
            rgba(245,245,247,0.7) 45%,
            rgba(245,245,247,0.15) 75%,
            transparent 100%
          );
        }

        [data-theme='dark'] .cn-card-overlay {
          background: linear-gradient(
            to bottom,
            rgba(20,20,20,0.98) 0%,
            rgba(20,20,20,0.7) 45%,
            rgba(20,20,20,0.15) 75%,
            transparent 100%
          );
        }

        /* Content layer */
        .cn-card-content {
          position: relative;
          z-index: 3;
          padding: 44px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cn-card-title {
          font-family: var(--font-sans);
          font-size: 1.38rem;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: #1d1d1f;
        }

        [data-theme='dark'] .cn-card-title {
          color: #f5f5f7;
        }

        .cn-card-desc {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          line-height: 1.6;
          color: #515154;
        }

        [data-theme='dark'] .cn-card-desc {
          color: rgba(245,245,247,0.55);
        }

        .cn-card-link {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
          color: #0066cc;
          text-decoration: none;
          margin-top: 4px;
          transition: text-decoration 0.2s;
        }

        .cn-card-link:hover {
          text-decoration: underline;
        }

        /* Media layer */
        .cn-card-media {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* Image transitions (Parallax support: transition: transform 0.15s ease-out) */
        .cn-card-img {
          transition: transform 0.15s ease-out, filter 0.8s ease;
          display: block;
        }

        /* ── CARD-SPECIFIC POSITIONING ── */

        /* 1. Contact Card (Phủ tràn toàn thẻ) */
        .cn-card-media--contact {
          background: transparent;
        }
        .cn-card-img--contact {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 85%;
          transform: translateY(var(--parallax-y, 0px)) scale(1.05);
        }
        [data-theme='dark'] .cn-card-img--contact {
          filter: brightness(0.8) contrast(1.1);
        }

        .cn-card:hover .cn-card-img--contact {
          transform: translateY(var(--parallax-y, 0px)) scale(1.09) rotate(-1deg);
        }

        /* 2. Dual watches (Đồng hồ kép nhạc/pay - phóng lớn lệch phải làm nền) */
        .cn-card-media--dual {
          background: radial-gradient(circle at 80% 80%, rgba(0, 102, 204, 0.08) 0%, transparent 60%);
        }
        [data-theme='dark'] .cn-card-media--dual {
          background: radial-gradient(circle at 80% 80%, rgba(0, 102, 204, 0.15) 0%, transparent 60%);
        }
        .cn-card-img--dual-left {
          position: absolute;
          width: 60%;
          height: auto;
          bottom: -15%;
          right: 20%;
          transform: translateY(var(--parallax-y, 0px)) rotate(-10deg) scale(1.02);
          z-index: 2;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
        }
        .cn-card-img--dual-right {
          position: absolute;
          width: 55%;
          height: auto;
          bottom: -10%;
          right: -5%;
          transform: translateY(var(--parallax-y, 0px)) rotate(5deg) scale(1.02);
          z-index: 1;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
        }
        [data-theme='dark'] .cn-card-img--dual-left,
        [data-theme='dark'] .cn-card-img--dual-right {
          filter: drop-shadow(0 20px 40px rgba(255,255,255,0.06));
        }

        .cn-card:hover .cn-card-img--dual-left {
          transform: translateY(var(--parallax-y, 0px)) rotate(-7deg) translateY(-8px) scale(1.05);
        }
        .cn-card:hover .cn-card-img--dual-right {
          transform: translateY(var(--parallax-y, 0px)) rotate(7deg) translateY(-4px) scale(1.05);
        }

        /* 3. Single Watch Renders (Rose and Gold) */
        .cn-card-media--single {
          background: radial-gradient(circle at 80% 85%, rgba(212, 175, 55, 0.08) 0%, transparent 60%);
        }
        [data-theme='dark'] .cn-card-media--single {
          background: radial-gradient(circle at 80% 85%, rgba(212, 175, 55, 0.15) 0%, transparent 60%);
        }
        .cn-card-img--single {
          position: absolute;
          width: 75%;
          height: auto;
          bottom: -18%;
          right: -10%;
          transform: translateY(var(--parallax-y, 0px)) rotate(-5deg) scale(1.02);
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
        }
        [data-theme='dark'] .cn-card-img--single {
          filter: drop-shadow(0 20px 40px rgba(255,255,255,0.06));
        }

        .cn-card:hover .cn-card-img--single {
          transform: translateY(var(--parallax-y, 0px)) rotate(-2deg) translateY(-10px) scale(1.06);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .cn-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .cn-card {
            height: auto;
            min-height: 520px;
          }
          .cn-card-content {
            padding: 40px 32px 300px;
          }
          .cn-card-media {
            height: 300px;
            top: auto;
          }
          .cn-card-img--contact {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .cn-card-img--dual-left {
            width: 50%;
            bottom: -10%;
            right: 25%;
          }
          .cn-card-img--dual-right {
            width: 45%;
            bottom: -5%;
            right: 0;
          }
          .cn-card-img--single {
            width: 60%;
            bottom: -12%;
            right: 0;
          }
        }

        @media (max-width: 600px) {
          .cn-section {
            padding: 64px 0 56px;
          }
          .cn-main-title {
            margin-bottom: 36px;
          }
          .cn-card-content {
            padding: 32px 24px 240px;
          }
          .cn-card-media {
            height: 240px;
          }
        }
      `}</style>
    </section>
  );
};
