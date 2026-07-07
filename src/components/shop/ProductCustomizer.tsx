import React, { useState } from 'react';
import { Reveal } from '../common/Reveal';
import { useShop, productColors, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_ORIGINAL_PRICE, getCustomWatchImage } from '../../context/ShopContext';
import { useToast } from '../../context/ToastContext';
import { useTracking } from '../../hooks/useTracking';
import { Heart, ShoppingBag, Ruler, Check } from 'lucide-react';

export const ProductCustomizer: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed, recentlyViewed } = useShop();
  const { showToast } = useToast();
  const { trackEvent } = useTracking();

  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState<number>(45);
  const [selectedStrap, setSelectedStrap] = useState<string>('silicon');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const activeColorObj = productColors.find(c => c.id === selectedColor) || productColors[0];

  const handleColorChange = (colorId: string, colorName: string) => {
    if (colorId !== selectedColor) {
      setImageLoading(true);
      setSelectedColor(colorId);
      addToRecentlyViewed(colorId);
    }
    trackEvent(`Chọn màu đồng hồ: ${colorName}`, 'Product Customizer', 'Color Option Click');
  };

  const handleSizeChange = (size: number) => {
    setSelectedSize(size);
    trackEvent(`Chọn kích thước mặt: ${size}mm`, 'Product Customizer', 'Size Option Click');
  };

  const handleStrapChange = (strapType: string) => {
    if (strapType !== selectedStrap) {
      setImageLoading(true);
      setSelectedStrap(strapType);
    }
    trackEvent(`Chọn chất liệu dây: ${strapType}`, 'Product Customizer', 'Strap Option Click');
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(selectedColor, selectedSize, quantity, selectedStrap);
    trackEvent(`Thêm vào giỏ hàng: ${PRODUCT_NAME} (${activeColorObj.name}, Size ${selectedSize}mm, Dây ${selectedStrap}, SL: ${quantity})`, 'E-commerce', 'Button Add To Cart');
    showToast(
      'Đã thêm vào giỏ hàng',
      `${PRODUCT_NAME} - ${activeColorObj.name} (${selectedSize}mm - Dây ${selectedStrap}) x ${quantity} đã được thêm thành công!`,
      'success'
    );
    setTimeout(() => {
      setIsAdding(false);
    }, 1200);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(selectedColor, selectedSize, selectedStrap);
    const added = !isInWishlist(selectedColor, selectedSize, selectedStrap);
    trackEvent(`${added ? 'Thêm vào' : 'Xóa khỏi'} mục yêu thích: ${PRODUCT_NAME} (${activeColorObj.name}, Size ${selectedSize}mm)`, 'E-commerce', 'Button Wishlist');
    showToast(
      added ? 'Đã lưu yêu thích' : 'Đã bỏ yêu thích',
      added ? 'Sản phẩm đã được lưu vào danh sách yêu thích của bạn.' : 'Sản phẩm đã được xóa khỏi danh sách yêu thích.',
      added ? 'success' : 'info'
    );
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const strapTypes = [
    { id: 'silicon', name: 'Silicon Thể Thao' },
    { id: 'leather', name: 'Da Ý Lịch Lãm' },
    { id: 'titanium', name: 'Titanium Bản Thép' }
  ];

  return (
    <section id="customizer" className="customizer-section">
      <div className="container">
        
        <h2 className="customizer-main-title">
          Cá nhân hóa <span>HelioWatch</span> của bạn
        </h2>
        
        <Reveal>
          <div className="customizer-grid">
            <div className="customizer-visual-panel">
              <div className="customizer-preview-box">
                <div 
                  className="customizer-glow-aura" 
                  style={{ backgroundColor: activeColorObj.hex }}
                />
                <img 
                  src={getCustomWatchImage(selectedColor, selectedStrap)} 
                  alt={`${PRODUCT_NAME} ${activeColorObj.name}`} 
                  className={`customizer-watch-image ${imageLoading ? 'image-loading' : ''}`}
                  key={`${selectedColor}-${selectedStrap}`}
                  onLoad={() => setImageLoading(false)}
                />
                {imageLoading && (
                  <div className="customizer-skeleton" />
                )}
              </div>
              
              {recentlyViewed.length > 0 && (
                <div className="recently-viewed-panel">
                  <h4 className="recent-title">Đã xem gần đây:</h4>
                  <div className="recent-list">
                    {recentlyViewed.map(colorId => {
                      const colorObj = productColors.find(c => c.id === colorId);
                      if (!colorObj) return null;
                      return (
                        <button
                          key={colorId}
                          className={`recent-item ${selectedColor === colorId ? 'active' : ''}`}
                          onClick={() => handleColorChange(colorId, colorObj.name)}
                          title={colorObj.name}
                        >
                          <img src={colorObj.image} alt={colorObj.name} className="recent-thumb-img" />
                          <span className="recent-color-badge" style={{ backgroundColor: colorObj.hex }} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="customizer-form-panel">
              <div className="product-meta">
                <span className="product-category">Đồng hồ sức khỏe thế hệ mới</span>
                <h3 className="product-name">{PRODUCT_NAME}</h3>
                
                <div className="product-pricing">
                  <span className="current-price">{formatPrice(PRODUCT_PRICE)}</span>
                  <span className="original-price">{formatPrice(PRODUCT_ORIGINAL_PRICE)}</span>
                  <span className="discount-tag">Tiết kiệm 17%</span>
                </div>
              </div>

              <div className="option-group">
                <h4 className="option-title">
                  Màu vỏ Titan: <span>{activeColorObj.name}</span>
                </h4>
                <div className="color-selectors-list">
                  {productColors.map(color => (
                    <button
                      key={color.id}
                      className={`color-btn-item ${selectedColor === color.id ? 'active' : ''}`}
                      onClick={() => handleColorChange(color.id, color.name)}
                      style={{ '--color-hex': color.hex } as React.CSSProperties}
                      title={color.name}
                    >
                      <span className="color-dot-inner"></span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <div className="option-title-row">
                  <h4 className="option-title">
                    Kích thước vỏ: <span>{selectedSize}mm</span>
                  </h4>
                  <button className="size-guide-btn" onClick={() => setShowSizeGuide(true)}>
                    <Ruler size={14} /> Hướng dẫn chọn size
                  </button>
                </div>
                
                <div className="custom-segmented-control">
                  <div 
                    className="segmented-control-indicator" 
                    style={{
                      left: selectedSize === 41 ? '2px' : 'calc(50% + 2px)',
                      width: 'calc(50% - 4px)'
                    }}
                  />
                  <button 
                    className={`segmented-btn ${selectedSize === 41 ? 'active' : ''}`}
                    onClick={() => handleSizeChange(41)}
                  >
                    Size 41mm
                  </button>
                  <button 
                    className={`segmented-btn ${selectedSize === 45 ? 'active' : ''}`}
                    onClick={() => handleSizeChange(45)}
                  >
                    Size 45mm
                  </button>
                </div>
              </div>

              <div className="option-group">
                <h4 className="option-title">
                  Dây đeo: <span>{strapTypes.find(s => s.id === selectedStrap)?.name}</span>
                </h4>
                
                <div className="custom-segmented-control strap-control">
                  <div 
                    className="segmented-control-indicator" 
                    style={{
                      left: selectedStrap === 'silicon' ? '2px' : selectedStrap === 'leather' ? 'calc(33.33% + 2px)' : 'calc(66.66% + 2px)',
                      width: 'calc(33.33% - 4px)'
                    }}
                  />
                  {strapTypes.map(strap => (
                    <button
                      key={strap.id}
                      className={`segmented-btn ${selectedStrap === strap.id ? 'active' : ''}`}
                      onClick={() => handleStrapChange(strap.id)}
                    >
                      {strap.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="purchase-controls-row">
                <div className="quantity-stepper">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="stepper-btn"
                  >-</button>
                  <span className="stepper-val">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="stepper-btn"
                  >+</button>
                </div>

                <button 
                  className={`custom-cart-btn ${isAdding ? 'btn-adding' : ''}`} 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <>
                      <Check size={18} className="animate-scale-up" /> Đã thêm!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Thêm vào giỏ hàng
                    </>
                  )}
                </button>

                <button 
                  className={`custom-wishlist-btn ${isInWishlist(selectedColor, selectedSize, selectedStrap) ? 'active' : ''}`} 
                  onClick={handleToggleWishlist}
                  title="Lưu vào mục yêu thích"
                >
                  <Heart size={20} fill={isInWishlist(selectedColor, selectedSize, selectedStrap) ? 'var(--brand-error)' : 'none'} stroke={isInWishlist(selectedColor, selectedSize, selectedStrap) ? 'var(--brand-error)' : 'currentColor'} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {showSizeGuide && (
        <div className="size-guide-modal-overlay">
          <div className="size-guide-modal">
            <div className="modal-header">
              <h3>Hướng Dẫn Chọn Kích Thước</h3>
              <button className="close-modal-btn" onClick={() => setShowSizeGuide(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p>HelioWatch được thiết kế với 2 phiên bản kích thước vỏ để phù hợp hoàn hảo với cổ tay của bạn:</p>
              
              <div className="size-table-wrapper">
                <table className="size-table">
                  <thead>
                    <tr>
                      <th>Kích thước vỏ</th>
                      <th>Chu vi cổ tay khuyến nghị</th>
                      <th>Đặc tính trải nghiệm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Size 41mm</strong></td>
                      <td>130mm – 200mm</td>
                      <td>Nhỏ gọn, thanh lịch, trọng lượng cực nhẹ, phù hợp cho cổ tay vừa và nhỏ.</td>
                    </tr>
                    <tr>
                      <td><strong>Size 45mm</strong></td>
                      <td>140mm – 220mm</td>
                      <td>Màn hình hiển thị lớn, sắc nét, thể thao và cá tính, hiển thị nhiều thông số tập luyện hơn.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="size-guide-steps">
                <h4>Cách đo cổ tay của bạn tại nhà:</h4>
                <ol>
                  <li>Dùng một sợi dây mềm hoặc một dải giấy mỏng quấn quanh cổ tay ngay dưới xương khớp cổ tay.</li>
                  <li>Đánh dấu điểm giao nhau của dải giấy hoặc sợi dây.</li>
                  <li>Dùng thước kẻ thẳng đo chiều dài từ điểm đầu đến điểm đánh dấu (đó chính là chu vi cổ tay của bạn).</li>
                  <li>Đối chiếu với bảng thông số bên trên để chọn phiên bản 41mm hay 45mm tối ưu nhất.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .customizer-section {
          padding: 120px 0 100px;
          background-color: var(--bg-primary);
          transition: background 0.5s ease;
          border-top: 1px solid var(--border-color);
          overflow-x: hidden;
        }

        .customizer-main-title {
          font-family: var(--font-sans);
          font-size: clamp(2.4rem, 3.8vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 60px;
        }

        .customizer-main-title span {
          color: var(--primary-gold);
        }

        .customizer-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 96px;
          align-items: center;
        }

        .customizer-visual-panel {
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: center;
          width: 100%;
        }

        .customizer-preview-box {
          position: relative;
          width: 100%;
          max-width: 520px;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .customizer-glow-aura {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.16;
          z-index: 1;
          pointer-events: none;
          transition: background-color 0.8s ease;
          animation: auraPulse 6s ease-in-out infinite;
        }

        [data-theme='dark'] .customizer-glow-aura {
          opacity: 0.28;
          filter: blur(80px);
        }

        @keyframes auraPulse {
          0%, 100% { transform: scale(1); opacity: 0.16; }
          50% { transform: scale(1.15); opacity: 0.24; }
        }

        .customizer-watch-image {
          position: relative;
          z-index: 2;
          max-width: 82%;
          height: auto;
          border-radius: 24px;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.12));
          animation: watchFloat 6s ease-in-out infinite;
        }

        [data-theme='dark'] .customizer-watch-image {
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
        }

        @keyframes watchFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }

        .recently-viewed-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }

        .recent-title {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-tertiary);
        }

        .recent-list {
          display: flex;
          gap: 14px;
        }

        .recent-item {
          position: relative;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background-color: var(--surface-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
          padding: 4px;
        }

        .recent-item:hover {
          transform: translateY(-2px);
          border-color: var(--text-primary);
        }

        .recent-item.active {
          border-color: var(--text-primary);
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }

        .recent-thumb-img {
          width: 85%;
          height: auto;
          object-fit: contain;
        }

        .recent-color-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--surface-primary);
        }

        .customizer-form-panel {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .product-meta {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 24px;
        }

        .product-category {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary-gold);
          display: block;
          margin-bottom: 8px;
        }

        .product-name {
          font-family: var(--font-sans);
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .product-pricing {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .current-price {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .original-price {
          font-size: 1.25rem;
          text-decoration: line-through;
          color: var(--text-tertiary);
        }

        .discount-tag {
          font-size: 0.75rem;
          font-weight: 700;
          background-color: rgba(239, 68, 68, 0.08);
          color: var(--brand-error);
          padding: 4px 8px;
          border-radius: 6px;
          align-self: center;
        }

        .option-group {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .option-title {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .option-title span {
          color: var(--text-secondary);
          font-weight: 500;
          margin-left: 4px;
        }

        .option-title-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 4px;
          overflow: visible;
        }

        .size-guide-btn {
          font-family: var(--font-sans);
          font-size: 0.84rem;
          font-weight: 600;
          color: #0066cc;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: opacity 0.2s;
        }

        .size-guide-btn:hover {
          text-decoration: underline;
        }

        .color-selectors-list {
          display: flex;
          gap: 16px;
        }

        .color-btn-item {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.3s;
          padding: 0;
        }

        .color-btn-item.active {
          border-color: var(--text-primary);
        }

        .color-dot-inner {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: var(--color-hex);
          display: block;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
        }

        .custom-segmented-control {
          position: relative;
          display: flex;
          background: var(--bg-secondary);
          border-radius: 100px;
          padding: 2px;
          height: 52px;
          overflow: hidden;
          max-width: 100%;
          width: 100%;
        }

        .segmented-control-indicator {
          position: absolute;
          top: 2px;
          bottom: 2px;
          background: var(--text-primary);
          border-radius: 100px;
          transition: left 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .segmented-btn {
          position: relative;
          z-index: 2;
          flex: 1;
          height: 100%;
          background: transparent;
          border: none;
          border-radius: 100px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.4s;
          padding: 0;
          text-align: center;
        }

        .segmented-btn.active {
          color: var(--bg-primary);
        }

        .purchase-controls-row {
          display: flex;
          align-items: center;
          gap: 16px;
          border-top: 1px solid var(--border-color);
          padding-top: 32px;
          margin-top: 8px;
        }

        .quantity-stepper {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--border-color);
          border-radius: 100px;
          height: 52px;
          overflow: hidden;
          background: var(--bg-secondary);
        }

        .stepper-btn {
          width: 44px;
          height: 100%;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-secondary);
          transition: background 0.2s, color 0.2s;
        }

        .stepper-btn:hover {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        .stepper-val {
          width: 36px;
          text-align: center;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .custom-cart-btn {
          flex-grow: 1;
          height: 52px;
          border-radius: 100px;
          background-color: var(--text-primary);
          color: var(--bg-primary);
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
        }

        .custom-cart-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .custom-cart-btn:active {
          transform: translateY(1px);
        }

        .custom-wishlist-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: var(--surface-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.3s, background-color 0.3s;
          color: var(--text-secondary);
          padding: 0;
        }

        .custom-wishlist-btn:hover {
          border-color: var(--brand-error);
          background-color: rgba(239, 68, 68, 0.05);
          color: var(--brand-error);
        }

        .custom-wishlist-btn.active {
          border-color: var(--brand-error);
          background-color: rgba(239, 68, 68, 0.08);
          color: var(--brand-error);
        }

        .size-guide-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }

        .size-guide-modal {
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
          width: 100%;
          max-width: 640px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: var(--glass-shadow);
          animation: modalScaleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes modalScaleUp {
          from {
            transform: scale(0.92) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .modal-header {
          padding: 24px 32px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          font-family: var(--font-sans);
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .close-modal-btn {
          font-size: 1.2rem;
          color: var(--text-tertiary);
          transition: color 0.2s, transform 0.2s;
        }

        .close-modal-btn:hover {
          color: var(--text-primary);
          transform: scale(1.1);
        }

        .modal-body {
          padding: 32px;
          max-height: 80vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .size-table-wrapper {
          overflow-x: auto;
          border: 1px solid var(--border-color);
          border-radius: 16px;
        }

        .size-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }

        .size-table th, .size-table td {
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .size-table th {
          background-color: var(--bg-secondary);
          font-weight: 700;
        }

        .size-table tr:last-child td {
          border-bottom: none;
        }

        .size-guide-steps h4 {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .size-guide-steps ol {
          padding-left: 20px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .customizer-skeleton {
          position: absolute;
          z-index: 3;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--border-color) 50%, var(--bg-secondary) 75%);
          background-size: 200% 100%;
          animation: loading-skeleton 1.5s infinite, watchFloat 6s ease-in-out infinite;
          opacity: 0.75;
          pointer-events: none;
        }

        .image-loading {
          opacity: 0.15;
          filter: blur(8px) drop-shadow(0 20px 40px rgba(0,0,0,0.05));
          transition: opacity 0.3s, filter 0.3s;
        }

        .custom-cart-btn.btn-adding {
          background-color: var(--brand-success);
          color: #ffffff;
        }

        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes scaleUp {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 992px) {
          .customizer-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .customizer-preview-box {
            height: 400px;
          }

          .customizer-glow-aura {
            width: 220px;
            height: 220px;
          }

          .customizer-watch-image {
            max-width: 70%;
          }
        }

        @media (max-width: 768px) {
          .option-title-row {
            flex-wrap: wrap;
            gap: 6px;
          }

          .size-guide-btn {
            font-size: 0.8rem;
            flex-shrink: 0;
          }
        }

        @media (max-width: 576px) {
          .customizer-section {
            padding: 80px 0 60px;
          }

          .purchase-controls-row {
            flex-wrap: wrap;
          }

          .custom-cart-btn {
            order: 3;
            width: 100%;
          }

          .custom-segmented-control {
            height: 52px;
          }

          .custom-segmented-control.strap-control {
            flex-direction: column;
            height: auto;
            border-radius: 16px;
            gap: 8px;
            background: transparent;
            padding: 0;
            overflow: visible;
          }

          .custom-segmented-control.strap-control .segmented-control-indicator {
            display: none;
          }

          .custom-segmented-control.strap-control .segmented-btn {
            height: 60px;
            border: 1.5px solid var(--border-color);
            background: var(--surface-primary);
            border-radius: 14px;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: 0.01em;
          }

          .custom-segmented-control.strap-control .segmented-btn.active {
            background: var(--text-primary);
            border-color: var(--text-primary);
            color: var(--bg-primary);
          }
        }
      `}</style>
    </section>
  );
};
