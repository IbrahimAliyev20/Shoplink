import { post } from "@/lib/api"
import { StoreDelete, ApiResponse } from "@/types"

const postStoreDelete = async (data: StoreDelete) => {
    const response = await post<ApiResponse<StoreDelete>>(`user/store/delete/${data.id}`)
    return response
}

export { postStoreDelete }