import { post } from "@/lib/api"
import { Contact, ApiResponse } from "@/types/home/hometypes" 

const postContact = async (data: Contact) => {
    const response = await post<ApiResponse<Contact>>("api/contact-form", data)
    return response
}

export { postContact }