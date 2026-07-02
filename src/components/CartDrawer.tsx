import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateCartQuantity } = useShop();

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[400px] max-w-[100vw] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl z-[101] shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" /> Giỏ Hàng
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-700" />
              <p className="text-zinc-500 dark:text-zinc-400 text-lg">Giỏ hàng của bạn đang trống</p>
              <button onClick={onClose} className="text-blue-600 dark:text-blue-500 hover:underline">
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-xl p-2 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {item.colorName} • {item.size}mm
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-4 text-center font-medium text-zinc-900 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-zinc-600 dark:text-zinc-300">Tổng cộng</span>
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                {totalAmount.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <button className="w-full py-4 px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-semibold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2">
              Thanh Toán Ngay
            </button>
          </div>
        )}
      </div>
    </>
  );
};
