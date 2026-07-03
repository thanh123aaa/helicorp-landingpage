import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // combination of color + size + strap
  name: string;
  color: string;
  colorName: string;
  size: number;
  price: number;
  quantity: number;
  image: string;
  strap: string;
  strapName: string;
}

export interface WishlistItem {
  id: string; // combination of color + size + strap
  name: string;
  color: string;
  colorName: string;
  size: number;
  price: number;
  image: string;
  strap: string;
  strapName: string;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  image: string;
}

// Bảng ánh xạ ảnh đồng hồ tương ứng với từng loại Dây đeo và Màu vỏ Titan
export const getCustomWatchImage = (colorId: string, strapId: string): string => {
  const images: Record<string, Record<string, string>> = {
    black: {
      silicon: '/assets/watch-black.webp',
      leather: '/assets/fit-rings-light.png',
      titanium: '/assets/fit-chart-light.png'
    },
    silver: {
      silicon: '/assets/watch-silver.webp',
      leather: '/assets/Theodoinhiptho.jpg',
      titanium: '/assets/fit-dual-light.png'
    },
    gold: {
      silicon: '/assets/watch-gold.webp',
      leather: '/assets/Ungdungsinhhieu.jpg',
      titanium: '/assets/fit-yellow-light.png'
    },
    rose: {
      silicon: '/assets/watch-rose.webp',
      leather: '/assets/Theosattraitim.jpg',
      titanium: '/assets/watch-rose.webp'
    }
  };
  return images[colorId]?.[strapId] || images[colorId]?.silicon || '/assets/watch-black.webp';
};

export const getStrapName = (strapId: string): string => {
  const names: Record<string, string> = {
    silicon: 'Silicon Thể Thao',
    leather: 'Da Ý Lịch Lãm',
    titanium: 'Titanium Bản Thép'
  };
  return names[strapId] || 'Silicon Thể Thao';
};

interface ShopContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  recentlyViewed: string[]; // array of color IDs
  addToCart: (colorId: string, size: number, quantity: number, strap?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  toggleWishlist: (colorId: string, size: number, strap?: string) => void;
  isInWishlist: (colorId: string, size: number, strap?: string) => boolean;
  addToRecentlyViewed: (colorId: string) => void;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const productColors: ProductColor[] = [
  { id: 'black', name: 'Titanium Black', hex: '#1E1E1E', image: '/assets/watch-black.webp' },
  { id: 'silver', name: 'Stardust Silver', hex: '#D2D2D2', image: '/assets/watch-silver.webp' },
  { id: 'gold', name: 'Royal Gold', hex: '#E5C158', image: '/assets/watch-gold.webp' },
  { id: 'rose', name: 'Coral Rose', hex: '#E2B1B1', image: '/assets/watch-rose.webp' },
];

export const PRODUCT_NAME = 'HelioWatch Gen 3';
export const PRODUCT_PRICE = 9990000; // 9,990,000 VND
export const PRODUCT_ORIGINAL_PRICE = 12000000; // 12,000,000 VND

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('heliowatch_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('heliowatch_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('heliowatch_recent');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('heliowatch_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('heliowatch_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('heliowatch_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToCart = (colorId: string, size: number, quantity: number, strap = 'silicon') => {
    const colorObj = productColors.find(c => c.id === colorId) || productColors[0];
    const itemId = `${colorId}-${size}-${strap}`;
    const customImage = getCustomWatchImage(colorId, strap);

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: itemId,
        name: PRODUCT_NAME,
        color: colorId,
        colorName: colorObj.name,
        size,
        price: PRODUCT_PRICE,
        quantity,
        image: customImage,
        strap,
        strapName: getStrapName(strap)
      }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const toggleWishlist = (colorId: string, size: number, strap = 'silicon') => {
    const colorObj = productColors.find(c => c.id === colorId) || productColors[0];
    const itemId = `${colorId}-${size}-${strap}`;
    const customImage = getCustomWatchImage(colorId, strap);

    setWishlist(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.filter(item => item.id !== itemId);
      }
      return [...prev, {
        id: itemId,
        name: PRODUCT_NAME,
        color: colorId,
        colorName: colorObj.name,
        size,
        price: PRODUCT_PRICE,
        image: customImage,
        strap,
        strapName: getStrapName(strap)
      }];
    });
  };

  const isInWishlist = (colorId: string, size: number, strap = 'silicon') => {
    const itemId = `${colorId}-${size}-${strap}`;
    return wishlist.some(item => item.id === itemId);
  };

  const addToRecentlyViewed = (colorId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== colorId);
      return [colorId, ...filtered].slice(0, 4); // Keep top 4 recent
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      recentlyViewed,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleWishlist,
      isInWishlist,
      addToRecentlyViewed,
      clearCart
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
