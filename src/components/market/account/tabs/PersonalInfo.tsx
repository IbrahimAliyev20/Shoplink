"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserMutation } from "@/services/auth/updateUser/mutations";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PersonalInfoData {
  fullName: string;
  phone: string;
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
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
        setPersonalInfo({
            fullName: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
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
      phone: personalInfo.phone,
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
            <PhoneInput
              country="az"
              value={personalInfo.phone}
              onChange={(value) => handleInputChange("phone", value)}
              disabled={isPending}
              inputStyle={{
                width: "100%",
                height: "48px",
                borderRadius: "8px",
                border: "1px solid #F3F2F8",
                fontSize: "16px",
                paddingLeft: "48px",
              }}
              buttonStyle={{
                border: "1px solid #F3F2F8",
                borderRadius: "8px 0 0 8px",
                backgroundColor: "transparent",
              }}
              containerStyle={{
                width: "100%",
              }}
              placeholder="Nömrənizi daxil edin"
            />
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
          className="bg-[#E23359] hover:bg-[#E23359]/90 text-white font-medium px-8  rounded-lg max-sm:px-6  max-sm:text-sm max-sm:w-full h-12"
          disabled={isPending}
        >
          {isPending ? "Yadda saxlanılır..." : "Dəyişiklikləri yadda saxla"}
        </Button>
      </div>
    </div>
  );
}

export default PersonalInfo;