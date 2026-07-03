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

// ParallaxCard: Tích hợp đồng thời cả hiệu ứng cuộn Parallax và Reveal xuất hiện
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
        // Tính toán độ lệch tương đối của card so với trung tâm viewport
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

export const FitnessFeatures: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Dynamic asset paths based on theme
  const images = {
    rings: isDark ? '/assets/fit-rings-dark.webp' : '/assets/fit-rings-light.webp',
    dual: isDark ? '/assets/fit-dual-dark.webp' : '/assets/fit-dual-light.webp',
    yellow: isDark ? '/assets/fit-yellow-dark.webp' : '/assets/fit-yellow-light.webp',
    chart: isDark ? '/assets/fit-chart-dark.webp' : '/assets/fit-chart-light.webp'
  };

  return (
    <section id="fitness" className="fn-section">
      <div className="container">
        
        {/* Header */}
        <Reveal>
          <h2 className="fn-main-title">Thể Dục Và Hoạt Động</h2>
        </Reveal>

        {/* ── CARD 1: Large Row (Rings) ── */}
        <ParallaxCard className="fn-card fn-card--large" parallaxSpeed={-0.08}>
          <img src={images.rings} alt="" className="fn-card-bg fn-card-bg--rings" loading="lazy" />
          <div className="fn-card-overlay fn-card-overlay--large" />
          
          <div className="fn-card-content">
            <h3 className="fn-card-title">
              Di chuyển. Thể dục. Đứng.<br />
              Hoàn thành mục tiêu, từng vòng một.
            </h3>
            <p className="fn-card-desc">
              Theo dõi hoạt động hằng ngày của bạn – ví dụ lượng calo hoạt động bạn tiêu thụ, số phút bạn tập thể dục và thời gian bạn đứng – với vòng Hoạt Động. Tùy chỉnh mục tiêu từng ngày trong tuần để bạn có thể hoàn thành các vòng hoạt động mỗi ngày hoặc tạm dừng nếu bạn cần nghỉ ngơi. Bạn cũng có thể xem số bước hiện tại và các bài tập đã hoàn thành trong ngày trên ứng dụng Hoạt Động.
            </p>
          </div>
        </ParallaxCard>

        {/* ── CARD 2 & 3: Twin Grid ── */}
        <div className="fn-grid">
          
          {/* Card Left */}
          <ParallaxCard className="fn-card fn-card--small" parallaxSpeed={-0.05} delay={100}>
            <img src={images.dual} alt="" className="fn-card-bg fn-card-bg--bottom" loading="lazy" />
            <div className="fn-card-overlay fn-card-overlay--small" />
            
            <div className="fn-card-content">
              <h3 className="fn-card-title fn-card-title--sm">Đo mọi hình thức vận động của bạn.</h3>
              <p className="fn-card-desc fn-card-desc--sm">
                Từ rèn luyện sức mạnh và chạy bộ đến Pilates và yoga, HelioWatch mang tới thật nhiều cách để giúp bạn theo dõi các bài tập của mình. Và bạn sẽ thấy sự tiến bộ của bản thân thông qua các chỉ số và chế độ xem nâng cao như Vùng Nhịp Tim, Công Suất và Độ Cao.
              </p>
            </div>
          </ParallaxCard>

          {/* Card Right */}
          <ParallaxCard className="fn-card fn-card--small" parallaxSpeed={-0.05} delay={200}>
            <img src={images.yellow} alt="" className="fn-card-bg fn-card-bg--bottom" loading="lazy" />
            <div className="fn-card-overlay fn-card-overlay--small" />
            
            <div className="fn-card-content">
              <h3 className="fn-card-title fn-card-title--sm">Đưa các bài tập của bạn lên tầm cao mới.</h3>
              <p className="fn-card-desc fn-card-desc--sm">
                Tạo các Bài Tập Tùy Chỉnh với quãng thời gian và khoảng cách, cũng như các khoảng thời gian khởi động, hạ nhiệt và phục hồi. Và xem bài tập sau là gì với chế độ xem bài tập Tiếp Theo.
              </p>
            </div>
          </ParallaxCard>
        </div>

        {/* ── CARD 4: Large Row (Chart) ── */}
        <ParallaxCard className="fn-card fn-card--large" parallaxSpeed={-0.08}>
          <img src={images.chart} alt="" className="fn-card-bg fn-card-bg--chart" loading="lazy" />
          <div className="fn-card-overlay fn-card-overlay--large" />
          
          <div className="fn-card-content">
            <h3 className="fn-card-title">
              Công cụ mạnh mẽ giúp bạn chinh phục mục tiêu.
            </h3>
            <p className="fn-card-desc">
              Khối lượng tập luyện giúp bạn biết cường độ và thời gian của các bài tập có thể tác động đến cơ thể của bạn như thế nào theo thời gian. Vì vậy bạn có thể đưa ra quyết định đúng đắn về cách thức và thời điểm điều chỉnh bài tập – nhất là khi bạn đang tập luyện để chuẩn bị cho một sự kiện lớn.
            </p>
          </div>
        </ParallaxCard>

      </div>

      <style>{`
        /* ── SECTION ── */
        .fn-section {
          background: var(--bg-primary);
          padding: 100px 0 96px;
          color: var(--text-primary);
          transition: background 0.5s ease, color 0.5s ease;
        }

        .fn-main-title {
          font-family: var(--font-sans);
          font-size: clamp(2.4rem, 3.8vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 56px;
          text-align: left;
        }

        /* ── CARD BASE ── */
        .fn-card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: var(--surface-secondary);
          border: none;
          display: block;
          cursor: default;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.8s ease;
        }

        .fn-card:hover {
          transform: scale(1.01) translateY(-4px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
        }

        [data-theme='dark'] .fn-card:hover {
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        /* Background image (Parallax support: scale(1.05) is buffer for sliding gaps) */
        .fn-card-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fn-card:hover .fn-card-bg {
          transform: scale(1.02);
        }

        /* Position variations for watch images inside cover */
        .fn-card-bg--rings {
          object-position: 95% center;
        }
        
        .fn-card-bg--chart {
          object-position: 95% center;
        }

        .fn-card-bg--bottom {
          object-position: center bottom;
        }

        /* Đồng bộ ảnh nền bao phủ 100% diện tích thẻ */
        .fn-card-bg--rings,
        .fn-card-bg--chart {
          object-fit: cover;
          width: 100%;
          height: 100%;
          left: 0;
          right: 0;
          padding: 0;
          object-position: 85% center;
        }

        .fn-card-bg--bottom {
          object-fit: cover;
          width: 100%;
          height: 100%;
          top: 0;
          bottom: 0;
          object-position: center 85%;
        }

        /* Blending modes */
        .fn-card-bg {
          mix-blend-mode: multiply;
        }
        [data-theme='dark'] .fn-card-bg {
          mix-blend-mode: normal;
        }

        /* Gradient overlays for text readability */
        .fn-card-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .fn-card-overlay--large {
          background: linear-gradient(
            to right,
            rgba(245,245,247,0.96) 0%,
            rgba(245,245,247,0.85) 45%,
            rgba(245,245,247,0.2) 75%,
            transparent 100%
          );
        }

        [data-theme='dark'] .fn-card-overlay--large {
          background: linear-gradient(
            to right,
            rgba(20,20,20,0.98) 0%,
            rgba(20,20,20,0.88) 45%,
            rgba(20,20,20,0.2) 75%,
            transparent 100%
          );
        }

        .fn-card-overlay--small {
          background: linear-gradient(
            to bottom,
            rgba(245,245,247,0.95) 0%,
            rgba(245,245,247,0.7) 45%,
            rgba(245,245,247,0.15) 75%,
            transparent 100%
          );
        }

        [data-theme='dark'] .fn-card-overlay--small {
          background: linear-gradient(
            to bottom,
            rgba(20,20,20,0.98) 0%,
            rgba(20,20,20,0.7) 45%,
            rgba(20,20,20,0.15) 75%,
            transparent 100%
          );
        }

        /* Text Content area */
        .fn-card-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .fn-card-title {
          font-family: var(--font-sans);
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: #1d1d1f;
        }

        [data-theme='dark'] .fn-card-title {
          color: #f5f5f7;
        }

        .fn-card-title--sm {
          font-size: 1.35rem;
        }

        .fn-card-desc {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          line-height: 1.65;
          color: #515154;
        }

        [data-theme='dark'] .fn-card-desc {
          color: rgba(245,245,247,0.55);
        }

        .fn-card-desc--sm {
          font-size: 0.88rem;
          line-height: 1.6;
        }

        /* ── CARD LARGE (Horizontal layout) ── */
        .fn-card--large {
          height: 480px;
        }

        .fn-card--large .fn-card-content {
          width: 50%;
          height: 100%;
          padding: 60px;
          justify-content: center;
        }

        /* ── TWIN GRID ── */
        .fn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 24px;
          margin-bottom: 24px;
        }

        .fn-card--small {
          height: 560px;
        }

        .fn-card--small .fn-card-content {
          padding: 44px 44px 0 44px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .fn-card--large {
            height: auto;
          }
          .fn-card--large .fn-card-content {
            width: 100%;
            padding: 40px 32px 320px;
          }
        /* ── Responsive ── */
        @media (max-width: 900px) {
          .fn-card--large {
            height: auto;
            min-height: 520px;
          }
          .fn-card--large .fn-card-content {
            width: 100%;
            padding: 40px 32px 300px; /* Thêm padding dưới để đẩy text lên trên ảnh nền */
          }
          
          .fn-card-bg--rings,
          .fn-card-bg--chart {
            object-position: center bottom; /* Trên mobile đẩy ảnh xuống dưới đáy */
          }
          
          .fn-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .fn-card--small {
            height: auto;
            min-height: 540px;
          }
          .fn-card--small .fn-card-content {
            padding: 40px 32px 300px;
          }
          .fn-card-overlay--large {
            background: linear-gradient(
              to bottom,
              rgba(245,245,247,0.96) 0%,
              rgba(245,245,247,0.85) 50%,
              rgba(245,245,247,0.2) 80%,
              transparent 100%
            );
          }
          [data-theme='dark'] .fn-card-overlay--large {
            background: linear-gradient(
              to bottom,
              rgba(20,20,20,0.98) 0%,
              rgba(20,20,20,0.88) 50%,
              rgba(20,20,20,0.2) 80%,
              transparent 100%
            );
          }
        }

        @media (max-width: 600px) {
          .fn-section {
            padding: 64px 0 56px;
          }
          .fn-main-title {
            margin-bottom: 36px;
          }
          .fn-card--large .fn-card-content {
            padding: 32px 24px 260px;
          }
          .fn-card--small .fn-card-content {
            padding: 32px 24px 260px;
          }
        }
      `}</style>
    </section>
  );
};
