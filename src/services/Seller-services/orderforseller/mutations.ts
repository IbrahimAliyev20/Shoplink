import { mutationOptions } from "@tanstack/react-query";
import { changeStoreOrderStatus } from "./api";


export const useChangeStoreOrderStatusMutation = () =>
  mutationOptions({
    mutationFn: (variables: { id: string; status: number }) => 
      changeStoreOrderStatus(variables),
  });