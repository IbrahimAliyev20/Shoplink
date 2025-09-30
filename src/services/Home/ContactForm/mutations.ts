
import { useMutation } from "@tanstack/react-query"
import { postContact } from "./api"
import { ContactForm, ApiResponse } from "@/types/home/hometypes" 

export const useContactMutation = () => {
    return useMutation<
        ApiResponse<ContactForm>, 
        Error,              
        ContactForm              
    >({
        mutationFn: postContact,
        mutationKey: ['contact-mutation']
    })
}