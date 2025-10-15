"use client";

import React from "react";
import { Controller, UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { UserData } from "@/types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface OrderFormValues {
  paymentMethod: string;
  fullName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  city: string;
  address: string;
  notes: string;
}

interface PersonalInfoSectionProps {
  register: UseFormRegister<OrderFormValues>;
  control: Control<OrderFormValues>;
  errors: FieldErrors<OrderFormValues>;
  userData: UserData;
}

function PersonalInfoSection({ register, control, errors,  }: PersonalInfoSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        
        Şəxsi Məlumat
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-regular  text-black mb-2">
            Ad,soyad
          </label>
          <Input
            type="text"
            placeholder="Ad və soyadınızı daxil edin"
            {...register("fullName", {
              required: "Ad və soyad mütləqdir",
            })}
            
            className="w-full h-12 rounded-lg border-gray-300"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-regular  text-black mb-2">
            Telefon nömrəsi
          </label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <PhoneInput
                country="az"
                value={field.value}
                onChange={(value) => {
                  // Extract phone code and number from the full phone value
                  const phoneCode = value.substring(0, 4); // +994
                  const phoneNumber = value.substring(4); // remaining digits
                  field.onChange(phoneNumber);
                  // Update phoneCode field as well
                  control._formValues.phoneCode = phoneCode;
                }}
                inputStyle={{
                  width: "100%",
                  height: "48px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                  paddingLeft: "48px",
                }}
                buttonStyle={{
                  border: "1px solid #d1d5db",
                  borderRadius: "8px 0 0 8px",
                  backgroundColor: "transparent",
                }}
                containerStyle={{
                  width: "100%",
                }}
                placeholder="70 888 45 81"
              />
            )}
            rules={{
              required: "Nömrə mütləqdir",
            }}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-regular  text-black mb-2">
            E-mail
          </label>
          <Input
            type="email"
            placeholder="E-mail ünvanınızı daxil edin"
            {...register("email", {
              required: "E-mail mütləqdir",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "E-mail formatı yanlışdır",
              },
            })}
            className="w-full h-12 rounded-lg border-gray-300"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoSection;
