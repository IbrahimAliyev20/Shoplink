import { get, post } from "@/lib/api";
import { ApiResponse, StoreOrder } from "@/types";


export const getUserOrder = async () => {
  const response = await get<ApiResponse<StoreOrder[]>>(`/user/user-orders`);
  return response.data;

};

export const getSingleUserOrder = async (orderId: string) => {
  const response = await get<ApiResponse<StoreOrder>>(`/user/order/show/${orderId}`);
  return response.data;
};



export const OrderForUsers = async () => {
  const response = await post<ApiResponse<StoreOrder>>(`/user/api/order`);
  return response;
};
