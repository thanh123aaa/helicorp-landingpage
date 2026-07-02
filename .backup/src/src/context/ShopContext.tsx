import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // combination of color + size
  name: string;
  color: string;
  colorName: string;
  size: number;
  price: number;
  quantity: number;
  image: string;
}

export interface WishlistItem {
  id: string; // combination of color + size
  name: string;
  color: string;
  colorName: string;
  size: number;
  price: number;
  image: string;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  image: string;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  recentlyViewed: string[]; // array of color IDs
  addToCart: (colorId: string, size: number, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  toggleWishlist: (colorId: string, size: number) => void;
  isInWishlist: (colorId: string, size: number) => boolean;
  addToRecentlyViewed: (colorId: string) => void;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const productColors: ProductColor[] = [
  { id: 'black', name: 'Titanium Black', hex: '#1E1E1E', image: '/assets/ring-black.webp' },
  { id: 'silver', name: 'Stellar Silver', hex: '#D2D2D2', image: '/assets/ring-silver.webp' },
  { id: 'gold', name: 'Royal Gold', hex: '#E5C158', image: '/assets/ring-gold.webp' },
  { id: 'rose', name: 'Rose Quartz', hex: '#E2B1B1', image: '/assets/ring-rose.webp' },
];

export const PRODUCT_NAME = 'HelioRing Gen 3';
export const PRODUCT_PRICE = 6990000; // 6,990,000 VND
export const PRODUCT_ORIGINAL_PRICE = 8500000; // 8,500,000 VND

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('helioring_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('helioring_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('helioring_recent');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('helioring_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('helioring_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('helioring_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToCart = (colorId: string, size: number, quantity: number) => {
    const colorObj = productColors.find(c => c.id === colorId) || productColors[0];
    const itemId = `${colorId}-${size}`;

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
        image: colorObj.image
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

  const toggleWishlist = (colorId: string, size: number) => {
    const colorObj = productColors.find(c => c.id === colorId) || productColors[0];
    const itemId = `${colorId}-${size}`;

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
        image: colorObj.image
      }];
    });
  };

  const isInWishlist = (colorId: string, size: number) => {
    const itemId = `${colorId}-${size}`;
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
