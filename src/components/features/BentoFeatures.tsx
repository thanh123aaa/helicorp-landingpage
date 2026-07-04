import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Bell, Atom, ClipboardList, ChevronLeft, ChevronRight, Moon, Heart, Activity, AlertTriangle } from 'lucide-react';
import { useTracking } from '../../hooks/useTracking';
import { Reveal } from '../common/Reveal';

const GALLERY_SLIDES = [
  {
    img: '/assets/feature-sleep.webp',
    color: '#bf5af2',
    icon: <Moon size={15} />,
    title: 'Theo dõi giấc ngủ',
    desc: 'Điểm số giấc ngủ giúp bạn đánh giá chất lượng nghỉ ngơi dựa trên các yếu tố như thời gian ngủ, giấc ngủ sâu và chu kỳ ngủ để có cái nhìn toàn diện nhất.',
  },
  {
    img: '/assets/Theodoinhiptho.jpg',
    color: '#30d158',
    icon: <Heart size={15} />,
    title: 'Theo dõi nhịp thở khi ngủ',
    desc: 'Theo dõi và phát hiện các dấu hiệu gián đoạn hô hấp trong lúc ngủ, giúp nhận biết sớm nguy cơ ngưng thở khi ngủ để chủ động chăm sóc bản thân.',
  },
  {
    img: '/assets/Ungdungsinhhieu.jpg',
    color: '#ffd60a',
    icon: <AlertTriangle size={15} />,
    title: 'Ứng dụng Sinh Hiệu',
    desc: 'Xem nhanh toàn bộ dữ liệu sức khỏe quan trọng của bạn ở một nơi duy nhất: nhịp tim, tần số hô hấp, nhiệt độ cổ tay, SpO2 và thời gian ngủ.',
  },
  {
    img: '/assets/Theosattraitim.jpg',
    color: '#ff375f',
    icon: <Activity size={15} />,
    title: 'Theo sát trái tim bạn',
    desc: 'Theo dõi liên tục các chỉ số tim mạch cốt lõi của cơ thể bao gồm nhịp tim, biến thiên nhịp tim (HRV) và đưa ra cảnh báo sớm khi có dấu hiệu bất thường.',
  },
];

