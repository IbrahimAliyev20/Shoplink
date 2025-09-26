"use client";

import React from "react";
import { CartSummary as CartSummaryType } from "../../data/cart";
import Link from "next/link";


interface CartSummaryProps {
  summary: CartSummaryType;
  onCompleteOrder: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  summary,
  onCompleteOrder,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-6 max-md:p-4 max-md:rounded-xl max-md:static max-md:mt-6">
  

      <div className="space-y-4 mb-6 max-md:space-y-3 max-md:mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 max-md:text-sm">Qiymət</span>
          <span className="font-medium text-gray-900 max-md:text-sm">
            {summary.subtotal} AZN
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 max-md:text-sm">Çatdırılma</span>
          <span className="font-medium text-gray-900 max-md:text-sm">
            {summary.delivery === 0 ? "Pulsuz" : `${summary.delivery} AZN`}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4 max-md:pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-mediun text-gray-900 max-md:text-base">Toplam</span>
            <span className="text-xl font-medium text-gray-900 max-md:text-lg">
              {summary.total} AZN
            </span>
          </div>
        </div>
      </div>
    <Link href="/market/basket/confirm" className="w-full">
      <button
        onClick={onCompleteOrder}
        className="w-full bg-[#FF13F0] text-white py-2 rounded-xl font-semibold text-lg hover:bg-pink-500 transition-colors cursor-pointer max-md:py-3 max-md:text-base max-md:rounded-lg"
      >
        Sifarişi tamamla
      </button>
    </Link>
    </div>
  );
};

export default CartSummary;
