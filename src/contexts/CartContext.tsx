"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { CartItem, calculateCartSummary } from "@/components/market/data/cart";
import { Product } from "@/types/product/productTypes";
import { checkPromocode } from "@/services/User-services/orderforusers/api";

interface CartContextType {
  cartItems: CartItem[];
  appliedPromocode: { name: string; discount?: number } | null;
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

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedPromocode, setAppliedPromocode] = useState<{
    name: string;
    discount?: number;
  } | null>(null);
  const [promocodeDiscount, setPromocodeDiscount] = useState<number>(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("shoplink-cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      const migratedCart = parsedCart.map((item: CartItem) => ({
        ...item,
        stock: item.stock || 999,
      }));
      setCartItems(migratedCart);
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
      setAppliedPromocode({ name: variables.promocode });
      toast.success("Promokod uğurla tətbiq edildi!");
    },
    onError: (error) => {
      toast.error(error.message || "Bu promokod etibarsızdır");
    },
  });

  const applyPromocode = (code: string) => {
    if (cartItems.length === 0) {
      toast.error("Səbətinizdə məhsul olmalıdır.");
      return;
    }
    const productIds = cartItems.map((item) => item.id);
    checkPromo({ promocode: code, products: productIds });
  };

  const removePromocode = () => {
    setAppliedPromocode(null);
    setPromocodeDiscount(0);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const productStock = product.detail.stock || 0;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        const newTotalQuantity = existingItem.quantity + quantity;
        if (newTotalQuantity > productStock) {
          toast.error(
            `Maksimum ${productStock} ədəd əlavə edə bilərsiniz. Səbətdə ${existingItem.quantity} ədəd var.`
          );
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newTotalQuantity }
            : item
        );
      } else {
        if (quantity > productStock) {
          toast.error(`Maksimum ${productStock} ədəd əlavə edə bilərsiniz.`);
          return prev;
        }
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: parseFloat(product.detail.sales_price || "0"),
          quantity,
          image: product.thumb_image || "/placeholder.png",
          stock: productStock,
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (id: number) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity > item.stock) {
            toast.error(`Maksimum ${item.stock} ədəd əlavə edə bilərsiniz.`);
            return item;
          }
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    removePromocode();
  };

  const getCartSummary = () =>
    calculateCartSummary(cartItems, promocodeDiscount);
  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

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