export const BentoFeatures: React.FC = () => {
  const { trackEvent } = useTracking();
  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalSlides = GALLERY_SLIDES.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loopedSlides = [
    GALLERY_SLIDES[totalSlides - 1], // buffer left (slide = -1)
    ...GALLERY_SLIDES,               // index 0 to 3
    ...GALLERY_SLIDES.slice(0, 3)    // buffer right (slide = 4, 5, 6)
  ];

  const nextSlide = useCallback(() => {
    if (slide >= totalSlides || slide < 0) return;
    setIsTransitioning(true);
    setSlide(s => s + 1);
  }, [slide, totalSlides]);

  const prevSlide = () => {
    if (slide >= totalSlides || slide < 0) return;
    setIsTransitioning(true);
    setSlide(s => s - 1);
  };

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [nextSlide]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 4000);
  };

  useEffect(() => {
    if (slide === totalSlides) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setSlide(0);
      }, 400);
      return () => clearTimeout(timer);
    }
    if (slide === -1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setSlide(totalSlides - 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [slide, totalSlides]);

  return (
    <section id="features" className="ft-section">
      <div className="ft-intro">
        <img src="/assets/health_hero__bs99gittogoi_xlarge_2x.webp" alt="" aria-hidden="true" className="ft-intro-bg" loading="lazy" />
        <div className="ft-intro-bg-overlay" />
        <Reveal>
          <div className="ft-intro-inner">
            <h2 className="ft-intro-heading">
              Công nghệ vượt trội.<br />
              <span className="ft-intro-sub">Phong cách dẫn đầu.</span>
            </h2>
            <p className="ft-intro-desc">
              HelioWatch sở hữu loạt cảm biến sức khỏe tối tân nhất cùng màn hình AMOLED đỉnh cao,
              gói gọn tất cả trong một thiết kế tinh xảo, thời thượng.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal className="ft-card ft-card--health">
        <img src="/assets/health_hero__bs99gittogoi_xlarge_2x.webp" alt="Sức khỏe" className="ft-card-bg" loading="lazy" />
        <div className="ft-card-overlay ft-card-overlay--right" />
        <div className="ft-card-content ft-card-content--right">
          <Reveal delay={150}>
            <span className="ft-tag" style={{ color: '#30d158' }}>Sức Khỏe</span>
            <h3 className="ft-card-heading">
              Hiểu cơ thể bạn<br />bằng cả trái tim.
            </h3>
            <p className="ft-card-desc">
              Với hàng trăm chỉ số sức khỏe chuyên sâu, bạn nắm rõ cơ thể từng phút. Từ ECG đến theo dõi định kỳ, HelioWatch Series 3 là người bạn đồng hành sức khỏe đáng tin cậy nhất.
            </p>
          </Reveal>
        </div>
      </Reveal>

      <div className="ft-spotlight">
        <img src="/assets/health_hero__bs99gittogoi_xlarge_2x.webp" alt="" aria-hidden="true" className="ft-spotlight-bg" loading="lazy" />
        <div className="ft-spotlight-overlay" />

        <div className="ft-spotlight-inner">
          <Reveal className="ft-spotlight-text">
            <span className="ft-tag" style={{ color: '#ff375f' }}>Cảnh báo sớm</span>
            <h2 className="ft-spotlight-heading">
              Nhận thông báo về<br />huyết áp cao mãn tính.
            </h2>
            <p className="ft-spotlight-desc">
              Tăng huyết áp, hay huyết áp cao, ảnh hưởng đến hơn 1,3 tỷ người trưởng thành trên thế giới và là nguyên nhân hàng đầu gây ra các căn bệnh tim, đột quỵ và tử vong. Tình trạng bệnh thường không được chẩn đoán do thường không có triệu chứng — và ngay cả khi đi khám bác sĩ, chỉ với một lần kiểm tra duy nhất, chứng bệnh này có thể dễ dàng bị bỏ qua.
            </p>
          </Reveal>

          <div className="ft-spotlight-cols">
            {[
              {
                icon: <Bell size={32} strokeWidth={1.5} />,
                color: '#64d2ff',
                title: 'Nhận thông báo tăng huyết áp, chỉ cần đeo đồng hồ.',
                body: 'Series 11 có thể thông báo cho bạn nếu thiết bị xác định được các mô hình tăng huyết áp. Bằng cách nào? Cảm biến quang học cung cấp dữ liệu cho một thuật toán có thể phát hiện hiện nguy cơ tăng huyết áp bằng cách phân tích tính cách các mạch máu của bạn phản ứng với nhịp đập của tim trong khoảng thời gian 30 ngày.',
              },
              {
                icon: <Atom size={32} strokeWidth={1.5} />,
                color: '#64d2ff',
                title: 'Thông tin chuyên sâu đột phá. Đã được kiểm chứng khoa học.',
                body: 'Chúng tôi đã phát triển tính năng thông báo huyết áp bằng cách sử dụng các phương pháp máy học tiên tiến cùng một loạt các nghiên cứu, với tổng cộng hơn 100.000 người tham gia. Tính năng đã được kiểm chứng trong một nghiên cứu lâm sàng.',
              },
              {
                icon: <ClipboardList size={32} strokeWidth={1.5} />,
                color: '#64d2ff',
                title: 'Tạo bản ghi huyết áp. Nếu bạn nhận được thông báo.',
                body: 'If bạn nhận được thông báo tăng huyết áp và có máy đo huyết áp, bạn có thể theo dõi huyết áp của mình trong ứng dụng Sức Khỏe trên iPhone để tạo báo cáo, giúp các cuộc trò chuyện với nhà cung cấp dịch vụ chăm sóc sức khỏe của bạn trở nên hữu ích hơn.',
              },
            ].map((col, i) => (
              <Reveal key={i} className="ft-col-item" delay={i * 150}>
                <span className="ft-col-icon" style={{ color: col.color }}>
                  {col.icon}
                </span>
                <h4 className="ft-col-title">{col.title}</h4>
                <p className="ft-col-body">{col.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="ft-gallery-section">
        <div className="ft-gallery-header">
          <Reveal>
            <h3 className="ft-gallery-heading">Thêm nhiều tính năng hỗ trợ sức khỏe.</h3>
          </Reveal>
          <div className="ft-gallery-nav">
            <button className="ft-nav-btn" onClick={() => { prevSlide(); resetTimer(); }} aria-label="Trước">
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button className="ft-nav-btn" onClick={() => { nextSlide(); resetTimer(); }} aria-label="Sau">
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="ft-slider-viewport">
          <div
            className="ft-slider-track"
            style={{
              transform: `translateX(calc(-${slide + 1} * (var(--card-w) + var(--card-gap))))`,
              transition: isTransitioning ? 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' : 'none'
            }}
          >
            {loopedSlides.map((s, i) => {
              const actualIdx = (i - 1 + totalSlides) % totalSlides;
              const isActive = actualIdx === ((slide + totalSlides) % totalSlides);
              return (
                <div key={i} className={`ft-slide-card ${isActive ? 'ft-slide-card--active' : ''}`} onClick={() => { setSlide(actualIdx); resetTimer(); }}>
                  <div className="ft-slide-img-wrap">
                    <img src={s.img} alt={s.title} className="ft-slide-img" loading="lazy" />
                  </div>
                  <div className="ft-slide-body">
                    <h4 className="ft-slide-title">{s.title}</h4>
                    <p className="ft-slide-desc">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ft-dots">
          {GALLERY_SLIDES.map((_, i) => {
            const activeDotIdx = (slide + totalSlides) % totalSlides;
            return (
              <button key={i} className={`ft-dot ${i === activeDotIdx ? 'ft-dot--active' : ''}`} onClick={() => { setSlide(i); resetTimer(); }} aria-label={`Slide ${i + 1}`} />
            );
          })}
        </div>
      </div>

      <style>{`
        .ft-section { background: #000; padding: 0; }

        .rv { opacity: 0; transform: translateY(36px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .rv--on { opacity: 1; transform: none; }

        .ft-tag { font-size: 0.73rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; font-family: var(--font-sans); display: block; margin-bottom: 10px; }

        .ft-intro { position: relative; overflow: hidden; background: #000; padding: 96px 2rem 80px; }
        .ft-intro-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; filter: blur(28px) saturate(0.7); opacity: 0.28; pointer-events: none; transform: scale(1.1); }
        .ft-intro-bg-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at 60% 50%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%); pointer-events: none; }
        .ft-intro-inner { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; text-align: center; }
        .ft-intro > .rv { position: relative; z-index: 1; }
        .ft-intro-heading { font-family: var(--font-sans); font-size: clamp(2.4rem, 5vw, 5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.08; color: #f5f5f7; margin-bottom: 20px; }
        .ft-intro-sub { color: rgba(245,245,247,0.4); }
        .ft-intro-desc { font-size: 1rem; line-height: 1.75; color: rgba(245,245,247,0.55); font-family: var(--font-sans); max-width: 520px; margin: 0 auto; }

        .ft-card { position: relative; overflow: hidden; }
        .ft-card-bg { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; transition: transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .ft-card:hover .ft-card-bg { transform: scale(1.04); }
        .ft-card-overlay { position: absolute; inset: 0; pointer-events: none; }
        .ft-card-overlay--right { background: linear-gradient(to left, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.12) 70%, transparent 100%); }
        .ft-card-content { position: absolute; z-index: 2; }
        .ft-card-content--right { bottom: 0; right: 0; left: auto; padding: 64px 56px; max-width: 520px; }
        .ft-card-heading { font-family: var(--font-sans); font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: #f5f5f7; margin-bottom: 14px; }
        .ft-card-desc { font-size: 0.9rem; line-height: 1.7; color: rgba(245,245,247,0.7); font-family: var(--font-sans); }
        .ft-card--health { height: 900px; }

        .ft-spotlight { position: relative; overflow: hidden; background: #000; border-top: 1px solid rgba(255,255,255,0.05); }
        .ft-spotlight-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: left center; filter: blur(32px) saturate(0.9); opacity: 0.6; pointer-events: none; transform: scale(1.1); }
        .ft-spotlight-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 50%, #000 100%); pointer-events: none; }
        .ft-spotlight-inner { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 120px 2rem 100px; }
        .ft-spotlight-text { max-width: 680px; margin-bottom: 64px; }
        .ft-spotlight-heading { font-family: var(--font-sans); font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.12; color: #f5f5f7; margin-bottom: 20px; }
        .ft-spotlight-desc { font-size: 0.88rem; line-height: 1.8; color: rgba(245,245,247,0.5); font-family: var(--font-sans); max-width: 600px; }

        .ft-spotlight-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; border-top: 1px solid rgba(255,255,255,0.07); padding-top: 48px; }
        .ft-col-item { display: flex; flex-direction: column; gap: 12px; }
        .ft-col-icon { display: flex; align-items: center; justify-content: flex-start; height: 36px; margin-bottom: 4px; }
        .ft-col-title { font-size: 0.84rem; font-weight: 700; color: #f5f5f7; font-family: var(--font-sans); line-height: 1.4; }
        .ft-col-body { font-size: 0.78rem; line-height: 1.75; color: rgba(245,245,247,0.45); font-family: var(--font-sans); }

        .ft-gallery-section { 
          background: #000; 
          border-top: 1px solid rgba(255,255,255,0.05); 
          padding: 80px 0 96px; 
          overflow: hidden; 
          --card-gap: 24px;
          --card-w: calc((100% - 2.3 * var(--card-gap)) / 3.3);
        }
        .ft-gallery-header { display: flex; align-items: flex-end; justify-content: space-between; max-width: 1440px; margin: 0 auto 40px; padding: 0 2rem; }
        .ft-gallery-heading { font-family: var(--font-sans); font-size: clamp(1.4rem, 2.5vw, 2rem); font-weight: 700; letter-spacing: -0.025em; color: #f5f5f7; }
        .ft-gallery-nav { display: flex; gap: 8px; flex-shrink: 0; }
        .ft-nav-btn { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.1); border: none; color: #f5f5f7; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.18s ease; }
        .ft-nav-btn:hover { background: rgba(255,255,255,0.22); }

        .ft-slider-viewport { max-width: 1440px; margin: 0 auto; overflow: visible; padding: 0 2rem; }
        .ft-slider-track { display: flex; gap: var(--card-gap); }
        .ft-slide-card { flex: 0 0 var(--card-w); background: transparent; border: none; overflow: hidden; cursor: pointer; transition: transform 0.25s ease; }
        .ft-slide-card:hover { transform: translateY(-4px); }
        
        .ft-slide-img-wrap { 
          height: 320px; 
          overflow: hidden; 
          background: #141414; 
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        }
        
        .ft-slide-img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          object-position: center; 
          transition: transform 0.5s ease; 
        }
        
        .ft-slide-card:hover .ft-slide-img { transform: scale(1.04); }
        .ft-slide-body { padding: 20px 0 12px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
        .ft-slide-title { font-size: 1.4rem; font-weight: 700; color: #f5f5f7; font-family: var(--font-sans); line-height: 1.3; }
        .ft-slide-desc { font-size: 0.96rem; line-height: 1.7; color: rgba(245,245,247,0.45); font-family: var(--font-sans); display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-align: left; }

        .ft-dots { display: flex; justify-content: center; gap: 6px; margin-top: 28px; }
        .ft-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.2); border: none; cursor: pointer; transition: background 0.2s ease, transform 0.2s ease; padding: 0; }
        .ft-dot--active { background: #f5f5f7; transform: scale(1.3); }

        @media (max-width: 900px) {
          .ft-card--health { height: 480px; }
          .ft-card-content--right { padding: 36px 28px; max-width: 100%; right: 0; left: 0; }
          .ft-spotlight-cols { grid-template-columns: 1fr; gap: 32px; }
          .ft-spotlight-inner { padding: 56px 1.5rem; }
          .ft-gallery-section { --card-w: calc((100% - 1.3 * var(--card-gap)) / 2.3); }
          .ft-gallery-header { flex-direction: column; align-items: flex-start; gap: 16px; }
        }

        @media (max-width: 600px) {
          .ft-intro { padding: 56px 20px 48px; }
          .ft-card--health { height: 400px; }
          .ft-card-content--right { padding: 28px 20px; }
          .ft-spotlight-inner { padding: 48px 20px; }
          .ft-gallery-section { padding: 56px 0 64px; --card-w: calc((100% - 0.25 * var(--card-gap)) / 1.25); }
          .ft-gallery-header { padding: 0 20px; }
          .ft-slider-viewport { padding: 0 20px; }
        }
      `}</style>
    </section>
  );
};
