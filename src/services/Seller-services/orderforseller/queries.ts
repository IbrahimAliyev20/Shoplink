import { useQuery } from "@tanstack/react-query";
import { getStoreOrders, getStoreOrder } from "./api";
import { queryKeys, createQueryOptions, realtimeContentOptions, dynamicContentOptions } from "@/lib/query-config";

const getStoreOrdersOptions = () => {
  return createQueryOptions(
    queryKeys.orders.storeOrders(),
    getStoreOrders,
    realtimeContentOptions // Using optimized config for real-time order data
  );
};

const getStoreOrderOptions = (id: string) => {
  return createQueryOptions(
    queryKeys.orders.byId(id),
    () => getStoreOrder(id),
    dynamicContentOptions // Using optimized config for individual order details
  );
};

const useStoreOrdersQuery = () => {
  return useQuery(getStoreOrdersOptions());
};

const useStoreOrderQuery = (id: string) => {
  return useQuery(getStoreOrderOptions(id));
};


export { useStoreOrdersQuery, useStoreOrderQuery, getStoreOrdersOptions, getStoreOrderOptions };
