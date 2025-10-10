"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserMutation } from "@/services/auth/updateUser/mutations";

interface PersonalInfoData {
  fullName: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
}

function PersonalInfo({ user }: { user: { name: string; email: string; phone?: string } }) {
  const queryClient = useQueryClient();
  
  const { mutate: updateUser, isPending } = useMutation({
    ...updateUserMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Məlumatlar uğurla yadda saxlanıldı!");
    },
    onError: (error) => {
      toast.error("Xəta baş verdi: " + error.message);
    },
  });

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    fullName: "",
    phoneCode: "+994",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
        const fullPhone = user.phone || "";
        const phoneCode = fullPhone.startsWith("+994") ? "+994" : "+994";
        const phoneNumber = fullPhone.replace(phoneCode, "");

        setPersonalInfo({
            fullName: user.name || "",
            email: user.email || "",
            phoneCode,
            phoneNumber,
        });
    }
  }, [user]);


  const handleInputChange = (field: keyof PersonalInfoData, value: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    const payload = {
      name: personalInfo.fullName,
      email: personalInfo.email,
      phone: `${personalInfo.phoneCode}${personalInfo.phoneNumber}`,
    };
    
    if (!payload.name || !payload.email) {
        toast.error("Ad və E-poçt boş buraxıla bilməz.");
        return;
    }

    updateUser(payload);
  };

  return (
    <div className="space-y-6 max-sm:space-y-4">
      <h1 className="text-2xl font-medium text-gray-900 max-sm:text-xl max-sm:font-semibold">
        Şəxsi məlumatlar
      </h1>
      
      <div className="space-y-4 max-sm:space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 max-sm:text-xs max-sm:mb-1.5">
              Ad,soyad
            </label>
            <Input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="w-full h-12 rounded-lg border-[#F3F2F8] max-sm:h-10 max-sm:text-sm"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 max-sm:text-xs max-sm:mb-1.5">
              Telefon nömrəsi
            </label>
            <div className="flex items-center w-full h-12 border border-gray-300 rounded-lg focus-within:ring-1 transition-all duration-200 max-sm:h-10">
              <Select
                value={personalInfo.phoneCode}
                onValueChange={(value) => handleInputChange("phoneCode", value)}
                disabled={isPending}
              >
                <SelectTrigger className="w-22 h-full bg-transparent border-0 rounded-r-none focus:ring-0 focus:ring-offset-0 max-sm:w-20 max-sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+994">+994</SelectItem>
                  <SelectItem value="+90">+90</SelectItem>
                  <SelectItem value="+7">+7</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="tel"
                value={personalInfo.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="flex-1 h-full bg-transparent border-0 border-[#F3F2F8] rounded-l-none max-sm:text-sm"
                disabled={isPending}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 max-sm:text-xs max-sm:mb-1.5">
            Email
          </label>
          <Input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full h-12 rounded-lg border-[#F3F2F8] max-sm:h-10 max-sm:text-sm"
            disabled={isPending}
          />
        </div>
      </div>

      <div className="flex justify-end max-sm:justify-center">
        <Button
          onClick={handleSaveChanges}
          className="bg-[#FF13F0] hover:bg-pink-500 text-white font-medium px-8 py-3 rounded-lg max-sm:px-6 max-sm:py-2.5 max-sm:text-sm max-sm:w-full"
          disabled={isPending}
        >
          {isPending ? "Yadda saxlanılır..." : "Dəyişiklikləri yadda saxla"}
        </Button>
      </div>
    </div>
  );
}

export default PersonalInfo;