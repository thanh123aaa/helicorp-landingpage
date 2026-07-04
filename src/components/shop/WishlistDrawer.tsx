import React from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Trash2, Heart, ShoppingBag } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  const handleMoveToCart = (item: any) => {
    addToCart(item.color, item.size, 1, item.strap);
    toggleWishlist(item.color, item.size, item.strap);
  };

  return (
    <>
      <div 
        className={`drawer-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
      />
      
      <div className={`drawer-container ${isOpen ? 'is-open' : ''}`}>
        <div className="drawer-header">
          <h2 className="drawer-title">Sản phẩm yêu thích ({wishlist.length})</h2>
          <button onClick={onClose} className="drawer-close-btn" aria-label="Đóng danh sách yêu thích">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="drawer-body custom-drawer-scrollbar">
          {wishlist.length === 0 ? (
            <div className="drawer-empty-state">
              <Heart className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
              <p className="empty-desc">Chưa có sản phẩm nào trong danh mục yêu thích</p>
              <button onClick={onClose} className="drawer-empty-cta">
                Khám phá bộ sưu tập
              </button>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlist.map((item) => (
                <div key={item.id} className="wishlist-item-row">
                  <div className="item-image-wrapper">
                    <img src={item.image} alt={item.name} className="item-image" />
                  </div>
                  
                  <div className="item-details-wrapper">
                    <div className="item-header-row">
                      <div className="item-title-col">
                        <h4 className="item-title-text">{item.name}</h4>
                        <p className="item-specs-text">
                          {item.colorName} / {item.size}mm / {item.strapName}
                        </p>
                      </div>
                      <button 
                        onClick={() => toggleWishlist(item.color, item.size, item.strap)}
                        className="item-delete-btn"
                        title="Xóa yêu thích"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="item-bottom-row">
                      <span className="item-price-text">
                        {item.price.toLocaleString('vi-VN')}đ
                      </span>

                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="move-to-cart-grid-btn"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .drawer-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .drawer-backdrop.is-open {
          opacity: 1;
          visibility: visible;
        }

        .drawer-container {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: 420px;
          max-width: 100vw;
          background-color: #ffffff;
          z-index: 10000;
          box-shadow: -4px 0 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          transform: translateX(100%);
          display: flex;
          flex-direction: column;
        }

        [data-theme='dark'] .drawer-container {
          background-color: #161616;
          border-left: 1px solid #262626;
          box-shadow: -4px 0 30px rgba(0, 0, 0, 0.4);
        }

        .drawer-container.is-open {
          transform: translateX(0);
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid var(--border-color);
        }

        .drawer-title {
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .drawer-close-btn {
          background: transparent;
          border: none;
          padding: 4px;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .drawer-close-btn:hover {
          color: var(--text-primary);
        }

        .drawer-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 0 28px;
        }

        .custom-drawer-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-drawer-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-drawer-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }

        .drawer-empty-state {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 16px;
          padding: 40px 0;
        }

        .empty-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .drawer-empty-cta {
          background: none;
          border: none;
          color: var(--text-primary);
          text-decoration: underline;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 4px 8px;
        }

        .wishlist-items-list {
          display: flex;
          flex-direction: column;
        }

        .wishlist-item-row {
          display: flex;
          gap: 16px;
          padding: 24px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .wishlist-item-row:last-child {
          border-bottom: none;
        }

        .item-image-wrapper {
          width: 72px;
          height: 72px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .item-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .item-details-wrapper {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .item-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }

        .item-title-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .item-title-text {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .item-specs-text {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .item-delete-btn {
          background: transparent;
          border: none;
          padding: 4px;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .item-delete-btn:hover {
          color: #ef4444;
        }

        .item-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
        }

        .item-price-text {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .move-to-cart-grid-btn {
          background-color: #000000;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          height: 32px;
          padding: 0 12px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background-color 0.2s;
        }

        [data-theme='dark'] .move-to-cart-grid-btn {
          background-color: #ffffff;
          color: #000000;
        }

        .move-to-cart-grid-btn:hover {
          background-color: #222222;
        }

        [data-theme='dark'] .move-to-cart-grid-btn:hover {
          background-color: #e5e5e5;
        }
      `}</style>
    </>
  );
};
