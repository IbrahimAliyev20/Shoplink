import { useMutation } from "@tanstack/react-query";
import { PlanPayment } from "./api";

export const usePlanPaymentMutation = () => {
    return useMutation({
        mutationFn: (formData: FormData) => PlanPayment(formData),
    });
};  