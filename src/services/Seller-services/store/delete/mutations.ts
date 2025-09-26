
import { useMutation } from "@tanstack/react-query"
import { postStoreDelete } from "./api"
import { ApiResponse, StoreDelete } from "@/types" 

export const useStoreDeleteMutation = () => {
    return useMutation<
        ApiResponse<StoreDelete>, 
        Error,              
        StoreDelete              
    >({
        mutationFn: postStoreDelete,
        mutationKey: ['store-delete-mutation']
    })
}