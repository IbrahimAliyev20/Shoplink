"use client";

import React, { useState } from "react";
import { CartSummary as CartSummaryType } from "../../data/cart";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface CartSummaryProps {
  summary: CartSummaryType;
  onCompleteOrder: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  summary,
  onCompleteOrder,
}) => {
  const params = useParams();
  const marketSlug = params.market as string;
  const { appliedPromocode, applyPromocode, removePromocode } = useCart();
  
  const [promocodeInput, setPromocodeInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyPromocode = async () => {
    if (!promocodeInput.trim()) {
      toast.error("Zəhmət olmasa promokod daxil edin");
      return;
    }

    setIsApplying(true);
    try {
      const result = await applyPromocode(promocodeInput.trim(), marketSlug);
      
      if (result.success) {
        toast.success("Promokod uğurla tətbiq edildi!");
        setPromocodeInput("");
      } else {
        toast.error(result.error || "Promokod etibarsızdır");
      }
    } catch (error) {
      toast.error("Promokod tətbiq edilərkən xəta baş verdi");
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemovePromocode = () => {
    removePromocode();
    toast.success("Promokod silindi");
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-6 max-md:p-4 max-md:rounded-xl max-md:static max-md:mt-6">
      <div className="space-y-4 mb-6 max-md:space-y-3 max-md:mb-4">
        
        {!appliedPromocode ? (
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-700">Promokod</span>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Promo kodu yazın"
                value={promocodeInput}
                onChange={(e) => setPromocodeInput(e.target.value)}
                className="flex-1 h-10 rounded-lg"
                disabled={isApplying}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleApplyPromocode();
                  }
                }}
              />
              <Button
                onClick={handleApplyPromocode}
                disabled={isApplying || !promocodeInput.trim()}
                className="h-10 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
              >
                {isApplying ? "..." : "Tətbiq et"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Tətbiq edilmiş promokod</span>
              <Button
                onClick={handleRemovePromocode}
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Sil
              </Button>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-green-800 font-medium">{appliedPromocode.name}</span>
                <span className="text-green-600 text-sm">{appliedPromocode.discount}% endirim</span>
              </div>
            </div>
          </div>
        )}
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

        {summary.promocodeDiscount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-green-600 max-md:text-sm">Promokod endirimi</span>
            <span className="font-medium text-green-600 max-md:text-sm">
              -{summary.promocodeDiscount} AZN
            </span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 max-md:pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900 max-md:text-base">
              Toplam
            </span>
            <span className="text-xl font-medium text-gray-900 max-md:text-lg">
              {summary.total} AZN
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onCompleteOrder}
        className="w-full bg-[#FF13F0] text-white py-2 rounded-xl font-semibold text-lg hover:bg-pink-500 transition-colors cursor-pointer max-md:py-3 max-md:text-base max-md:rounded-lg"
      >
        Sifarişi tamamla
      </button>
    </div>
  );
};

export default CartSummary;
