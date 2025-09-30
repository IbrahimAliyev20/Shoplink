import { get } from "@/lib/api"
import { Contact, ApiResponse } from "@/types/home/hometypes" 

const getContact = async () => {
    const response = await get<ApiResponse<Contact>>("api/contact")
    return response.data
}

export { getContact }