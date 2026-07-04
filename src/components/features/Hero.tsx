import React, { useEffect, useRef } from 'react';
import { useTracking } from '../../hooks/useTracking';

interface HeroProps {
  onCtaClick: () => void;
  onExploreClick: () => void;
}

const useHeroCanvas = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 120;
    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number; life: number; maxLife: number;
      hue: number;
    };
    const spawn = (): Particle => {
      const hue = Math.random() < 0.5 ? 210 + Math.random() * 30 : 190 + Math.random() * 20;
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        life: Math.random() * 300, maxLife: 200 + Math.random() * 200,
        hue,
      };
    };
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, spawn);

    type Ring = { x: number; y: number; r: number; maxR: number; alpha: number; hue: number };
    const rings: Ring[] = [];
    let ringTimer = 0;
    const spawnRing = () => {
      const cx = W * 0.5 + (Math.random() - 0.5) * W * 0.3;
      const cy = H * 0.5 + (Math.random() - 0.5) * H * 0.2;
      rings.push({ x: cx, y: cy, r: 0, maxR: 120 + Math.random() * 80, alpha: 0.4, hue: 210 });
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 4, 14, 0.18)';
      ctx.fillRect(0, 0, W, H);

      ringTimer++;
      if (ringTimer % 90 === 0) spawnRing();
      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i];
        rg.r += 1.2;
        rg.alpha -= 0.004;
        if (rg.alpha <= 0) { rings.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${rg.hue}, 90%, 65%, ${rg.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const a = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = `rgba(100, 180, 255, ${a})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.life++;
        if (p.life > p.maxLife) Object.assign(p, spawn());
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const fade = Math.min(p.life / 30, 1) * Math.min((p.maxLife - p.life) / 30, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, ${p.alpha * fade})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    ctx.fillStyle = '#00040e';
    ctx.fillRect(0, 0, W, H);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
};

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onExploreClick }) => {
  const { trackEvent } = useTracking();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHeroCanvas(canvasRef);

  const handleCta = () => {
    trackEvent('Click CTA Mua hàng trên Hero Banner', 'Hero Section', 'Button Buy');
    onCtaClick();
  };

  return (
    <section id="hero" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas-bg" />
      <div className="hero-img-overlay" />
      <div className="hero-gradient-overlay" />

      <div className="hero-banner-container">
        <div className="hero-text-wrapper animate-slide-up">
          <div className="hero-brand-title">
            <span className="brand-logo"></span> HELIO WATCH SERIES 3
          </div>
          <h1 className="hero-main-title">
            Siêu công cụ <span className="nowrap">chăm sóc</span> <br />
            sức khỏe của bạn.
          </h1>
        </div>

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
          background: #00040e;
          overflow: hidden;
        }

        .hero-canvas-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          display: block;
        }

        .hero-img-overlay {
          position: absolute;
          inset: 0;
          background: url('/assets/hero-banner.webp') center center / cover no-repeat;
          opacity: 0.35;
          z-index: 1;
          animation: heroKenBurns 20s ease-in-out infinite alternate;
        }

        @keyframes heroKenBurns {
          0%   { transform: scale(1.0) translateX(0px); }
          50%  { transform: scale(1.06) translateX(-12px); }
          100% { transform: scale(1.03) translateX(8px); }
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 4, 14, 0.88) 0%,
            rgba(0, 4, 14, 0.45) 40%,
            rgba(0, 4, 14, 0.15) 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        .hero-banner-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 5rem 6.5rem;
          position: relative;
          z-index: 3;
        }

        .hero-text-wrapper {
          position: relative;
          z-index: 3;
          max-width: 800px;
          text-align: left;
        }

        .nowrap {
          white-space: nowrap;
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
          z-index: 3;
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
