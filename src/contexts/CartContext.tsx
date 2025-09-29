"use client";

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback, 
  useMemo 
} from "react";

import { CartItem, calculateCartSummary } from "@/components/market/data/cart";
import { Promocode } from "@/types";
import { validatePromocode, calculatePromocodeDiscount } from "@/services/Promocode/validation";


const STORAGE_KEYS = {
  CART: "shoplink-cart",
  PROMOCODE: "shoplink-promocode"
} as const;

interface CartContextType {
  cartItems: CartItem[];
  appliedPromocode: Promocode | null;
  promocodeDiscount: number;
  isHydrated: boolean; // Next.js için önemli
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, change: number) => void;
  clearCart: () => void;
  applyPromocode: (code: string, marketSlug: string) => Promise<{ success: boolean; error?: string }>;
  removePromocode: () => void;
  getCartSummary: () => ReturnType<typeof calculateCartSummary>;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Safe localStorage operations for Next.js
const isClient = typeof window !== "undefined";

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (!isClient) return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = <T,>(key: string, value: T): void => {
  if (!isClient) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const removeFromStorage = (key: string): void => {
  if (!isClient) return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedPromocode, setAppliedPromocode] = useState<Promocode | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration-safe initialization
  useEffect(() => {
    if (!isClient) return;

    const savedCart = loadFromStorage(STORAGE_KEYS.CART, []);
    const savedPromocodeData = loadFromStorage<{promocode: Promocode; discount: number} | null>(STORAGE_KEYS.PROMOCODE, null);
    
    setCartItems(savedCart);
    
    if (savedPromocodeData?.promocode) {
      setAppliedPromocode(savedPromocodeData.promocode);
    }
    
    setIsHydrated(true);
  }, []);

  // Memoized calculations
  const subtotal = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    [cartItems]
  );

  const promocodeDiscount = useMemo(() => {
    if (!appliedPromocode || cartItems.length === 0) return 0;
    return calculatePromocodeDiscount(subtotal, appliedPromocode);
  }, [appliedPromocode, subtotal, cartItems.length]);

  useEffect(() => {
    if (!isHydrated) return;
    saveToStorage(STORAGE_KEYS.CART, cartItems);
  }, [cartItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    
    if (appliedPromocode) {
      saveToStorage(STORAGE_KEYS.PROMOCODE, {
        promocode: appliedPromocode,
        discount: promocodeDiscount
      });
    } else {
      removeFromStorage(STORAGE_KEYS.PROMOCODE);
    }
  }, [appliedPromocode, promocodeDiscount, isHydrated]);

  const addToCart = useCallback((product: any, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.detail.discount_price || product.detail.sales_price,
        quantity,
        image: product.images[0]?.image || "/marketimg/sport.png",
        size: product.selectedSize,
        color: product.selectedColor,
      };
      
      return [...prev, newItem];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedPromocode(null);
  }, []);

  const applyPromocode = useCallback(async (code: string, marketSlug: string) => {
    try {
      const result = await validatePromocode(code, marketSlug);
      
      if (result.valid && result.promocode) {
        setAppliedPromocode(result.promocode);
        return { success: true };
      }
      
      return { 
        success: false, 
        error: result.error || "Promokod etibarsızdır" 
      };
    } catch (error) {
      console.error("Promocode validation error:", error);
      return { 
        success: false, 
        error: "Promokod yoxlanılarkən xəta baş verdi" 
      };
    }
  }, []);

  const removePromocode = useCallback(() => {
    setAppliedPromocode(null);
  }, []);

  const getCartSummary = useCallback(() => {
    return calculateCartSummary(cartItems, promocodeDiscount);
  }, [cartItems, promocodeDiscount]);

  const getCartCount = useCallback(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const value: CartContextType = useMemo(() => ({
    cartItems,
    appliedPromocode,
    promocodeDiscount,
    isHydrated,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromocode,
    removePromocode,
    getCartSummary,
    getCartCount,
  }), [
    cartItems,
    appliedPromocode,
    promocodeDiscount,
    isHydrated,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromocode,
    removePromocode,
    getCartSummary,
    getCartCount,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};