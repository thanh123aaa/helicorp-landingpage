import React from 'react';
import { useShop } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';
import { useTracking } from '../hooks/useTracking';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCartOpen: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose, onCartOpen }) => {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const { showToast } = useToast();
  const { trackEvent } = useTracking();

  if (!isOpen) return null;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleAddToCart = (item: any) => {
    addToCart(item.color, item.size, 1);
    // Remove from wishlist
    toggleWishlist(item.color, item.size);

    trackEvent(`Di chuyển từ Yêu thích vào Giỏ hàng: ${item.name}`, 'E-commerce', item.id);
    showToast(
      'Đã chuyển vào giỏ hàng',
      `${item.name} (${item.colorName}, Size ${item.size}) đã được chuyển vào giỏ hàng thành công!`,
      'success'
    );
    
    // Automatically transition to cart drawer
    onClose();
    onCartOpen();
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container glass-panel animate-slide-left" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-wrapper">
            <Heart size={20} className="text-brand-error" style={{ color: '#ef4444', fill: '#ef4444' }} />
            <h3>Đã Lưu Yêu Thích ({wishlist.length})</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} title="Đóng">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {wishlist.length === 0 ? (
            <div className="drawer-empty-state">
              <Heart size={48} className="empty-icon" />
              <p>Danh sách yêu thích của bạn đang trống.</p>
              <button className="btn btn-primary" onClick={onClose}>Xem cấu hình nhẫn</button>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlist.map(item => (
                <div key={item.id} className="wishlist-item-card">
                  <div className="wishlist-item-img-wrapper">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="wishlist-item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-specs">
                      Màu: {item.colorName} | Size: {item.size}
                    </p>
                    <span className="item-price">{formatPrice(item.price)}</span>
                  </div>

                  <div className="wishlist-item-actions">
                    <button 
                      className="add-to-cart-btn-sm" 
                      onClick={() => handleAddToCart(item)}
                      title="Thêm vào giỏ"
                    >
                      <ShoppingCart size={14} /> Chuyển vào giỏ
                    </button>
                    
                    <button 
                      className="wishlist-delete-btn"
                      onClick={() => {
                        toggleWishlist(item.color, item.size);
                        trackEvent(`Xóa sản phẩm khỏi Yêu thích: ${item.name}`, 'E-commerce', item.id);
                        showToast('Đã xóa khỏi Yêu thích', 'Sản phẩm đã được xóa khỏi danh sách yêu thích.', 'info');
                      }}
                      title="Xóa"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .wishlist-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .wishlist-item-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 1.25rem;
          background-color: var(--bg-secondary);
          border-radius: 16px;
          position: relative;
          transition: var(--transition-fast);
          border: 1px solid transparent;
        }

        .wishlist-item-card:hover {
          border-color: var(--border-color);
        }

        .wishlist-item-img-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          background-color: var(--surface-primary);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          align-self: flex-start;
        }

        .wishlist-item-img-wrapper img {
          width: 85%;
          height: auto;
        }

        .wishlist-item-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .wishlist-item-actions {
          display: flex;
          gap: 10px;
          margin-top: 6px;
          border-top: 1px dashed var(--border-color);
          padding-top: 10px;
        }

        .add-to-cart-btn-sm {
          flex-grow: 1;
          background-color: var(--text-primary);
          color: var(--bg-primary);
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: var(--transition-fast);
        }

        .add-to-cart-btn-sm:hover {
          transform: translateY(-1px);
          opacity: 0.9;
        }

        .wishlist-delete-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .wishlist-delete-btn:hover {
          color: var(--brand-error);
          background-color: rgba(239, 68, 68, 0.05);
        }
      `}</style>
    </div>
  );
};
