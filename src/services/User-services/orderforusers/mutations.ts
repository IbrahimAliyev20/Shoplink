import { mutationOptions } from "@tanstack/react-query";
import { createOrder, checkPromocode } from "./api";
import { OrderPayload } from "@/types";

export const createOrderMutation = () =>
  mutationOptions({
    mutationFn: (orderPayload: OrderPayload) => createOrder(orderPayload),
  });

export const checkPromocodeMutation = () =>
  mutationOptions({
    mutationFn: (payload: { promocode: string; products: number[] }) => checkPromocode(payload),
  });