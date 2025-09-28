// AddressItem.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, MoreVertical, Trash2, Edit, CircleCheck } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Address } from "@/types";

interface AddressItemProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

function AddressItem({ address, onEdit, onDelete, onSelect }: AddressItemProps) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm" >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="relative flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <h3 className="font-medium text-gray-900">{address.title}</h3>
            {address.selected === 1 && (
              <div className="absolute right-0 top-0 bg-[#fff5ff] text-[#FF13F0] text-base px-3 py-2 rounded-lg flex items-center gap-1 font-medium">
                Seçilmiş ünvan
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-1">{address.address}</p>
          <p className="text-sm text-gray-600">
            {address.city}/{address.country}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(address)}>
              <Edit className="w-4 h-4 mr-2" /> Düzəliş et
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(address.id)}>
              <Trash2 className="w-4 h-4 mr-2" /> Ünvanı sil
            </DropdownMenuItem>
            {address.selected !== 1 && (
              <DropdownMenuItem onClick={() => onSelect(address.id)}>
                <CircleCheck className="w-4 h-4 mr-2" /> Seçilmiş ünvan et
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default AddressItem;