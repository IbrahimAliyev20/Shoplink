"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStoreMutation } from '@/services/Seller-services/store/update/mutations'; // Düzgün yolu qeyd edin

interface StoreLogoProps {
  storeId?: number;
  onStepComplete?: () => void;
}

export interface StoreLogoRef {
  handleSubmit: () => void;
  isFormValid: () => boolean;
}

const StoreLogo = React.forwardRef<StoreLogoRef, StoreLogoProps>(
  ({ storeId, onStepComplete }, ref) => {
    const queryClient = useQueryClient();
    const [storeLogo, setStoreLogo] = useState<File | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

    const { mutate: updateStore, isPending } = useMutation({
      ...updateStoreMutation(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["all-store-options"] });
        toast.success('Dəyişikliklər uğurla yadda saxlanıldı');
        setStoreLogo(null);
        setBackgroundImage(null);
        if (onStepComplete) {
          onStepComplete();
        }
      },
      onError: (error) => {
        toast.error('Xəta baş verdi: ' + error.message);
      }
    });

    const handleSaveChanges = () => {
      if (!isFormValid()) {
        toast.error('Ən azı bir şəkil seçin');
        return;
      }

      if (!storeId) {
        toast.error('Store ID tapılmadı');
        return;
      }

      const formData = new FormData();
      formData.append('id', String(storeId));

      if (storeLogo) {
        formData.append('logo', storeLogo);
      }
      if (backgroundImage) {
        formData.append('background_image', backgroundImage);
      }

      updateStore(formData);
    };

    const validateFile = (file: File): boolean => {
      if (file.size > 7 * 1024 * 1024) {
        toast.error('Fayl ölçüsü 7MB-dan çox ola bilməz');
        return false;
      }
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Yalnız .jpeg, .jpg, .png, .webp formatları dəstəklənir');
        return false;
      }
      return true;
    };

    const handleFileUpload = (file: File, type: 'logo' | 'background') => {
      if (!validateFile(file)) return;
      if (type === 'logo') {
        setStoreLogo(file);
      } else {
        setBackgroundImage(file);
      }
    };

    const isFormValid = () => Boolean(storeLogo || backgroundImage);

    React.useImperativeHandle(ref, () => ({
      handleSubmit: handleSaveChanges,
      isFormValid
    }));

    const FileUploadArea = ({ 
      file, 
      onFileSelect, 
    }: { 
      title: string; 
      file: File | null; 
      onFileSelect: (file: File) => void;
      type: 'logo' | 'background';
    }) => (
      <div className="space-y-4 max-md:space-y-3">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors max-md:p-6">
          <div className="flex flex-col items-center space-y-4 max-md:space-y-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center max-md:w-12 max-md:h-12">
              <ImageIcon className="w-8 h-8 text-gray-400 max-md:w-6 max-md:h-6" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2 max-md:text-xs max-md:mb-3 max-md:leading-relaxed">
                Siz .jpeg, .jpg, .png, .webp formatında faylları maksimum 7MB ölçüyə qədər yükləyə bilərsiniz.
              </p>
              <Button
                variant="ghost"
                className="text-pink-500 hover:text-pink-600 font-medium max-md:w-full max-md:h-10"
                disabled={isPending}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.jpeg,.jpg,.png,.webp';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      onFileSelect(file);
                    }
                  };
                  input.click();
                }}
              >
                <Plus className="w-4 h-4 mr-1 max-md:w-3 max-md:h-3" />
                <span className="max-md:text-sm">Şəkil əlavə et</span>
              </Button>
            </div>
          </div>
        </div>
        {file && (
          <div className="text-sm text-green-600 max-md:text-xs">
            Seçilmiş fayl: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-8 max-md:space-y-6">
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2 max-md:text-xl max-md:mb-3">
            Mağazanın Loqosu
          </h2>
        </div>
        <FileUploadArea
          title="Mağazanın Loqosu"
          file={storeLogo}
          onFileSelect={(file) => handleFileUpload(file, 'logo')}
          type="logo"
        />
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2 max-md:text-xl max-md:mb-3">
            Arxa fon şəkli
          </h2>
        </div>
        <FileUploadArea
          title="Arxa fon şəkli"
          file={backgroundImage}
          onFileSelect={(file) => handleFileUpload(file, 'background')}
          type="background"
        />
      </div>
    );
  }
);

StoreLogo.displayName = 'StoreLogo';

export default StoreLogo;