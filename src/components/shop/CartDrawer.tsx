import React from 'react';
import { useShop } from '../../context/ShopContext';
import { useToast } from '../../context/ToastContext';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useShop();

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    showToast('Thành công', 'Thanh toán thành công! Cảm ơn bạn đã mua sắm.', 'success');
    alert('Thanh toán thành công!');
    clearCart();
    onClose();
  };

  return (
    <>
      <div
        className={`drawer-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
      />

      <div className={`drawer-container ${isOpen ? 'is-open' : ''}`}>
        <div className="drawer-header">
          <h2 className="drawer-title">Giỏ hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
          <button onClick={onClose} className="drawer-close-btn" aria-label="Đóng giỏ hàng">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="drawer-body custom-drawer-scrollbar">
          {cart.length === 0 ? (
            <div className="drawer-empty-state">
              <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
              <p className="empty-desc">Giỏ hàng của bạn đang trống</p>
              <button onClick={onClose} className="drawer-empty-cta">
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-row">
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
                        onClick={() => removeFromCart(item.id)}
                        className="item-delete-btn"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="item-bottom-row">
                      <div className="quantity-grid-selector">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="qty-grid-btn"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="qty-grid-num">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="qty-grid-btn"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="item-price-text">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="billing-breakdown">
              <div className="billing-row">
                <span>Tạm tính</span>
                <span className="billing-val">{(totalAmount).toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="billing-row">
                <span>Vận chuyển</span>
                <span className="shipping-free-text">Miễn phí</span>
              </div>
              <div className="billing-divider" />
              <div className="billing-row total-row">
                <span className="total-label">Tổng cộng</span>
                <span className="total-val">
                  {totalAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            <button onClick={handleCheckout} className="checkout-submit-btn">
              Thanh toán
            </button>
          </div>
        )}
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

        .cart-items-list {
          display: flex;
          flex-direction: column;
        }

        .cart-item-row {
          display: flex;
          gap: 16px;
          padding: 24px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .cart-item-row:last-child {
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

        .quantity-grid-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          height: 32px;
          overflow: hidden;
        }

        .qty-grid-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 100%;
          transition: background-color 0.2s, color 0.2s;
        }

        .qty-grid-btn:hover:not(:disabled) {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
        }

        .qty-grid-btn:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }

        .qty-grid-num {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          min-width: 28px;
          text-align: center;
          border-left: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item-price-text {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .drawer-footer {
          padding: 24px 28px;
          border-top: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .billing-breakdown {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.88rem;
        }

        .billing-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-secondary);
        }

        .billing-val {
          font-weight: 600;
          color: var(--text-primary);
        }

        .shipping-free-text {
          font-weight: 600;
          color: #10b981;
        }

        .billing-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 4px 0;
        }

        .total-row {
          align-items: center;
        }

        .total-label {
          font-weight: 700;
          color: var(--text-primary);
        }

        .total-val {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .checkout-submit-btn {
          height: 48px;
          background-color: #000000;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        [data-theme='dark'] .checkout-submit-btn {
          background-color: #ffffff;
          color: #000000;
        }

        .checkout-submit-btn:hover {
          background-color: #222222;
        }

        [data-theme='dark'] .checkout-submit-btn:hover {
          background-color: #e5e5e5;
        }
      `}</style>
    </>
  );
};
