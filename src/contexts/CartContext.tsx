"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { CartItem, calculateCartSummary } from "@/components/market/data/cart"; 
import { checkPromocode } from "@/services/Promocode/api";
import { Product } from "@/types/product/productTypes"; 

interface CartContextType {
  cartItems: CartItem[];
  appliedPromocode: { name: string, discount: number } | null;
  promocodeDiscount: number;
  isApplyingPromo: boolean;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, change: number) => void;
  clearCart: () => void;
  applyPromocode: (code: string) => void;
  removePromocode: () => void;
  getCartSummary: () => ReturnType<typeof calculateCartSummary>;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedPromocode, setAppliedPromocode] = useState<{ name: string, discount: number } | null>(null);
  const [promocodeDiscount, setPromocodeDiscount] = useState<number>(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("shoplink-cart");
    if (savedCart) {
        try {
            setCartItems(JSON.parse(savedCart));
        } catch (e) {
            console.error("Failed to parse cart from localStorage", e);
        }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoplink-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const { mutate: checkPromo, isPending: isApplyingPromo } = useMutation({
    mutationFn: checkPromocode,
    onSuccess: (data, variables) => {
      const discount = data.product_price - data.promocode_price;
      setPromocodeDiscount(discount);
      setAppliedPromocode({ name: variables.promocode, discount: discount });
      toast.success("Promokod uğurla tətbiq edildi!");
    },
    onError: (error) => {
      toast.error(error.message || "Bu promokod etibarsızdır");
    },
  });

  const applyPromocode = (code: string) => {
    if (cartItems.length === 0) {
      toast.error("Promokod tətbiq etmək üçün səbətinizdə məhsul olmalıdır.");
      return;
    }
    const productIds = cartItems.map(item => item.id);
    checkPromo({ promocode: code, products: productIds });
  };
  
  const removePromocode = () => {
    setAppliedPromocode(null);
    setPromocodeDiscount(0);
  };
  
  const addToCart = (product: Product, quantity: number = 1) => {
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
          price: parseFloat(product.detail.discount_price || product.detail.sales_price),
          quantity,
          image: product.thumb_image || "/placeholder.png",
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
    removePromocode();
  };

  const getCartSummary = () => calculateCartSummary(cartItems, promocodeDiscount);
  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const value: CartContextType = {
    cartItems,
    appliedPromocode,
    promocodeDiscount,
    isApplyingPromo,
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