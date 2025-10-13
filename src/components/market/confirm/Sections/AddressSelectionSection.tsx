"use client";

import React, { useState } from "react";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { UseFormRegister, Control, FieldErrors } from "react-hook-form";

import { Address } from "@/types";
import AddAddressModal from "./AddAddressModal";

interface FormData {
  paymentMethod: string;
  fullName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  city: string;
  address: string;
  notes: string;
}

interface AddressSelectionSectionProps {
  addresses: Address[] | undefined;
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address) => void;
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

function AddressSelectionSection({
  addresses,
  selectedAddress,
  setSelectedAddress,
  register,
}: AddressSelectionSectionProps) {
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  if (addresses && addresses.length > 0) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Çatdırılma Məlumatları
        </h2>
        <p className="block text-sm font-regular  text-black mb-2">Çatdırılma ünvanı</p>

        <div className="relative">
          <div
            className="w-full h-12 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between bg-white"
            onClick={() =>
              setIsAddressDropdownOpen(!isAddressDropdownOpen)
            }
          >
            <span className="text-gray-500">
              {selectedAddress ? selectedAddress.title : "Ünvan"}
            </span>
            <ChevronDownIcon
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isAddressDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isAddressDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#F3F2F8] rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-4 "
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">
                      {address.title}
                    </h3>
                    {address.selected === 1 && (
                      <div className="bg-[#fff5ff] text-[#FF13F0] text-sm px-3 py-1 rounded-md font-medium">
                        Seçilmiş ünvan
                      </div>
                    )}
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        {address.name} {address.surname}
                      </p>
                      <p>{address.phone}</p>
                      <p>{address.address}</p>
                      <p>
                        {address.city}/{address.country}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 cursor-pointer flex-shrink-0 flex items-center justify-center mt-1 ${
                        selectedAddress?.id === address.id
                          ? "border-[#E23359] bg-[#E23359]"
                          : "border-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedAddress(address);
                        setIsAddressDropdownOpen(false);
                      }}
                    >
                      {selectedAddress?.id === address.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="p-4 border-t border-[#F3F2F8] cursor-pointer hover:bg-gray-50 flex items-center space-x-2"
                onClick={() => {
                  setIsAddressDropdownOpen(false);
                  setIsAddAddressModalOpen(true);
                }}
              >
                <PlusIcon className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Başqa ünvan istifadə et</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="block text-sm font-regular  text-black mb-2">Qeyd</h2>
          <textarea
            placeholder="Sifarişiniz barədə əlavə qeydləriniz varsa daxil edin"
            {...register("notes")}
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <AddAddressModal 
            isOpen={isAddAddressModalOpen} 
            onClose={() => setIsAddAddressModalOpen(false)} 
        />
        
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Çatdırılma Məlumatları
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
          <label className="block text-sm font-regular  text-black mb-2">
            Şəhər
          </label>
          <select
            {...register("city")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="Bakı">Bakı</option>
            <option value="Gəncə">Gəncə</option>
            <option value="Sumqayıt">Sumqayıt</option>
            <option value="Mingəçevir">Mingəçevir</option>
            <option value="Lənkəran">Lənkəran</option>
            <option value="Şəki">Şəki</option>
            <option value="Quba">Quba</option>
            <option value="Şamaxı">Şamaxı</option>
            <option value="Ağdam">Ağdam</option>
            <option value="Füzuli">Füzuli</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-regular  text-black mb-2">
            Ünvan
          </label>
          <input
            type="text"
            placeholder="Ünvanı qeyd edin"
            {...register("address")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Qeyd
        </label>
        <textarea
          placeholder="Sifarişiniz barədə əlavə qeydləriniz varsa daxil edin"
          {...register("notes")}
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
    </div>
  );
}

export default AddressSelectionSection;
