"use client";

import React, { useState } from "react";
import { CartSummary as CartSummaryType } from "@/components/market/data/cart"; // Düzgün yolu qeyd edin
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface CartSummaryProps {
  summary: CartSummaryType;
  onCompleteOrder: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ summary, onCompleteOrder }) => {
  const { appliedPromocode, applyPromocode, removePromocode, isApplyingPromo } = useCart();
  const [promocodeInput, setPromocodeInput] = useState("");

  const handleApplyPromocode = () => {
    if (!promocodeInput.trim()) {
      toast.error("Zəhmət olmasa promokod daxil edin");
      return;
    }
    applyPromocode(promocodeInput.trim());
    setPromocodeInput("");
  };

  const handleRemovePromocode = () => {
    removePromocode();
    toast.info("Promokod silindi");
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-6">
      <div className="space-y-4 mb-6">
        
        {!appliedPromocode ? (
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-700">Promokod</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Promo kodu yazın"
                value={promocodeInput}
                onChange={(e) => setPromocodeInput(e.target.value)}
                className="w-full h-10 px-4 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                disabled={isApplyingPromo}
                onKeyPress={(e) => { if (e.key === 'Enter') handleApplyPromocode() }}
              />
              <button
                onClick={handleApplyPromocode}
                disabled={isApplyingPromo || !promocodeInput.trim()}
                className="absolute right-1 top-1 h-8 px-3  text-[#E23359] text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApplyingPromo ? "Yoxlanılır..." : "Tətbiq et"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Tətbiq edilmiş promokod</span>
              <Button onClick={handleRemovePromocode} variant="ghost" size="sm" className="h-6 px-2 text-red-500 hover:text-red-600 hover:bg-red-50">Sil</Button>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-green-800 font-medium">{appliedPromocode.name}</span>
                {summary.promocodeDiscount > 0 && <span className="text-green-600 text-sm">-{summary.promocodeDiscount} AZN endirim</span>}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center"><span className="text-gray-600">Qiymət</span><span className="font-medium text-gray-900">{summary.total} AZN</span></div>
        
        {summary.promocodeDiscount > 0 && (
          <div className="flex justify-between items-center"><span className="text-green-600">Promokod endirimi</span><span className="font-medium text-green-600">-{summary.promocodeDiscount} AZN</span></div>
        )}

        <div className="border-t border-[#F3F2F8] pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Toplam</span>
            <span className="text-xl font-medium text-gray-900">{summary.total} AZN</span>
          </div>
        </div>
      </div>
      <button
        onClick={onCompleteOrder}
        className="w-full bg-[#E23359] text-white py-2 rounded-xl font-semibold text-lg hover:bg-[#E23359]/90 transition-colors cursor-pointer"
      >
        Sifarişi tamamla
      </button>
    </div>
  );
};

export default CartSummary;