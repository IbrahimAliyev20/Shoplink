import { useQuery } from "@tanstack/react-query";
import getStoreOrders from "./api";

const useStoreOrdersQuery = () => {
  return useQuery({
    queryKey: ["store-orders"],
    queryFn: getStoreOrders,
  });
};

export default useStoreOrdersQuery;
