
import { get, post } from "@/lib/api";
import { Address, ApiResponse } from "@/types";

const getAddresses = async () => {
    const response = await get<ApiResponse<Address[]>>("user/address");
    return response.data;
};

const createAddress = async (addressData: Omit<Address, 'id' | 'selected'>) => {
    const response = await post<ApiResponse<Address>>("user/address-store", addressData);
    return response.data;
};

const updateAddress = async (addressData: Partial<Address> & { id: number }) => {
    const response = await post<ApiResponse<Address>>(`user/address/update/${addressData.id}`, addressData);
    return response.data;
};

const selectAddress = async (addressId: number) => {
    const response = await post<ApiResponse<Address>>(`user/address/selected/${addressId}`);
    return response.data;
};

const deleteAddress = async (addressId: number) => {
    const response = await post<ApiResponse<null>>(`user/address/delete/${addressId}`);
    return response;
};

export { getAddresses, createAddress, updateAddress, deleteAddress, selectAddress };