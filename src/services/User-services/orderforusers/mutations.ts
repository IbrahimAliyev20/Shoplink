import { useMutation } from "@tanstack/react-query";
import { OrderForUsers } from "./api";

const OrderForUsersMutation = () => {   
    return useMutation({
        mutationFn: OrderForUsers,
    });
};

export { OrderForUsersMutation };
