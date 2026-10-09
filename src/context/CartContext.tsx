import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, Size } from '../types';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: Size, color?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  freeShippingThreshold: number;
  total: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  promoCode: string | null;
  discountPercentage: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'nocaps_streetwear_cart_v1';
const WISHLIST_STORAGE_KEY = 'nocaps_streetwear_wishlist_v1';
const FREE_SHIPPING_THRESHOLD = 2999;
const STANDARD_SHIPPING_FEE = 250;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist from localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [toast, setToast] = useState<Toast | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3800);
  };

  const addToCart = (product: Product, size: Size, color?: string, quantity: number = 1) => {
    const chosenColor = color || product.color;
    const itemId = `${product.id}-${size}-${chosenColor}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            size,
            color: chosenColor,
            quantity,
          },
        ];
      }
    });

    showToast(`Added ${product.name} (Size ${size}) to bag`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
    setDiscountPercentage(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from archive wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your archive wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromo = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'NOCAPS10' || cleanCode === 'VOID10') {
      setPromoCode('NOCAPS10');
      setDiscountPercentage(10);
      showToast('10% VIP Archive discount applied!', 'success');
      return { success: true, message: 'NOCAPS10 applied: 10% off your total' };
    } else if (cleanCode === 'DROP20') {
      setPromoCode('DROP20');
      setDiscountPercentage(20);
      showToast('20% Drop 04 launch discount applied!', 'success');
      return { success: true, message: 'DROP20 applied: 20% off your total' };
    } else if (cleanCode === 'HEAVY300') {
      setPromoCode('HEAVY300');
      setDiscountPercentage(15);
      showToast('15% Heavyweight Cotton perk applied!', 'success');
      return { success: true, message: 'HEAVY300 applied: 15% off' };
    } else {
      showToast('Invalid promo code. Try NOCAPS10 or DROP20', 'error');
      return { success: false, message: 'Invalid or expired code. Try NOCAPS10 or DROP20' };
    }
  };

  const removePromo = () => {
    setPromoCode(null);
    setDiscountPercentage(0);
    showToast('Discount code removed', 'info');
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const shippingAmount = cart.length === 0 ? 0 : discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = discountedSubtotal + shippingAmount;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discountAmount,
        shippingAmount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        total,
        totalItems,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        discountPercentage,
        applyPromo,
        removePromo,
        wishlist,
        toggleWishlist,
        isInWishlist,
        toast,
        showToast,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
