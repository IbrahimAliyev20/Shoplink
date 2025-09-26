// services/Contact/mutations.ts

import { useMutation } from "@tanstack/react-query"
import { postContact } from "./api"
import { Contact, ApiResponse } from "@/types" 

export const useContactMutation = () => {
    return useMutation<
        ApiResponse<Contact>, 
        Error,              
        Contact              
    >({
        mutationFn: postContact,
        mutationKey: ['contact-mutation']
    })
}