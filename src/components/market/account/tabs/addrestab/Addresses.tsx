// Addresses.tsx

'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import AddressForm from './AddressForm';
import AddressList from './AddressList';
import EmptyState from './EmptyState';
import { Address } from '@/types';
import { AddressFormData } from './types';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { 
  createAddressMutation, 
  deleteAddressMutation, 
  selectAddressMutation, 
  updateAddressMutation 
} from '@/services/User-services/address/mutations';
import { addressQueries } from '@/services/User-services/address/queries';

function Addresses() {
  const queryClient = useQueryClient();
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: addresses, isLoading, isError } = useQuery(addressQueries.all());

  const onMutationSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['addresses'] });
    setShowForm(false);
    setEditingAddress(null);
  };

  const onMutationError = (error: Error) => {
    toast.error("Xəta baş verdi: " + error.message);
  };

  const { mutate: createAddress, isPending: isCreating } = useMutation({
    ...createAddressMutation(),
    onMutate: async (newAddress) => {
      await queryClient.cancelQueries({ queryKey: ['addresses'] });
      
      const previousAddresses = queryClient.getQueryData<Address[]>(['addresses']);
      
      queryClient.setQueryData<Address[]>(['addresses'], (old = []) => [
        ...old,
        { ...newAddress, id: Date.now(), is_selected: 0, selected: 0 } as Address
      ]);
      
      return { previousAddresses };
    },
    onError: (error, _newAddress, context) => {
      // Rollback on error
      if (context?.previousAddresses) {
        queryClient.setQueryData(['addresses'], context.previousAddresses);
      }
      toast.error("Xəta baş verdi: " + error.message);
    },
    onSuccess: () => {
      toast.success("Ünvan uğurla yaradıldı!");
      setShowForm(false);
      setEditingAddress(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  const { mutate: updateAddress, isPending: isUpdating } = useMutation({
    ...updateAddressMutation(),
    onMutate: async (updatedAddress) => {
      await queryClient.cancelQueries({ queryKey: ['addresses'] });
      const previousAddresses = queryClient.getQueryData<Address[]>(['addresses']);
      
      queryClient.setQueryData<Address[]>(['addresses'], (old = []) =>
        old.map((addr) => addr.id === updatedAddress.id ? { ...addr, ...updatedAddress } : addr)
      );
      
      return { previousAddresses };
    },
    onError: (error, _updatedAddress, context) => {
      if (context?.previousAddresses) {
        queryClient.setQueryData(['addresses'], context.previousAddresses);
      }
      toast.error("Xəta baş verdi: " + error.message);
    },
    onSuccess: () => {
      toast.success("Ünvan uğurla yeniləndi!");
      setShowForm(false);
      setEditingAddress(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  const { mutate: deleteAddress } = useMutation({
    ...deleteAddressMutation(),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['addresses'] });
      const previousAddresses = queryClient.getQueryData<Address[]>(['addresses']);
      
      queryClient.setQueryData<Address[]>(['addresses'], (old = []) =>
        old.filter((addr) => addr.id !== id)
      );
      
      return { previousAddresses };
    },
    onError: (error, _id, context) => {
      if (context?.previousAddresses) {
        queryClient.setQueryData(['addresses'], context.previousAddresses);
      }
      toast.error("Xəta baş verdi: " + error.message);
    },
    onSuccess: () => {
      toast.success("Ünvan uğurla silindi!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  const { mutate: selectAddress } = useMutation({
    ...selectAddressMutation(),
    onSuccess: () => onMutationSuccess("Əsas ünvan seçildi!"),
    onError: onMutationError,
  });

  const handleSubmit = (data: AddressFormData) => {
    if (editingAddress) {
      updateAddress({ ...data, id: editingAddress.id });
    } else {
      createAddress({ ...data, name: '', surname: '', phone: '' });
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowForm(true);
  };
  
  const handleBack = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  if (isLoading) return <LoadingState message="Ünvanlar yüklənir..." />;
  if (isError) return <ErrorState message="Ünvanları yükləyərkən xəta baş verdi." onRetry={() => queryClient.invalidateQueries({ queryKey: ['addresses'] })} />;

  if (showForm) {
    return (
      <AddressForm
        onSubmit={handleSubmit}
        onBack={handleBack}
        defaultValues={editingAddress || undefined}
        isEditing={!!editingAddress}
        isLoading={isCreating || isUpdating}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div>
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Ünvanlarım</h1>
        
        {addresses && addresses.length === 0 ? (
          <EmptyState onAddNew={handleAddNew} />
        ) : (
          <AddressList
            addresses={addresses || []}
            onAddNew={handleAddNew}
            onEdit={handleEdit}
            onDelete={deleteAddress}
            onSelect={selectAddress}
          />
        )}
      </div>
    </div>
  );
}

export default Addresses;