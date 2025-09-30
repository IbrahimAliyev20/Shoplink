import { useQuery, queryOptions } from "@tanstack/react-query";
import { getStoreOrders, getStoreOrder } from "./api";

const getStoreOrdersOptions = () => {
  return queryOptions({
    queryKey: ["store-orders"],
    queryFn: getStoreOrders,
  });
};

const getStoreOrderOptions = (id: string) => {
  return queryOptions({
    queryKey: ["store-order", id],
    queryFn: () => getStoreOrder(id),
  });
};

const useStoreOrdersQuery = () => {
  return useQuery(getStoreOrdersOptions());
};

const useStoreOrderQuery = (id: string) => {
  return useQuery(getStoreOrderOptions(id));
};


export { useStoreOrdersQuery, useStoreOrderQuery, getStoreOrdersOptions, getStoreOrderOptions };
