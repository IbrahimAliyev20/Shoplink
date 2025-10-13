import { get, post } from "@/lib/api";
import { ApiResponse, StoreOrder, OrderPayload } from "@/types";


export const getUserOrder = async () => {
  const response = await get<ApiResponse<StoreOrder[]>>(`/user/user-orders`);
  return response.data;
};


export const getSingleUserOrder = async (orderId: string) => {
  const response = await get<ApiResponse<StoreOrder>>(`/user/order/show/${orderId}`);
  return response.data;
};


export const createOrder = async (orderPayload: OrderPayload) => {
  const response = await post<ApiResponse<null>>(`/api/order`, orderPayload);
  return response;
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
