import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, ShoppingCart, Heart, Menu, X, Activity } from 'lucide-react';

interface HeaderProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
  onTrackingClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, onWishlistClick, onTrackingClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock values for Step 2 (will link to ShopContext in Step 4)
  const cartCount = 0;
  const wishlistCount = 0;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="header glass-panel">
      <div className="container header-container">
        <a href="#" className="logo-container" onClick={(e) => handleNavClick(e, 'hero')}>
          <div className="logo-icon-wrapper">
            <span className="logo-ring-effect"></span>
            <Activity className="logo-icon" size={20} />
          </div>
          <span className="logo-text">Helio<span>Ring</span></span>
        </a>

        <nav className="desktop-nav">
          <a href="#features" onClick={(e) => handleNavClick(e, 'features')}>Tính năng</a>
          <a href="#customizer" onClick={(e) => handleNavClick(e, 'customizer')}>Cấu hình</a>
          <a href="#specs" onClick={(e) => handleNavClick(e, 'specs')}>Thông số</a>
          <a href="#newsletter" onClick={(e) => handleNavClick(e, 'newsletter')}>Đăng ký</a>
        </nav>

        <div className="actions-container">
          <button 
            className="action-btn dev-toggle-btn" 
            onClick={onTrackingClick} 
            title="Xem tracking console"
          >
            <Activity size={18} />
            <span className="dev-badge">Dev Console</span>
          </button>

          <button className="action-btn" onClick={toggleTheme} title="Chuyển chế độ giao diện">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button className="action-btn cart-btn-wrapper" onClick={onWishlistClick} title="Danh sách yêu thích">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button>

          <button className="action-btn cart-btn-wrapper" onClick={onCartClick} title="Giỏ hàng">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>

          <button className="action-btn mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="mobile-nav glass-panel animate-fade-in">
          <a href="#features" onClick={(e) => handleNavClick(e, 'features')}>Tính năng</a>
          <a href="#customizer" onClick={(e) => handleNavClick(e, 'customizer')}>Cấu hình</a>
          <a href="#specs" onClick={(e) => handleNavClick(e, 'specs')}>Thông số kỹ thuật</a>
          <a href="#newsletter" onClick={(e) => handleNavClick(e, 'newsletter')}>Đăng ký ngay</a>
        </nav>
      )}

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          z-index: 1000;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
          background-color: var(--glass-bg);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.03em;
        }

        .logo-icon-wrapper {
          width: 36px;
          height: 36px;
          background: var(--text-primary);
          color: var(--bg-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .logo-ring-effect {
          position: absolute;
          inset: -3px;
          border: 1px solid var(--text-primary);
          border-radius: 50%;
          opacity: 0.3;
          animation: pulse-glow 2s infinite ease-in-out;
        }

        .logo-text span {
          color: var(--primary-gold);
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 500;
          margin-left: 2px;
        }

        .desktop-nav {
          display: flex;
          gap: 2.5rem;
        }

        .desktop-nav a {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          position: relative;
          padding: 6px 0;
        }

        .desktop-nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--text-primary);
          transition: var(--transition-fast);
        }

        .desktop-nav a:hover {
          color: var(--text-primary);
        }

        .desktop-nav a:hover::after {
          width: 100%;
        }

        .actions-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: var(--transition-fast);
          position: relative;
        }

        .action-btn:hover {
          background-color: var(--bg-secondary);
          transform: translateY(-1px);
        }

        .cart-btn-wrapper .badge {
          top: 0px;
          right: 0px;
          min-width: 16px;
          height: 16px;
          padding: 0 4px;
          font-size: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dev-toggle-btn {
          width: auto;
          height: 40px;
          padding: 0 12px;
          border-radius: 20px;
          display: flex;
          gap: 6px;
          border: 1px dashed var(--border-color);
        }

        .dev-badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mobile-menu-btn {
          display: none;
        }

        .mobile-nav {
          position: absolute;
          top: var(--header-height);
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          gap: 1.25rem;
          border-bottom: 1px solid var(--border-color);
          background-color: var(--glass-bg);
          box-shadow: 0 15px 30px rgba(0,0,0,0.05);
        }

        .mobile-nav a {
          font-size: 1.1rem;
          font-weight: 600;
          padding: 8px 0;
          border-bottom: 1px solid rgba(0,0,0,0.02);
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
          
          .dev-badge {
            display: none;
          }
          
          .dev-toggle-btn {
            width: 40px;
            padding: 0;
            border-radius: 50%;
          }
        }
      `}</style>
    </header>
  );
};
