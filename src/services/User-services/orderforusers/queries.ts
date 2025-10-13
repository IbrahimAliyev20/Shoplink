import { getSingleUserOrder, getUserOrder } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

const getUserOrderQuery  = () => {
  return createQueryOptions(
    queryKeys.orders.userOrders(),
    () => getUserOrder(),
    {
      staleTime: 1 * 60 * 1000, 
    }
  );
};

const getSingleUserOrderQuery = (orderId: string) => {
  return createQueryOptions(
    queryKeys.orders.byId(orderId),
    () => getSingleUserOrder(orderId),
    {
      staleTime: 5 * 60 * 1000,
    }
  );
};

export { getUserOrderQuery, getSingleUserOrderQuery };
