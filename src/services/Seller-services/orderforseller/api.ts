import { get } from "@/lib/api";
import { StoreOrder } from "@/types/";


const getStoreOrders = async () => {
    const response = await get<{ data: StoreOrder[] }>("user/store-orders");
    return response.data;
};

export default getStoreOrders;