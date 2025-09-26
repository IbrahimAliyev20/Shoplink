"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateStoreMutation } from "@/services/Seller-services/store/update/mutations";
import { getAllStoreQuery } from "@/services/Seller-services/store/allstore/queries";
import Image from "next/image";

const StoreInfo = () => {
  const { data: allStore } = useQuery(getAllStoreQuery());
  const queryClient = useQueryClient();
  const [storeName, setStoreName] = useState("");
  const [language, setLanguage] = useState("");
  const [currency, setCurrency] = useState("");
  const [storeLogo, setStoreLogo] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string>("");
  const [previewBackground, setPreviewBackground] = useState<string>("");

  const logoInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateStore, isPending } = useMutation({
    ...updateStoreMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-store-options"] });
      toast.success("Dəyişikliklər uğurla yadda saxlanıldı");
      setStoreLogo(null);
      setBackgroundImage(null);
      setPreviewLogo("");
      setPreviewBackground("");
    },
    onError: (error) => {
      toast.error("Xəta baş verdi: " + error.message);
    }
  });

  useEffect(() => {
    if (allStore) {
      setStoreName(allStore.name || "");
      setLanguage(allStore.language || "");
      setCurrency(allStore.currency || "");
      setPreviewLogo(allStore.logo || "");
      setPreviewBackground(allStore.background_image || "");
    }
  }, [allStore]);

  const handleSaveChanges = () => {
    if (!allStore?.id) {
      toast.error("Store ID tapılmadı");
      return;
    }

    const formData = new FormData();
    formData.append("id", String(allStore.id));
    formData.append("name", storeName);
    formData.append("language", language);
    formData.append("currency", currency);
    if (storeLogo) {
      formData.append("logo", storeLogo, storeLogo.name);
    }
    if (backgroundImage) {
      formData.append("background_image", backgroundImage, backgroundImage.name);
    }

 

    updateStore(formData);
  };

  const handleFileSelect = (file: File, type: "logo" | "background") => {
    if (file.size > 7 * 1024 * 1024) {
      toast.error("Fayl ölçüsü 7MB-dan böyük ola bilməz");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Yalnız .jpeg, .jpg, .png, .webp formatları dəstəklənir");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    if (type === "logo") {
      setStoreLogo(file);
      setPreviewLogo(previewUrl);
    } else {
      setBackgroundImage(file);
      setPreviewBackground(previewUrl);
    }
  };

  const handleLogoUpload = () => logoInputRef.current?.click();
  const handleBackgroundUpload = () => backgroundInputRef.current?.click();
  const removeLogo = () => {
    setStoreLogo(null);
    setPreviewLogo("");
  };
  const removeBackground = () => {
    setBackgroundImage(null);
    setPreviewBackground("");
  };

  return (
    <Card>
      <CardHeader className="max-md:p-4">
        <CardTitle className="flex text-2xl font-medium items-center gap-2 max-md:text-xl">
          Mağaza məlumatları
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-24 max-md:space-y-4 max-md:p-4 max-md:pt-0 max-md:pb-12">
        <div className="space-y-6 max-md:space-y-4">
          <div className="grid grid-cols-2 gap-6 w-full max-md:grid-cols-1 max-md:gap-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="storeName" className="text-sm font-medium text-gray-700 max-md:text-xs">
                Mağaza adı
              </Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="h-12 rounded-lg w-full max-md:h-10 max-md:text-sm"
                placeholder="Mağaza adını daxil edin"
                disabled={isPending}
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="language" className="text-sm font-medium text-gray-700 max-md:text-xs">
                Dil seçimi
              </Label>
              <Select value={language} onValueChange={setLanguage} disabled={isPending}>
                <SelectTrigger className="h-12 rounded-lg w-full max-md:h-10 max-md:text-sm">
                  <SelectValue placeholder="Dil seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="az">Azərbaycan dili</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="tr">Türkçe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="currency" className="text-sm font-medium text-gray-700 max-md:text-xs">
                Valyuta
              </Label>
              <Select value={currency} onValueChange={setCurrency} disabled={isPending}>
                <SelectTrigger className="h-12 rounded-lg w-full max-md:h-10 max-md:text-sm">
                  <SelectValue placeholder="Valyuta seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AZN">Azərbaycan manatı</SelectItem>
                  <SelectItem value="USD">US Dollar</SelectItem>
                  <SelectItem value="EUR">Euro</SelectItem>
                  <SelectItem value="TRY">Turkish Lira</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-6 w-full max-md:flex-col max-md:gap-4">
            <div className="space-y-2 max-md:w-full">
              <Label className="text-sm font-medium text-gray-700 max-md:text-xs">Mağaza Logosu</Label>
              <div
                className="relative w-38 h-38 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer max-md:w-full max-md:h-32"
                onClick={handleLogoUpload}
              >
                {previewLogo ? (
                  <>
                    <Image width={100} height={100} src={previewLogo} alt="Store Logo" className="w-full h-full object-cover rounded-lg" />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white/90 hover:bg-white max-md:h-6 max-md:w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLogo();
                      }}
                    >
                      <X className="h-4 w-4 max-md:h-3 max-md:w-3" />
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">Logo yükləyin</p>
                  </div>
                )}
                <input
                  ref={logoInputRef}
                  type="file"
                  accept=".jpeg,.jpg,.png,.webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file, "logo");
                  }}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-2 max-md:w-full">
              <Label className="text-sm font-medium text-gray-700 max-md:text-xs">Mağaza arxa fonu</Label>
              <div
                className="relative w-38 h-38 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-opacity max-md:w-full max-md:h-32"
                onClick={handleBackgroundUpload}
              >
                {previewBackground ? (
                  <>
                    <Image width={100} height={100} src={previewBackground} alt="Background" className="w-full h-full object-cover rounded-lg" />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-white/90 hover:bg-white max-md:h-6 max-md:w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBackground();
                      }}
                    >
                      <X className="h-4 w-4 max-md:h-3 max-md:w-3" />
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">Arxa fon yükləyin</p>
                  </div>
                )}
                <input
                  ref={backgroundInputRef}
                  type="file"
                  accept=".jpeg,.jpg,.png,.webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file, "background");
                  }}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end max-md:justify-center">
          <Button
            className="bg-[#FF13F0] hover:bg-purple-700 cursor-pointer rounded-[16px] max-md:w-full max-md:h-10"
            onClick={handleSaveChanges}
            disabled={isPending}
          >
            {isPending ? "Saxlanılır..." : "Dəyişiklikləri yadda saxla"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreInfo;