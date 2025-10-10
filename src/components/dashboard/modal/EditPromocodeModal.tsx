"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePromocodeMutation } from "@/services/Promocode/mutations";
import { toast } from "sonner";
import getPromocodeOptions from "@/services/Promocode/queries";

import { Promocode } from "@/types";

interface EditPromocodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  promocode?: Promocode | null;
}

function EditPromocodeModal({
  isOpen,
  onClose,
  promocode,
}: EditPromocodeModalProps) {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (promocode) {
      setPromoCode(promocode.name);
      setDiscountPercent(promocode.discount.toString());
    }
  }, [promocode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const { mutate: updatePromocode, isPending } = useMutation({
    ...updatePromocodeMutation(),
    onSuccess: () => {
      toast.success("Promo kod uğurla yeniləndi");
      queryClient.invalidateQueries({
        queryKey: getPromocodeOptions().queryKey,
      });
      onClose();
    },
    onError: () => {
      toast.error("Promo kod yenilənərkən xəta baş verdi");
    },
  });

  const handleSave = () => {
    if (!promocode) return;

    if (!promoCode.trim()) {
      toast.error("Promo kod adı daxil edin");
      return;
    }

    if (!discountPercent.trim()) {
      toast.error("Endirim faizi daxil edin");
      return;
    }

    const formData = new FormData();
    formData.append("id", promocode.id.toString());
    formData.append("name", promoCode);
    formData.append("discount", discountPercent);

    updatePromocode(formData);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Promokodu tənzimlə</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promokod adı
            </label>
            <Input
              type="text"
              placeholder="Promokod adı"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full py-5.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endirim faizi
            </label>
            <Input
              type="text"
              placeholder="Endirim faizi"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className="w-full py-5.5"
            />
          </div>
        </div>

        <div className="grid  grid-cols-2 gap-4 mt-6">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Ləğv et
          </Button>
          <Button
            className="bg-[#E23359] hover:bg-[#E23359]/90 text-white disabled:opacity-50"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Yadda saxlanır..." : "Yadda saxla"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditPromocodeModal;
