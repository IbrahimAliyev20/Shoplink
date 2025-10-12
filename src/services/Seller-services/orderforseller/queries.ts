import { useQuery } from "@tanstack/react-query";
import { getStoreOrders, getStoreOrder } from "./api";
import { queryKeys, createQueryOptions } from "@/lib/query-config";

const getStoreOrdersOptions = () => {
  return createQueryOptions(
    queryKeys.orders.storeOrders(),
    getStoreOrders,
    {
      staleTime: 1 * 60 * 1000, // 1 minute for order lists
    }
  );
};

const getStoreOrderOptions = (id: string) => {
  return createQueryOptions(
    queryKeys.orders.byId(id),
    () => getStoreOrder(id),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes for individual orders
    }
  );
};

const useStoreOrdersQuery = () => {
  return useQuery(getStoreOrdersOptions());
};

const useStoreOrderQuery = (id: string) => {
  return useQuery(getStoreOrderOptions(id));
};


export { useStoreOrdersQuery, useStoreOrderQuery, getStoreOrdersOptions, getStoreOrderOptions };
