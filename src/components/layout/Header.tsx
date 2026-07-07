import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useShop } from '../../context/ShopContext';
import { Sun, Moon, ShoppingCart, Heart, Menu, X } from 'lucide-react';

interface HeaderProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, onWishlistClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const scrollPosition = window.scrollY + 140; // Offset for header height
      const sections = ['hero', 'features', 'customizer', 'specs', 'newsletter'];
      
      let currentSection = 'hero';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { cart, wishlist } = useShop();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const [animateCart, setAnimateCart] = useState(false);
  const [animateWishlist, setAnimateWishlist] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  useEffect(() => {
    if (wishlistCount > 0) {
      setAnimateWishlist(true);
      const timer = setTimeout(() => setAnimateWishlist(false), 500);
      return () => clearTimeout(timer);
    }
  }, [wishlistCount]);

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
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#" className="logo-container" onClick={(e) => handleNavClick(e, 'hero')}>
          <div className="logo-icon-wrapper">
            <svg className="logo-icon" width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="9.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
              <path d="M3 11 L6.5 11 L7.5 7 L9 15 L10.5 8.5 L12 13 L13.2 11 L19 11"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">Helio<span>Ring</span></span>
        </a>

        <nav className="desktop-nav">
          <a href="#features" className={activeSection === 'features' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'features')}>Tính năng</a>
          <a href="#customizer" className={activeSection === 'customizer' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'customizer')}>Cấu hình</a>
          <a href="#specs" className={activeSection === 'specs' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'specs')}>Thông số</a>
          <a href="#newsletter" className={activeSection === 'newsletter' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'newsletter')}>Đăng ký</a>
        </nav>

        <div className="actions-container">
          <button className="action-btn" onClick={toggleTheme} title="Chuyển chế độ giao diện">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button 
            className={`action-btn cart-btn-wrapper ${animateWishlist ? 'micro-bounce-heart' : ''}`} 
            onClick={onWishlistClick} 
            title="Danh sách yêu thích"
          >
            <Heart 
              size={20} 
              fill={wishlistCount > 0 ? 'var(--brand-error)' : 'none'} 
              stroke={wishlistCount > 0 ? 'var(--brand-error)' : 'currentColor'} 
              style={{ transition: 'fill 0.3s, stroke 0.3s' }} 
            />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button>

          <button 
            className={`action-btn cart-btn-wrapper ${animateCart ? 'micro-bounce-cart' : ''}`} 
            onClick={onCartClick} 
            title="Giỏ hàng"
          >
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
          <a href="#features" className={activeSection === 'features' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'features')}>Tính năng</a>
          <a href="#customizer" className={activeSection === 'customizer' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'customizer')}>Cấu hình</a>
          <a href="#specs" className={activeSection === 'specs' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'specs')}>Thông số kỹ thuật</a>
          <a href="#newsletter" className={activeSection === 'newsletter' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'newsletter')}>Đăng ký ngay</a>
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
          background-color: transparent;
          border-bottom: 1px solid transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          transition: background-color 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
        }

        .header--scrolled {
          background-color: var(--glass-bg);
          border-bottom: 1px solid var(--glass-border);
          backdrop-filter: blur(20px) saturate(1.8);
          -webkit-backdrop-filter: blur(20px) saturate(1.8);
          box-shadow: 0 2px 20px rgba(0,0,0,0.12);
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
          flex-shrink: 0;
        }

        .logo-ring-effect { display: none; }

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
          color: rgba(255,255,255,0.85);
          position: relative;
          padding: 6px 0;
          transition: color 0.2s ease;
        }

        .header--scrolled .desktop-nav a {
          color: var(--text-secondary);
          text-shadow: none;
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
          color: #ffffff;
        }

        .header--scrolled .desktop-nav a:hover {
          color: var(--text-primary);
        }

        .desktop-nav a:hover::after {
          width: 100%;
        }

        .desktop-nav a.active {
          color: #ffffff;
        }

        .header--scrolled .desktop-nav a.active {
          color: var(--text-primary);
        }

        .desktop-nav a.active::after {
          width: 100%;
          background-color: var(--primary-gold);
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
          color: rgba(255,255,255,0.9);
          transition: var(--transition-fast), color 0.35s ease;
          position: relative;
        }

        .header--scrolled .action-btn {
          color: var(--text-primary);
          text-shadow: none;
        }

        .action-btn:hover {
          background-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .header--scrolled .action-btn:hover {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
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

        .mobile-nav a.active {
          color: var(--primary-gold);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .actions-container {
            gap: 4px;
          }
          .action-btn {
            width: 36px;
            height: 36px;
          }
          .logo-container {
            gap: 6px;
            font-size: 1.15rem;
          }
          .logo-icon-wrapper {
            width: 32px;
            height: 32px;
          }
        }

        .micro-bounce-cart {
          animation: cartBounce 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }

        .micro-bounce-heart {
          animation: heartBounce 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }

        @keyframes cartBounce {
          0% { transform: scale(1); }
          30% { transform: scale(1.25) translateY(-2px); }
          50% { transform: scale(0.9) translateY(1px); }
          100% { transform: scale(1); }
        }

        @keyframes heartBounce {
          0% { transform: scale(1); }
          30% { transform: scale(1.3) rotate(-5deg); }
          50% { transform: scale(0.85) rotate(5deg); }
          100% { transform: scale(1) rotate(0); }
        }
      `}</style>
    </header>
  );
};
