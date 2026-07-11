"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, DEFAULT_PRODUCTS, WornOutfit } from '../data/products';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  wornOutfit: WornOutfit;
  cursorType: 'default' | 'hovered' | 'click';
  setCursorType: (type: 'default' | 'hovered' | 'click') => void;
  addToCart: (product: Product, size: string, qty?: number) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateCartQuantity: (productId: number, size: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  wearProduct: (product: Product) => void;
  removeFromOutfit: (slot: keyof WornOutfit) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  orders: any[];
  addOrder: (order: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [wornOutfit, setWornOutfit] = useState<WornOutfit>({
    top: null,
    bottom: null,
    outer: null,
    shoes: null,
  });
  const [cursorType, setCursorTypeState] = useState<'default' | 'hovered' | 'click'>('default');
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('arc_opus_cart');
    const savedWishlist = localStorage.getItem('arc_opus_wishlist');
    const savedOrders = localStorage.getItem('arc_opus_orders');
    const savedOutfit = localStorage.getItem('arc_opus_outfit');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    
    if (savedOutfit) {
      setWornOutfit(JSON.parse(savedOutfit));
    } else {
      // Default initial outfit
      const defaultTop = DEFAULT_PRODUCTS.find(p => p.id === 1) || null;
      const defaultBottom = DEFAULT_PRODUCTS.find(p => p.id === 40) || null;
      const defaultShoes = DEFAULT_PRODUCTS.find(p => p.id === 50) || null;
      setWornOutfit({
        top: defaultTop,
        bottom: defaultBottom,
        outer: null,
        shoes: defaultShoes,
      });
    }
  }, []);

  // Save states to localStorage when they change
  useEffect(() => {
    if (cart.length > 0) localStorage.setItem('arc_opus_cart', JSON.stringify(cart));
    else localStorage.removeItem('arc_opus_cart');
  }, [cart]);

  useEffect(() => {
    if (wishlist.length > 0) localStorage.setItem('arc_opus_wishlist', JSON.stringify(wishlist));
    else localStorage.removeItem('arc_opus_wishlist');
  }, [wishlist]);

  useEffect(() => {
    if (orders.length > 0) localStorage.setItem('arc_opus_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('arc_opus_outfit', JSON.stringify(wornOutfit));
  }, [wornOutfit]);

  const setCursorType = (type: 'default' | 'hovered' | 'click') => {
    setCursorTypeState(type);
  };

  const addToCart = (product: Product, size: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, size, quantity: qty }];
    });
    setCartOpen(true); // Auto-open cart
  };

  const removeFromCart = (productId: number, size: string) => {
    setCart((prev) => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateCartQuantity = (productId: number, size: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('arc_opus_cart');
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const wearProduct = (product: Product) => {
    setWornOutfit((prev) => {
      const next = { ...prev };
      const cat = product.category;
      
      if (cat === 't-shirts') {
        next.top = product;
      } else if (cat === 'bottoms') {
        next.bottom = product;
      } else if (cat === 'jackets') {
        next.outer = product;
      } else if (cat === 'shoes') {
        next.shoes = product;
      } else if (cat === 'collections' || cat === 'new drop') {
        // Infer slot based on subcat or name
        const name = product.name.toLowerCase();
        if (name.includes('pants') || name.includes('jeans') || name.includes('trousers') || name.includes('chinos')) {
          next.bottom = product;
        } else if (name.includes('jacket') || name.includes('bomber') || name.includes('puffer') || name.includes('fleece') || name.includes('shacket') || name.includes('flannel')) {
          next.outer = product;
        } else if (name.includes('sneakers') || name.includes('boots') || name.includes('shoes')) {
          next.shoes = product;
        } else {
          next.top = product;
        }
      }
      return next;
    });
  };

  const removeFromOutfit = (slot: keyof WornOutfit) => {
    setWornOutfit((prev) => ({
      ...prev,
      [slot]: null,
    }));
  };

  const addOrder = (order: any) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        wornOutfit,
        cursorType,
        setCursorType,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        wearProduct,
        removeFromOutfit,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
        checkoutOpen,
        setCheckoutOpen,
        authModalOpen,
        setAuthModalOpen,
        orders,
        addOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
