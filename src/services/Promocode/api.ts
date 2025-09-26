import { get, post, } from "@/lib/api";
import { Promocode } from "@/types";

export const getPromocode = async () => {
    const response = await get<{ data: Promocode[] }>("user/promocodes" );
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
