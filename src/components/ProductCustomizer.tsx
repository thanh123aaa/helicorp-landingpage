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
  const [selectedSize, setSelectedSize] = useState<number>(45); // Default size 45mm
  const [selectedStrap, setSelectedStrap] = useState<string>('silicon'); // Default strap type
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const activeColorObj = productColors.find(c => c.id === selectedColor) || productColors[0];

  const handleColorChange = (colorId: string, colorName: string) => {
    setSelectedColor(colorId);
    addToRecentlyViewed(colorId);
    trackEvent(`Chọn màu đồng hồ: ${colorName}`, 'Product Customizer', 'Color Option Click');
  };

  const handleSizeChange = (size: number) => {
    setSelectedSize(size);
    trackEvent(`Chọn kích thước mặt: ${size}mm`, 'Product Customizer', 'Size Option Click');
  };

  const handleStrapChange = (strapType: string) => {
    setSelectedStrap(strapType);
    trackEvent(`Chọn chất liệu dây: ${strapType}`, 'Product Customizer', 'Strap Option Click');
  };

  const handleAddToCart = () => {
    addToCart(selectedColor, selectedSize, quantity);
    trackEvent(`Thêm vào giỏ hàng: ${PRODUCT_NAME} (${activeColorObj.name}, Size ${selectedSize}mm, Dây ${selectedStrap}, SL: ${quantity})`, 'E-commerce', 'Button Add To Cart');
    showToast(
      'Đã thêm vào giỏ hàng',
      `${PRODUCT_NAME} - ${activeColorObj.name} (${selectedSize}mm - Dây ${selectedStrap}) x ${quantity} đã được thêm thành công!`,
      'success'
    );
  };

  const handleToggleWishlist = () => {
    toggleWishlist(selectedColor, selectedSize);
    const added = !isInWishlist(selectedColor, selectedSize);
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
        <h2 className="title-section">
          Cá nhân hóa <span>HelioWatch</span> của bạn
        </h2>
        
        <div className="customizer-grid">
          {/* Left Side: Product Image Display */}
          <div className="customizer-visual-panel">
            <div className="customizer-image-container glass-panel">
              <img 
                src={activeColorObj.image} 
                alt={`${PRODUCT_NAME} ${activeColorObj.name}`} 
                className="customizer-watch-image animate-fade-in"
                key={selectedColor}
                width="450"
                height="450"
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
              <span className="product-category">Đồng hồ sức khỏe thế hệ mới</span>
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
                    <span className="color-core"></span>
                    {selectedColor === color.id && <Check className="color-check-icon" size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Size Select */}
            <div className="option-group">
              <div className="option-title-row">
                <h4 className="option-title">
                  Kích thước vỏ: <span>{selectedSize}mm</span>
                </h4>
                <button className="size-guide-btn" onClick={() => setShowSizeGuide(true)}>
                  <Ruler size={14} /> Hướng dẫn chọn size
                </button>
              </div>
              <div className="sizes-grid">
                {[41, 45].map(size => (
                  <button
                    key={size}
                    className={`size-btn-item ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    Size {size}mm
                  </button>
                ))}
              </div>
            </div>

            {/* Strap Select */}
            <div className="option-group">
              <h4 className="option-title">
                Dây đeo: <span>{strapTypes.find(s => s.id === selectedStrap)?.name}</span>
              </h4>
              <div className="strap-selectors-list">
                {strapTypes.map(strap => (
                  <button
                    key={strap.id}
                    className={`strap-btn-item ${selectedStrap === strap.id ? 'active' : ''}`}
                    onClick={() => handleStrapChange(strap.id)}
                  >
                    {strap.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="purchase-controls">
              <div className="quantity-selector-wrapper">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="qty-btn"
                >-</button>
                <span className="qty-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="qty-btn"
                >+</button>
              </div>

              <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                <ShoppingBag size={18} /> Thêm vào giỏ hàng
              </button>

              <button 
                className={`btn-icon wishlist-btn ${isInWishlist(selectedColor, selectedSize) ? 'active' : ''}`} 
                onClick={handleToggleWishlist}
                title="Lưu vào mục yêu thích"
              >
                <Heart size={20} fill={isInWishlist(selectedColor, selectedSize) ? 'var(--brand-error)' : 'none'} stroke={isInWishlist(selectedColor, selectedSize) ? 'var(--brand-error)' : 'currentColor'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="size-guide-modal-overlay animate-fade-in">
          <div className="size-guide-modal glass-panel animate-slide-up">
            <div className="modal-header">
              <h3>Hướng Dẫn Chọn Kích Thước HelioWatch</h3>
              <button className="close-modal-btn" onClick={() => setShowSizeGuide(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p>HelioWatch được thiết kế với 2 phiên bản kích thước vỏ để phù hợp hoàn hảo với cổ tay của từng cá nhân:</p>
              
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
          padding: 8rem 0;
          background-color: var(--bg-secondary);
        }

        .customizer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-top: 3.5rem;
          align-items: start;
        }

        .customizer-visual-panel {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .customizer-image-container {
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 2rem;
        }

        .customizer-watch-image {
          max-width: 100%;
          height: auto;
          filter: drop-shadow(0 15px 40px rgba(0,0,0,0.15));
          transition: transform 0.3s ease;
        }

        .customizer-watch-image:hover {
          transform: scale(1.05);
        }

        /* Recently viewed */
        .recently-viewed-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .recent-title {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-tertiary);
          font-weight: 700;
        }

        .recent-list {
          display: flex;
          gap: 12px;
        }

        .recent-item {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background-color: var(--surface-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--transition-fast);
        }

        .recent-item.active {
          border-color: var(--text-primary);
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }

        .recent-item img {
          width: 80%;
          height: auto;
        }

        .recent-dot {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid var(--surface-primary);
        }

        /* Form panel */
        .customizer-form-panel {
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2.2rem;
        }

        .product-meta {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
        }

        .product-category {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary-gold);
          font-weight: 800;
        }

        .product-name {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 4px 0 12px;
        }

        .product-pricing {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .current-price {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .original-price {
          font-size: 1.2rem;
          text-decoration: line-through;
          color: var(--text-tertiary);
        }

        .discount-tag {
          font-size: 0.75rem;
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--brand-error);
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 700;
        }

        /* Options group */
        .option-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .option-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .option-title span {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .option-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .size-guide-btn {
          font-size: 0.85rem;
          color: var(--brand-primary);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: var(--transition-fast);
        }

        .size-guide-btn:hover {
          opacity: 0.8;
          transform: translateX(2px);
        }

        /* Color buttons */
        .color-selectors-list {
          display: flex;
          gap: 14px;
        }

        .color-btn-item {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .color-btn-item.active {
          border-color: var(--text-primary);
        }

        .color-core {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--color-hex);
          display: block;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }

        .color-check-icon {
          position: absolute;
          color: #ffffff;
        }

        /* Sizes grid */
        .sizes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .size-btn-item {
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background-color: var(--surface-primary);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .size-btn-item:hover {
          border-color: var(--text-primary);
          background-color: var(--bg-secondary);
        }

        .size-btn-item.active {
          background-color: var(--text-primary);
          color: var(--bg-primary);
          border-color: var(--text-primary);
        }

        /* Strap button selectors */
        .strap-selectors-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .strap-btn-item {
          padding: 0.8rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background-color: var(--surface-primary);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .strap-btn-item:hover {
          border-color: var(--text-primary);
          background-color: var(--bg-secondary);
        }

        .strap-btn-item.active {
          background-color: var(--text-primary);
          color: var(--bg-primary);
          border-color: var(--text-primary);
        }

        /* Controls */
        .purchase-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 1.5rem;
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
        }

        .quantity-selector-wrapper {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--border-color);
          border-radius: 100px;
          height: 48px;
          overflow: hidden;
          background-color: var(--bg-secondary);
        }

        .qty-btn {
          width: 40px;
          height: 100%;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .qty-btn:hover {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        .qty-value {
          width: 32px;
          text-align: center;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .add-to-cart-btn {
          flex-grow: 1;
          height: 48px;
          border-radius: 100px;
          font-size: 0.95rem;
        }

        .wishlist-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .wishlist-btn:hover {
          border-color: var(--brand-error);
          background-color: rgba(239, 68, 68, 0.05);
        }

        .wishlist-btn.active {
          border-color: var(--brand-error);
          background-color: rgba(239, 68, 68, 0.08);
        }

        /* Size Guide Modal Styling */
        .size-guide-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .size-guide-modal {
          background-color: var(--surface-primary);
          border: 1px solid var(--border-color);
          width: 100%;
          max-width: 640px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--glass-shadow);
        }

        .modal-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .close-modal-btn {
          font-size: 1.2rem;
          color: var(--text-tertiary);
          transition: var(--transition-fast);
        }

        .close-modal-btn:hover {
          color: var(--text-primary);
          transform: scale(1.1);
        }

        .modal-body {
          padding: 2rem;
          max-height: 80vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .size-table-wrapper {
          overflow-x: auto;
          border: 1px solid var(--border-color);
          border-radius: 12px;
        }

        .size-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }

        .size-table th, .size-table td {
          padding: 1rem;
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
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .size-guide-steps ol {
          padding-left: 1.25rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        @media (max-width: 992px) {
          .customizer-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .customizer-image-container {
            height: 380px;
          }
        }

        @media (max-width: 576px) {
          .customizer-form-panel {
            padding: 1.5rem;
          }

          .purchase-controls {
            flex-wrap: wrap;
          }

          .add-to-cart-btn {
            order: 3;
            width: 100%;
          }

          .strap-selectors-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
