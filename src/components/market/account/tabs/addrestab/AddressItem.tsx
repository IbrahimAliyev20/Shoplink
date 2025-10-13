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
    <div className="bg-[#FBFDFF] border border-[#f3f2f8] rounded-lg p-3 md:p-4" >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="relative flex items-center gap-2 mb-2">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
            <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">{address.title}</h3>
            {address.selected === 1 && (
              <div className="absolute right-0 top-0 bg-[#fff5ff] text-[#FF13F0] text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 rounded-lg flex items-center gap-1 font-medium">
                Seçilmiş ünvan
              </div>
            )}
          </div>
          
          <p className="text-xs md:text-sm text-gray-600 mb-1 truncate">{address.address}</p>
          <p className="text-xs md:text-sm text-gray-600 truncate">
            {address.city}/{address.country}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 flex-shrink-0">
              <MoreVertical className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" >
            <DropdownMenuItem onClick={() => onEdit(address)} className="hover:bg-[#F2F4F8]">
              <Edit className="w-3 h-3 md:w-4 md:h-4 mr-2" /> Düzəliş et
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(address.id)} className="hover:bg-[#F2F4F8]">
              <Trash2 className="w-3 h-3 md:w-4 md:h-4 mr-2" /> Ünvanı sil
            </DropdownMenuItem>
            {address.selected !== 1 && (
              <DropdownMenuItem onClick={() => onSelect(address.id)} className="hover:bg-[#F2F4F8]">
                <CircleCheck className="w-3 h-3 md:w-4 md:h-4 mr-2" /> Seçilmiş ünvan et
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default AddressItem;