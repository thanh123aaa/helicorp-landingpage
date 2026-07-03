import React, { useState } from 'react';
import { Reveal } from './Reveal';
import { useTrackingContext } from '../context/TrackingContext';
import { Mail, User, Phone, ArrowRight, Gift, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

export const NewsletterSubscription: React.FC = () => {
  const { trackEvent, sendNewsletterWebhook } = useTrackingContext();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    trackEvent(`Submit Đăng ký nhận thông tin: ${formData.email}`, 'Newsletter Subscription', 'Form Submit');

    const success = await sendNewsletterWebhook(formData.name, formData.email, formData.phone);
    setIsSubmitting(false);
    if (success) {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="newsletter" className="subscription-section">
      <div className="container">
        <Reveal>
          <div className="sub-glass-card">
          
          {/* Main layout split */}
          <div className="sub-grid-layout">
            
            {/* Left side: Luxury Privileges and branding */}
            <div className="sub-info-col">
              <div className="privilege-tag">
                <Sparkles size={12} /> Đặc quyền mở bán sớm
              </div>
              <h3 className="sub-title-heading">
                Đăng ký sở hữu <span>HelioWatch Gen 3</span> đầu tiên
              </h3>
              <p className="sub-description">
                Đừng bỏ lỡ ngày ra mắt chính thức. Hãy đăng ký ngay hôm nay để nhận thông báo sớm nhất cùng loạt đặc quyền giới hạn dành riêng cho 500 khách hàng đầu tiên.
              </p>

              <div className="privileges-list">
                <div className="privilege-item">
                  <div className="privilege-icon-box">
                    <Gift size={18} />
                  </div>
                  <div>
                    <h4>Quà tặng trị giá 2,000,000đ</h4>
                    <p>Tặng kèm 01 Dây đeo Da Ý cao cấp và củ sạc nhanh sạc nhanh GaN 35W.</p>
                  </div>
                </div>

                <div className="privilege-item">
                  <div className="privilege-icon-box">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4>Ưu đãi giảm giá 15%</h4>
                    <p>Nhận mã giảm giá trực tiếp vào ngày mở bán cho chủ tài khoản đăng ký sớm.</p>
                  </div>
                </div>

                <div className="privilege-item">
                  <div className="privilege-icon-box">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h4>Bảo hành đặc quyền 24 tháng</h4>
                    <p>Nâng cấp gói bảo hành vàng 1 đổi 1 trong vòng 2 năm nếu có lỗi phần cứng từ nhà sản xuất.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Interactive Form or Success Panel */}
            <div className="sub-form-col">
              {!isSubmitted ? (
                <form className="newsletter-form-container" onSubmit={handleSubmit}>
                  <h4 className="form-title">Điền thông tin đăng ký</h4>
                  
                  {/* Name field */}
                  <div className="input-group-row">
                    <label className="input-field-label" htmlFor="name">Họ và tên *</label>
                    <div className="input-wrapper-inner">
                      <User size={18} className="input-icon" />
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nguyễn Văn A" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="input-group-row">
                    <label className="input-field-label" htmlFor="email">Địa chỉ Email *</label>
                    <div className="input-wrapper-inner">
                      <Mail size={18} className="input-icon" />
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="email@example.com" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div className="input-group-row">
                    <label className="input-field-label" htmlFor="phone">Số điện thoại</label>
                    <div className="input-wrapper-inner">
                      <Phone size={18} className="input-icon" />
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder="090 1234 567" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className={`sub-submit-btn ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="spinner-loader" />
                    ) : (
                      <>
                        Đăng ký ngay <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="privacy-note">
                    Chúng tôi bảo mật 100% thông tin cá nhân của bạn và cam kết không gửi thư rác.
                  </p>
                </form>
              ) : (
                <div className="success-state-container animate-fade-in">
                  <div className="success-badge-pulse">
                    <CheckCircle2 size={40} className="success-badge-icon" />
                  </div>
                  <h3>Đăng ký thành công!</h3>
                  <p className="success-message">
                    Chào mừng <strong>{formData.name}</strong> đến với câu lạc bộ Helio! Chúng tôi đã gửi email xác nhận cùng mã ưu đãi đặc quyền sớm đến địa chỉ:
                  </p>
                  <div className="success-email-bubble">
                    {formData.email}
                  </div>
                  <p className="success-cta-text">
                    Mã ưu đãi mở bán sớm và quà tặng đi kèm đã được giữ chỗ riêng cho bạn. Hãy kiểm tra hộp thư đến (hoặc hòm thư Spam) nhé!
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
        </Reveal>
      </div>

      <style>{`
        /* ── SECTION ── */
        .subscription-section {
          padding: 80px 0 100px;
          background-color: var(--bg-primary);
          position: relative;
        }

        /* ── CARD CONTAINER ── */
        .sub-glass-card {
          background: var(--surface-secondary);
          border-radius: 36px;
          padding: 60px;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.015);
          position: relative;
          overflow: hidden;
        }

        [data-theme='dark'] .sub-glass-card {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.05);
        }

        /* Inner soft glows */
        .sub-glass-card::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background-color: var(--primary-gold);
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.03;
          top: -150px;
          right: -150px;
          pointer-events: none;
        }

        [data-theme='dark'] .sub-glass-card::before {
          opacity: 0.15;
        }

        /* ── GRID LAYOUT ── */
        .sub-grid-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }

        /* ── LEFT COLUMN ── */
        .sub-info-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .privilege-tag {
          align-self: flex-start;
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: rgba(212, 175, 55, 0.08);
          color: var(--primary-gold);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 6px 14px;
          border-radius: 100px;
        }

        .sub-title-heading {
          font-family: var(--font-sans);
          font-size: clamp(1.5rem, 2.6vw, 2.1rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1.3;
          margin: 0;
        }

        .sub-title-heading span {
          color: var(--primary-gold);
          white-space: nowrap;
        }

        .sub-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* Privileges bullets */
        .privileges-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 10px;
        }

        .privilege-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .privilege-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--primary-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .privilege-item h4 {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .privilege-item p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin: 0;
        }

        /* ── RIGHT COLUMN: FORM CONTAINER ── */
        .newsletter-form-container {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 28px;
          padding: 36px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.01);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        [data-theme='dark'] .newsletter-form-container {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .form-title {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin: 0 0 5px 0;
        }

        .input-group-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-field-label {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .input-wrapper-inner {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: var(--text-secondary);
          pointer-events: none;
          transition: color 0.3s;
        }

        .input-wrapper-inner input {
          width: 100%;
          height: 52px;
          border-radius: 14px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          padding: 0 16px 0 48px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .input-wrapper-inner input:focus {
          outline: none;
          border-color: var(--text-primary);
          background-color: var(--bg-primary);
          box-shadow: 0 0 0 4px rgba(var(--text-primary-rgb, 0,0,0), 0.05);
        }

        .input-wrapper-inner input:focus + .input-icon {
          color: var(--text-primary);
        }

        /* Submit Button */
        .sub-submit-btn {
          height: 52px;
          border-radius: 14px;
          border: none;
          background-color: var(--text-primary);
          color: var(--bg-primary);
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .sub-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .sub-submit-btn:active {
          transform: translateY(0);
        }

        .privacy-note {
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.4;
          text-align: center;
          margin: 0;
        }

        /* Loading spinner */
        .spinner-loader {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spinSpinner 0.8s linear infinite;
        }

        @keyframes spinSpinner {
          to { transform: rotate(360deg); }
        }

        /* ── SUCCESS STATE STATE ── */
        .success-state-container {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 28px;
          padding: 48px 36px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.01);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
        }

        .success-badge-pulse {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background-color: rgba(16, 185, 129, 0.08);
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          animation: successPulse 2s infinite;
        }

        @keyframes successPulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.2); }
          70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .success-state-container h3 {
          font-family: var(--font-sans);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.02em;
        }

        .success-message {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .success-email-bubble {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 8px 16px;
          border-radius: 10px;
          font-family: monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .success-cta-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 992px) {
          .sub-grid-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .sub-glass-card {
            padding: 40px;
          }
        }

        @media (max-width: 576px) {
          .sub-glass-card {
            padding: 30px 20px;
            border-radius: 24px;
          }
          .newsletter-form-container, .success-state-container {
            padding: 24px 16px;
          }
        }
      `}</style>
    </section>
  );
};
