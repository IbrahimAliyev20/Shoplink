"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

interface OrderSummarySectionProps {
  marketSlug: string;
}

function OrderSummarySection({ marketSlug }: OrderSummarySectionProps) {
  const { cartItems, getCartSummary, appliedPromocode } = useCart();
  const summary = getCartSummary();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {marketSlug}
      </h3>
      <p className="text-gray-600 mb-6">{cartItems.length} məhsul</p>
      
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.name}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {item.quantity} ədəd
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {item.price * item.quantity} AZN
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {appliedPromocode && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              Tətbiq edilmiş promokod: {appliedPromocode.name}
            </span>
          </div>
        </div>
      )}
      
      <div className="border-t border-[#F3F2F8] pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Qiymət</span>
          <span className="font-medium text-gray-900">
            {summary.subtotal} AZN
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Çatdırılma</span>
          <span className="font-medium text-gray-900">
            {summary.delivery === 0
              ? "Pulsuz"
              : `${summary.delivery} AZN`}
          </span>
        </div>
        {summary.promocodeDiscount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-green-600">Promokod endirimi</span>
            <span className="font-medium text-green-600">
              -{summary.promocodeDiscount} AZN
            </span>
          </div>
        )}
        <div className="border-t border-[#F3F2F8] pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">
              Toplam
            </span>
            <span className="text-xl font-medium text-gray-900">
              {summary.total} AZN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummarySection;
