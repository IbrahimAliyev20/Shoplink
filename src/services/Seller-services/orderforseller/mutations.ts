import { mutationOptions } from "@tanstack/react-query";
import { changeStoreOrderStatus } from "./api";


export const useChangeStoreOrderStatusMutation = () =>
    mutationOptions({
      mutationFn: (formData: FormData) => changeStoreOrderStatus(formData),
    });