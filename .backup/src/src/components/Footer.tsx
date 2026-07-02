import React from 'react';
import { Activity, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-column">
            <div className="footer-logo">
              <div className="logo-icon-wrapper">
                <Activity size={18} />
              </div>
              <span className="logo-text">Helio<span>Ring</span></span>
            </div>
            <p className="footer-slogan">
              Giải pháp theo dõi sức khỏe chủ động cao cấp, đồng hành cùng bạn kiến tạo cuộc sống khỏe mạnh và tràn đầy năng lượng.
            </p>
            <p className="footer-sub-slogan">
              Một sản phẩm đột phá từ <strong>Healthy Living Corporation (Helicorp)</strong>.
            </p>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-title">Khám Phá</h4>
            <ul className="footer-links">
              <li><a href="#features">Tính năng chính</a></li>
              <li><a href="#customizer">Cấu hình & Kích thước</a></li>
              <li><a href="#specs">Thông số kỹ thuật</a></li>
              <li><a href="#newsletter">Đăng ký trải nghiệm</a></li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-title">Công Ty</h4>
            <ul className="footer-links">
              <li>
                <a href="https://helicorp.vn" target="_blank" rel="noopener noreferrer" className="external-link">
                  Trang chủ Helicorp <ExternalLink size={12} />
                </a>
              </li>
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Điều khoản sử dụng</a></li>
            </ul>
          </div>

          <div className="footer-contact-column">
            <h4 className="footer-title">Liên Hệ Tuyển Dụng</h4>
            <ul className="footer-contact-info">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Thành phố Hồ Chí Minh, Việt Nam</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <a href="mailto:tuyendung@helicorp.vn">tuyendung@helicorp.vn</a>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <a href="tel:02836222622">028.3622.2622</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} HelioRing & Helicorp. All rights reserved.
          </p>
          <div className="test-disclaimer">
            <span>Dự án phục vụ kiểm tra năng lực Vòng 2 - Thực tập sinh IT Phát triển Website.</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--bg-secondary);
          padding: 5rem 0 2.5rem;
          border-top: 1px solid var(--border-color);
          margin-top: auto;
          transition: background-color 0.3s ease;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-brand-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .footer-logo span {
          color: var(--primary-gold);
          font-family: var(--font-serif);
          font-style: italic;
        }

        .footer-logo .logo-icon-wrapper {
          width: 32px;
          height: 32px;
          background: var(--text-primary);
          color: var(--bg-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-slogan {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .footer-sub-slogan {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .footer-title {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links a {
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--text-primary);
          padding-left: 4px;
        }

        .external-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .footer-contact-info {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-contact-info li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .contact-icon {
          color: var(--primary-gold);
          margin-top: 3px;
          flex-shrink: 0;
        }

        .footer-contact-info a {
          color: var(--text-secondary);
        }

        .footer-contact-info a:hover {
          color: var(--text-primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .copyright {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .test-disclaimer {
          font-size: 0.825rem;
          color: var(--text-tertiary);
          border-left: 2px solid var(--primary-gold);
          padding-left: 10px;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};
