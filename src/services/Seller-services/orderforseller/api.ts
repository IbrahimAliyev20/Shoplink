import { get, post } from "@/lib/api";
import { ApiResponse, StoreOrder } from "@/types/";


const getStoreOrders = async () => {
    const response = await get<{ data: StoreOrder[] }>("user/store-orders");
    return response.data;
};

const getStoreOrder = async (id: string) => {
    const response = await get<{ data: StoreOrder }>(`user/store-order/show/${id}`);
    return response.data;
};

const changeStoreOrderStatus = async ({ id, status }: { id: string; status: number }) => {
    const formData = new FormData();
    formData.append('status', String(status));
  
    const response = await post<ApiResponse<StoreOrder>>(`user/store-order/status/${id}`, formData);
    return response.data;
  };



export { getStoreOrders, getStoreOrder, changeStoreOrderStatus };