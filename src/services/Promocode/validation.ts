import { get } from "@/lib/api";
import { Promocode } from "@/types";

export interface PromocodeValidationResponse {
  valid: boolean;
  promocode?: Promocode;
  error?: string;
}

export const validatePromocode = async (
  code: string,
  marketSlug: string

): Promise<PromocodeValidationResponse> => {
  console.log(marketSlug);
  try {
    const response = await get<{ data: Promocode[] }>("user/promocodes");
    
    const promocodes = response.data;
    const matchingPromocode = promocodes.find(
      (promo) => promo.name.toLowerCase() === code.toLowerCase()
    );

    if (matchingPromocode) {
      return {
        valid: true,
        promocode: matchingPromocode,
      };
    } else {
      return {
        valid: false,
        error: "Promokod tapılmadı və ya etibarsızdır",
      };
    }
  } catch (error) {
    console.error("Promocode validation error:", error);
    return {
      valid: false,
      error: "Promokod yoxlanılarkən xəta baş verdi",
    };
  }
};

export const calculatePromocodeDiscount = (
  subtotal: number,
  promocode: Promocode
): number => {
  return Math.round((subtotal * promocode.discount) / 100);
};