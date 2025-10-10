import React from 'react';
import { Button } from '@/components/ui/button';
import AddressItem from './AddressItem';
import { Address } from '@/types';

interface AddressListProps {
  addresses: Address[];
  onAddNew: () => void;
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

function AddressList({ addresses, onAddNew, onEdit, onDelete, onSelect }: AddressListProps) {
  return (
    <div className="p-2">
      <div className="space-y-2">
        {addresses.map((address) => (
          <AddressItem
            key={address.id}
            address={address}
            onEdit={onEdit}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))}
      </div>
      <div className="flex items-center justify-end mt-4">
        <Button variant="default" onClick={onAddNew} className="bg-white hover:bg-white/90 text-black px-4 h-10">
          + Ünvan əlavə et
        </Button>
      </div>
    </div>
  );
}

export default AddressList;