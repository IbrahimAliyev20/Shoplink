"use client";

import React from "react";
import { Controller, UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface PersonalInfoSectionProps {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

function PersonalInfoSection({ register, control, errors }: PersonalInfoSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Şəxsi Məlumat
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
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
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Telefon nömrəsi
          </label>
          <div className="flex items-center w-full h-12 border border-gray-300 rounded-lg focus-within:ring-1">
            <Controller
              name="phoneCode"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-22 h-full bg-transparent border-0 rounded-r-none focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+994">+994</SelectItem>
                    <SelectItem value="+90">+90</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Input
              type="tel"
              placeholder="70 888 45 81"
              {...register("phoneNumber", {
                required: "Nömrə mütləqdir",
              })}
              className="flex-1 h-full bg-transparent border-0 rounded-l-none"
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
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
