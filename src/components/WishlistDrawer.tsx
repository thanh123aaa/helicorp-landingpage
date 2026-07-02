import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Heart, ShoppingBag } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  const handleMoveToCart = (item: any) => {
    addToCart(item.color, item.size, 1);
    toggleWishlist(item.color, item.size);
  };

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
            <Heart className="w-6 h-6 text-red-500 fill-red-500" /> Yêu Thích
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <Heart className="w-16 h-16 text-zinc-300 dark:text-zinc-700" />
              <p className="text-zinc-500 dark:text-zinc-400 text-lg">Chưa có sản phẩm nào được yêu thích</p>
              <button onClick={onClose} className="text-blue-600 dark:text-blue-500 hover:underline">
                Khám phá ngay
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
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
                      onClick={() => toggleWishlist(item.color, item.size)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {item.price.toLocaleString('vi-VN')}đ
                    </span>
                    <button 
                      onClick={() => handleMoveToCart(item)}
                      className="flex items-center gap-2 text-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" /> Thêm
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
