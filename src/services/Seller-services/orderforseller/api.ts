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

const changeStoreOrderStatus = async (formData: FormData) => {
    const productId = formData.get('id');
    if (!productId) {
        throw new Error("Order ID is missing in FormData for update.");
    }
    const response = await post<ApiResponse<StoreOrder>>(`user/store-order/status/${productId}`, formData);
    return response.data;
};



export { getStoreOrders, getStoreOrder, changeStoreOrderStatus };