import { queryOptions } from "@tanstack/react-query";
import { getSingleUserOrder, getUserOrder } from "./api";

const getUserOrderQuery  = () => {
  return queryOptions({
    queryKey: ["userOrder"],
    queryFn: () => getUserOrder(),
  });
};

const getSingleUserOrderQuery = (orderId: string) => {
  return queryOptions({
    queryKey: ["singleUserOrder", orderId],
    queryFn: () => getSingleUserOrder(orderId),
  });
};

export { getUserOrderQuery, getSingleUserOrderQuery };
