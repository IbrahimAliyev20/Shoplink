import { get, post } from "@/lib/api";
import { ApiResponse, Promocode } from "@/types";



export const getPromocode = async () => {
  const response = await get<{ data: Promocode[] }>("user/promocodes");
  return response.data;
};

export const createPromocode = async (formData: FormData) => {
  const response = await post<{ data: Promocode }>("user/promocode-store", formData);
  return response.data;
};

export const updatePromocode = async (formData: FormData) => {
  const promoCodeId = formData.get('id');
  if (!promoCodeId) {
    throw new Error("Promo code ID is missing in FormData for update.");
  }
  const response = await post<{ data: Promocode }>(`user/promocode/update/${promoCodeId}`, formData);
  return response.data;
};

export const deletePromocode = async (id: number) => {
  const response = await post<{ data: Promocode }>(`user/promocode/delete/${id}`);
  return response.data;
};

export const ChangePromocodeStatus = async (formData: FormData) => {
  const statusId = formData.get('id');
  if (!statusId) {
    throw new Error("Promo code ID is missing in FormData for status change.");
  }
  const response = await post<{ data: Promocode }>(`user/promocode/status/${statusId}`);
  return response.data;
};



interface CheckPromoPayload {
  promocode: string;
  products: number[]; 
}

interface CheckPromoResponse {
  promocode_price: number; 
  product_price: number;   
}

export const checkPromocode = async (payload: CheckPromoPayload) => {
    const response = await post<ApiResponse<CheckPromoResponse>>("/user/promocode-check", payload);
    if (!response.data || !response.status) {
        throw new Error("Promokod etibarsızdır və ya xəta baş verdi");
    }
    return response.data;
};