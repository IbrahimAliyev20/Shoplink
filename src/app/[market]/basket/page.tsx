"use client";

import React, { useState } from "react";
import {
  mockCartItems,
  calculateCartSummary,
  CartItem as CartItemType,
} from "@/components/market/data/cart";
import CartItem from "@/components/market/components/cart/CartItem";
import CartSummary from "@/components/market/components/cart/CartSummary";




function Basket() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(mockCartItems);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCompleteOrder = () => {
    console.log("Sifariş tamamlandı:", cartItems);
  };

  const summary = calculateCartSummary(cartItems);

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Alışveriş səbətiniz
          </h1>
          <p className="text-gray-600">{cartItems.length} məhsul</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Səbətiniz boşdur
                </h3>
                <p className="text-gray-500 mb-6">
                  Məhsul əlavə etmək üçün mağazaya keçin
                </p>
                <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors">
                  Mağazaya keç
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <CartSummary
                summary={summary}
                onCompleteOrder={handleCompleteOrder}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Basket;
