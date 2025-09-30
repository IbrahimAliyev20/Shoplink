import { post } from "@/lib/api"
import { ApiResponse, ContactForm } from "@/types/home/hometypes" 

const postContact = async (data: ContactForm) => {
    const response = await post<ApiResponse<ContactForm>>("api/contact-form", data)
    return response
}

export { postContact }