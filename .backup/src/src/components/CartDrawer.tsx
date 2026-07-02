import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';
import { useTracking } from '../hooks/useTracking';
import { X, Trash2, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useShop();
  const { showToast } = useToast();
  const { trackEvent } = useTracking();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setIsCheckingOut(true);
    trackEvent('Bắt đầu thanh toán giỏ hàng', 'E-commerce', `Tổng tiền: ${totalAmount}đ`);

    // Simulate sending order data to a webhook/backend
    setTimeout(() => {
      setIsCheckingOut(false);
      clearCart();
      onClose();
      trackEvent('Thanh toán đơn hàng thành công', 'E-commerce', 'Order Placed');
      showToast(
        'Đặt hàng thành công!',
        'Cảm ơn bạn đã mua HelioRing. Nhân viên tư vấn sẽ liên hệ xác nhận size và giao hàng trong 24h tới!',
        'success'
      );
    }, 2000);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container glass-panel animate-slide-left" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-wrapper">
            <ShoppingBag size={20} />
            <h3>Giỏ Hàng ({cart.length})</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} title="Đóng">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {cart.length === 0 ? (
            <div className="drawer-empty-state">
              <ShoppingBag size={48} className="empty-icon" />
              <p>Giỏ hàng của bạn đang trống.</p>
              <button className="btn btn-primary" onClick={onClose}>Tiếp tục khám phá</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-img-wrapper">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-specs">
                      Màu: {item.colorName} | Size: {item.size}
                    </p>
                    <div className="item-price-qty-row">
                      <span className="item-price">{formatPrice(item.price)}</span>
                      
                      <div className="item-qty-selector">
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="qty-btn-sm"
                        >
                          -
                        </button>
                        <span className="qty-val-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="qty-btn-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="item-delete-btn" 
                    onClick={() => {
                      removeFromCart(item.id);
                      trackEvent(`Xóa sản phẩm khỏi giỏ: ${item.name}`, 'E-commerce', item.id);
                      showToast('Đã xóa sản phẩm', 'Sản phẩm đã được loại khỏi giỏ hàng.', 'info');
                    }}
                    title="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Tạm tính:</span>
              <span className="summary-val">{formatPrice(totalAmount)}</span>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển:</span>
              <span className="summary-val text-free">Miễn phí</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Tổng cộng:</span>
              <span className="summary-val-total">{formatPrice(totalAmount)}</span>
            </div>

            <button 
              className="btn btn-primary checkout-btn" 
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  <span className="spinner"></span> Đang xử lý...
                </>
              ) : (
                <>Đặt Hàng Ngay</>
              )}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.3s ease-out;
        }

        .drawer-container {
          width: 100%;
          max-width: 440px;
          height: 100%;
          background-color: var(--surface-primary);
          border-left: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          box-shadow: var(--glass-shadow);
        }

        .animate-slide-left {
          animation: slideLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .drawer-title-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .drawer-title-wrapper h3 {
          font-size: 1.15rem;
          margin: 0;
        }

        .drawer-close-btn {
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .drawer-close-btn:hover {
          color: var(--text-primary);
        }

        .drawer-content {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .drawer-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          gap: 1rem;
          color: var(--text-secondary);
        }

        .empty-icon {
          color: var(--text-tertiary);
          opacity: 0.5;
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .cart-item-card {
          display: flex;
          gap: 12px;
          padding: 1rem;
          background-color: var(--bg-secondary);
          border-radius: 16px;
          position: relative;
          align-items: center;
          transition: var(--transition-fast);
        }

        .cart-item-img-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 10px;
          background-color: var(--surface-primary);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
        }

        .cart-item-img-wrapper img {
          width: 85%;
          height: auto;
        }

        .cart-item-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .item-name {
          font-size: 0.95rem;
          font-weight: 750;
          color: var(--text-primary);
        }

        .item-specs {
          font-size: 0.775rem;
          color: var(--text-tertiary);
          font-weight: 600;
        }

        .item-price-qty-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
        }

        .item-price {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .item-qty-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          overflow: hidden;
          background-color: var(--surface-primary);
        }

        .qty-btn-sm {
          width: 26px;
          height: 26px;
          font-weight: bold;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .qty-btn-sm:hover {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
        }

        .qty-val-sm {
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0 8px;
          color: var(--text-primary);
        }

        .item-delete-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          color: var(--text-tertiary);
          transition: var(--transition-fast);
        }

        .item-delete-btn:hover {
          color: var(--brand-error);
        }

        .drawer-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--border-color);
          background-color: rgba(0,0,0,0.01);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .summary-val {
          font-weight: 600;
          color: var(--text-primary);
        }

        .text-free {
          color: var(--brand-success);
          font-weight: 700;
        }

        .summary-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 12px 0;
        }

        .total-row {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .summary-val-total {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .checkout-btn {
          width: 100%;
          height: 48px;
          border-radius: 12px;
        }

        /* Spinner for loading state */
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #ffffff;
          animation: spin 0.8s ease-in-out infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
