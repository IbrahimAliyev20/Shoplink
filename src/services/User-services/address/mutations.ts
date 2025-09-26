import { mutationOptions } from "@tanstack/react-query";
import {
  createAddress,
  deleteAddress,
  selectAddress,
  updateAddress,
} from "./api";
import { Address } from "@/types";

export const createAddressMutation = () =>
  mutationOptions({
    mutationFn: (newAddress: Omit<Address, 'id' | 'selected'>) => createAddress(newAddress),
  });

export const updateAddressMutation = () =>
  mutationOptions({
    mutationFn: (addressToUpdate: Partial<Address> & { id: number }) => updateAddress(addressToUpdate),
  });

export const deleteAddressMutation = () =>
  mutationOptions({
    mutationFn: (addressId: number) => deleteAddress(addressId),
  });

export const selectAddressMutation = () =>
  mutationOptions({
    mutationFn: (addressId: number) => selectAddress(addressId),
  });