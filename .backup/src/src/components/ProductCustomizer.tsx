import React, { useState } from 'react';
import { useShop, productColors, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_ORIGINAL_PRICE } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';
import { useTracking } from '../hooks/useTracking';
import { Heart, ShoppingBag, Ruler, Check } from 'lucide-react';

export const ProductCustomizer: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed, recentlyViewed } = useShop();
  const { showToast } = useToast();
  const { trackEvent } = useTracking();

  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState<number>(9);
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const activeColorObj = productColors.find(c => c.id === selectedColor) || productColors[0];

  const handleColorChange = (colorId: string, colorName: string) => {
    setSelectedColor(colorId);
    addToRecentlyViewed(colorId);
    trackEvent(`Chọn màu nhẫn: ${colorName}`, 'Product Customizer', 'Color Option Click');
  };

  const handleSizeChange = (size: number) => {
    setSelectedSize(size);
    trackEvent(`Chọn size nhẫn: ${size}`, 'Product Customizer', 'Size Option Click');
  };

  const handleAddToCart = () => {
    addToCart(selectedColor, selectedSize, quantity);
    trackEvent(`Thêm vào giỏ hàng: ${PRODUCT_NAME} (${activeColorObj.name}, Size ${selectedSize}, SL: ${quantity})`, 'E-commerce', 'Button Add To Cart');
    showToast(
      'Đã thêm vào giỏ hàng',
      `${PRODUCT_NAME} - ${activeColorObj.name} (Size ${selectedSize}) x ${quantity} đã được thêm thành công!`,
      'success'
    );
  };

  const handleToggleWishlist = () => {
    toggleWishlist(selectedColor, selectedSize);
    const added = !isInWishlist(selectedColor, selectedSize);
    trackEvent(`${added ? 'Thêm vào' : 'Xóa khỏi'} mục yêu thích: ${PRODUCT_NAME} (${activeColorObj.name}, Size ${selectedSize})`, 'E-commerce', 'Button Wishlist');
    showToast(
      added ? 'Đã lưu yêu thích' : 'Đã bỏ yêu thích',
      added ? 'Sản phẩm đã được lưu vào danh sách yêu thích của bạn.' : 'Sản phẩm đã được xóa khỏi danh sách yêu thích.',
      added ? 'success' : 'info'
    );
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <section id="customizer" className="customizer-section">
      <div className="container">
        <h2 className="title-section">
          Cá nhân hóa <span>HelioRing</span> của bạn
        </h2>
        
        <div className="customizer-grid">
          {/* Left Side: Product Image Display */}
          <div className="customizer-visual-panel">
            <div className="customizer-image-container glass-panel">
              <img 
                src={activeColorObj.image} 
                alt={`${PRODUCT_NAME} ${activeColorObj.name}`} 
                className="customizer-ring-image animate-fade-in"
                key={selectedColor}
                width="500"
                height="500"
              />
            </div>
            
            {/* Recently Viewed Strip */}
            {recentlyViewed.length > 0 && (
              <div className="recently-viewed-container">
                <h4 className="recent-title">Màu sắc vừa xem:</h4>
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
                        <img src={colorObj.image} alt={colorObj.name} width="40" height="40" />
                        <span className="recent-dot" style={{ backgroundColor: colorObj.hex }}></span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Options Form */}
          <div className="customizer-form-panel glass-panel">
            <div className="product-meta">
              <span className="product-category">Nhẫn sức khỏe thế hệ mới</span>
              <h3 className="product-name">{PRODUCT_NAME}</h3>
              
              <div className="product-pricing">
                <span className="current-price">{formatPrice(PRODUCT_PRICE)}</span>
                <span className="original-price">{formatPrice(PRODUCT_ORIGINAL_PRICE)}</span>
                <span className="discount-tag">Tiết kiệm 17%</span>
              </div>
            </div>

            {/* Colors Select */}
            <div className="option-group">
              <h4 className="option-title">
                Màu sắc: <span>{activeColorObj.name}</span>
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
                    <span className="color-core"></span>
                    {selectedColor === color.id && <Check className="color-check-icon" size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes Select */}
            <div className="option-group">
              <div className="option-title-row">
                <h4 className="option-title">
                  Kích cỡ (US): <span>Size {selectedSize}</span>
                </h4>
                <button className="size-guide-btn" onClick={() => setShowSizeGuide(true)}>
                  <Ruler size={14} /> Hướng dẫn đo size
                </button>
              </div>
              <div className="sizes-grid">
                {[6, 7, 8, 9, 10, 11, 12, 13].map(size => (
                  <button
                    key={size}
                    className={`size-btn-item ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="option-group">
              <h4 className="option-title">Số lượng:</h4>
              <div className="quantity-counter">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="qty-val">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="customizer-actions">
              <button className="btn btn-primary buy-now-btn" onClick={handleAddToCart}>
                <ShoppingBag size={18} /> Thêm vào giỏ hàng
              </button>
              
              <button 
                className={`btn-icon wishlist-toggle-btn ${isInWishlist(selectedColor, selectedSize) ? 'active' : ''}`}
                onClick={handleToggleWishlist}
                title={isInWishlist(selectedColor, selectedSize) ? "Bỏ yêu thích" : "Lưu yêu thích"}
              >
                <Heart size={20} className="heart-icon-svg" />
              </button>
            </div>

            <div className="shipping-badge">
              🚚 Miễn phí vận chuyển toàn quốc | Kiểm tra hàng trước khi thanh toán
            </div>
          </div>
        </div>
      </div>

      {/* Sizing Guide Modal */}
      {showSizeGuide && (
        <div className="size-guide-modal-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="size-guide-modal glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Hướng Dẫn Chọn Size Nhẫn</h3>
              <button className="modal-close-btn" onClick={() => setShowSizeGuide(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Để tìm kích cỡ nhẫn HelioRing chính xác nhất, bạn hãy làm theo các bước sau:</p>
              <ol className="guide-steps">
                <li>Dùng một sợi chỉ mảnh hoặc dải giấy nhỏ quấn quanh đốt ngón tay đeo nhẫn.</li>
                <li>Đánh dấu điểm giao nhau và dùng thước đo chính xác độ dài (chu vi ngón tay) bằng mm.</li>
                <li>Đối chiếu độ dài với bảng kích cỡ dưới đây để chọn size:</li>
              </ol>
              <table className="size-comparison-table">
                <thead>
                  <tr>
                    <th>Size US</th>
                    <th>Chu vi ngón tay (mm)</th>
                    <th>Đường kính trong (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Size 6</td><td>51.8 mm</td><td>16.5 mm</td></tr>
                  <tr><td>Size 7</td><td>54.4 mm</td><td>17.3 mm</td></tr>
                  <tr><td>Size 8</td><td>56.9 mm</td><td>18.1 mm</td></tr>
                  <tr><td>Size 9</td><td>59.5 mm</td><td>18.9 mm</td></tr>
                  <tr><td>Size 10</td><td>62.1 mm</td><td>19.8 mm</td></tr>
                  <tr><td>Size 11</td><td>64.6 mm</td><td>20.6 mm</td></tr>
                  <tr><td>Size 12</td><td>67.2 mm</td><td>21.4 mm</td></tr>
                  <tr><td>Size 13</td><td>69.7 mm</td><td>22.2 mm</td></tr>
                </tbody>
              </table>
              <div className="guide-note">
                <strong>* Lưu ý:</strong> Nếu chu vi ngón tay của bạn nằm giữa hai kích cỡ, chúng tôi khuyên bạn nên chọn <strong>size lớn hơn</strong> để đeo thoải mái cả ngày.
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .customizer-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
        }

        .customizer-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          margin-top: 3.5rem;
          align-items: flex-start;
        }

        .customizer-visual-panel {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .customizer-image-container {
          border-radius: 24px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--surface-primary);
          overflow: hidden;
        }

        .customizer-ring-image {
          width: 80%;
          height: auto;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.12));
          transition: transform 0.3s ease;
        }

        .customizer-ring-image:hover {
          transform: scale(1.05) rotate(5deg);
        }

        /* Recently Viewed Strip styling */
        .recently-viewed-container {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 1.5rem;
          border-radius: 16px;
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
        }

        .recent-title {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }

        .recent-list {
          display: flex;
          gap: 10px;
        }

        .recent-item {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          position: relative;
          background-color: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: var(--transition-fast);
        }

        .recent-item img {
          width: 80%;
          height: auto;
        }

        .recent-item.active {
          border-color: var(--text-primary);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .recent-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid var(--surface-primary);
        }

        /* Form panel styling */
        .customizer-form-panel {
          padding: 3rem;
          border-radius: 24px;
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
        }

        .product-meta {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }

        .product-category {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--primary-gold);
          letter-spacing: 0.08em;
          display: inline-block;
          margin-bottom: 6px;
        }

        .product-name {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .product-pricing {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .current-price {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .original-price {
          font-size: 1.15rem;
          text-decoration: line-through;
          color: var(--text-tertiary);
        }

        .discount-tag {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 8px;
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--brand-error);
          border-radius: 4px;
        }

        .option-group {
          margin-bottom: 2rem;
        }

        .option-title {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 0.85rem;
          color: var(--text-primary);
        }

        .option-title span {
          font-weight: 500;
          color: var(--text-secondary);
        }

        .option-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
        }

        .option-title-row .option-title {
          margin-bottom: 0;
        }

        .size-guide-btn {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-gold);
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 4px;
          transition: var(--transition-fast);
        }

        .size-guide-btn:hover {
          background-color: var(--bg-secondary);
        }

        /* Color selection buttons */
        .color-selectors-list {
          display: flex;
          gap: 12px;
        }

        .color-btn-item {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: var(--transition-fast);
          padding: 2px;
        }

        .color-core {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: var(--color-hex);
          border: 1px solid rgba(0,0,0,0.1);
        }

        .color-btn-item.active {
          border-color: var(--text-primary);
        }

        .color-check-icon {
          position: absolute;
          color: #ffffff;
          mix-blend-mode: difference;
        }

        /* Sizes layout */
        .sizes-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 6px;
        }

        .size-btn-item {
          aspect-ratio: 1;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background-color: var(--surface-primary);
          color: var(--text-primary);
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .size-btn-item:hover {
          border-color: var(--text-primary);
        }

        .size-btn-item.active {
          background-color: var(--text-primary);
          color: var(--bg-primary);
          border-color: var(--text-primary);
        }

        /* Quantity counters */
        .quantity-counter {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          overflow: hidden;
        }

        .qty-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .qty-btn:hover:not(:disabled) {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
        }

        .qty-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .qty-val {
          padding: 0 1.25rem;
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary);
        }

        /* Action Buttons */
        .customizer-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .buy-now-btn {
          flex-grow: 1;
          height: 52px;
          border-radius: 14px;
        }

        .wishlist-toggle-btn {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          flex-shrink: 0;
          border: 1px solid var(--border-color);
        }

        .wishlist-toggle-btn.active {
          background-color: rgba(239, 68, 68, 0.08);
          border-color: var(--brand-error);
          color: var(--brand-error);
        }

        .wishlist-toggle-btn.active .heart-icon-svg {
          fill: currentColor;
        }

        .shipping-badge {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          text-align: center;
          font-weight: 500;
        }

        /* Size Guide Modal Styles */
        .size-guide-modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.3s ease-out;
        }

        .size-guide-modal {
          background-color: var(--surface-primary);
          border-radius: 20px;
          max-width: 500px;
          width: 100%;
          box-shadow: var(--glass-shadow);
          overflow: hidden;
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          font-weight: 800;
          font-size: 1.2rem;
        }

        .modal-close-btn {
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--text-tertiary);
          transition: var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
        }

        .modal-body {
          padding: 1.5rem;
          max-height: 70vh;
          overflow-y: auto;
        }

        .guide-steps {
          margin: 1rem 0 1.5rem 1.25rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .size-comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
        }

        .size-comparison-table th, .size-comparison-table td {
          padding: 10px;
          border: 1px solid var(--border-color);
          text-align: center;
        }

        .size-comparison-table th {
          background-color: var(--bg-secondary);
          font-weight: 700;
        }

        .guide-note {
          padding: 10px;
          border-radius: 8px;
          background-color: var(--bg-secondary);
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 992px) {
          .customizer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .customizer-form-panel {
            padding: 2rem;
          }
        }

        @media (max-width: 576px) {
          .sizes-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          
          .customizer-actions {
            flex-direction: column;
          }
          
          .wishlist-toggle-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
