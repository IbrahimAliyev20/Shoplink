"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, calculateCartSummary } from "@/components/market/data/cart";
import { Promocode } from "@/types";
import { validatePromocode, calculatePromocodeDiscount } from "@/services/Promocode/validation";

interface CartContextType {
  cartItems: CartItem[];
  appliedPromocode: Promocode | null;
  promocodeDiscount: number;
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

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedPromocode, setAppliedPromocode] = useState<Promocode | null>(null);
  const [promocodeDiscount, setPromocodeDiscount] = useState<number>(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("shoplink-cart");
    const savedPromocode = localStorage.getItem("shoplink-promocode");
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
    
    if (savedPromocode) {
      try {
        const { promocode, discount } = JSON.parse(savedPromocode);
        setAppliedPromocode(promocode);
        setPromocodeDiscount(discount);
      } catch (error) {
        console.error("Error loading promocode from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoplink-cart", JSON.stringify(cartItems));
    
    if (appliedPromocode && cartItems.length > 0) {
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newDiscount = calculatePromocodeDiscount(subtotal, appliedPromocode);
      setPromocodeDiscount(newDiscount);
    }
  }, [cartItems, appliedPromocode]);

  useEffect(() => {
    if (appliedPromocode) {
      localStorage.setItem("shoplink-promocode", JSON.stringify({
        promocode: appliedPromocode,
        discount: promocodeDiscount
      }));
    } else {
      localStorage.removeItem("shoplink-promocode");
    }
  }, [appliedPromocode, promocodeDiscount]);

  const addToCart = (product: any, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
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
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromocode(null);
    setPromocodeDiscount(0);
  };

  const applyPromocode = async (code: string, marketSlug: string) => {
    try {
      const result = await validatePromocode(code, marketSlug);
      
      if (result.valid && result.promocode) {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = calculatePromocodeDiscount(subtotal, result.promocode);
        
        setAppliedPromocode(result.promocode);
        setPromocodeDiscount(discount);
        
        return { success: true };
      } else {
        return { success: false, error: result.error || "Promokod etibarsızdır" };
      }
    } catch (error) {
      return { success: false, error: "Promokod yoxlanılarkən xəta baş verdi" };
    }
  };

  const removePromocode = () => {
    setAppliedPromocode(null);
    setPromocodeDiscount(0);
  };

  const getCartSummary = () => {
    return calculateCartSummary(cartItems, promocodeDiscount);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    appliedPromocode,
    promocodeDiscount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromocode,
    removePromocode,
    getCartSummary,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
