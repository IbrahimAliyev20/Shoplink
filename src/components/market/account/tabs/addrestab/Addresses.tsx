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
    onSuccess: () => onMutationSuccess("Ünvan uğurla yaradıldı!"),
    onError: onMutationError,
  });

  const { mutate: updateAddress, isPending: isUpdating } = useMutation({
    ...updateAddressMutation(),
    onSuccess: () => onMutationSuccess("Ünvan uğurla yeniləndi!"),
    onError: onMutationError,
  });

  const { mutate: deleteAddress } = useMutation({
    ...deleteAddressMutation(),
    onSuccess: () => onMutationSuccess("Ünvan uğurla silindi!"),
    onError: onMutationError,
  });

  const { mutate: selectAddress } = useMutation({
    ...selectAddressMutation(),
    onSuccess: () => onMutationSuccess("Əsas ünvan seçildi!"),
    onError: onMutationError,
  });

  // 3. Handler funksiyaları mutation-ları çağırır
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

  if (isLoading) return <div>Yüklənir...</div>;
  if (isError) return <div>Xəta baş verdi. Məlumatları yükləmək mümkün olmadı.</div>;

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