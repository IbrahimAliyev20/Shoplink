"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { addressSchema, AddressFormData } from "./types";
import { Address } from "@/types";

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  onBack: () => void;
  defaultValues?: Address | AddressFormData;
  isEditing?: boolean;
  isLoading?: boolean;
}

function AddressForm({
  onSubmit,
  onBack,
  defaultValues,
  isEditing,
  isLoading,
}: AddressFormProps) {
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues || {
      title: "",
      country: "",
      city: "",
      address: "",
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center gap-4 p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">
          {isEditing ? "Ünvanı düzəlt" : "Ünvan əlavə et"}
        </h1>
      </div>

      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ölkə</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ölkəni qeyd edin"
                        {...field}
                        className="h-12 rounded-lg border-[#F3F2F8] focus:border-[#FF13F0] focus:ring-[#FF13F0]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şəhər</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Şəhəri qeyd edin"
                        {...field}
                        className="h-12 rounded-lg border-[#F3F2F8] focus:border-[#FF13F0] focus:ring-[#FF13F0]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ünvan başlığı</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Məs: Ev, İş"
                        {...field}
                        className="h-12 rounded-lg border-[#F3F2F8] focus:border-[#FF13F0] focus:ring-[#FF13F0]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ünvan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ətraflı ünvanı qeyd edin"
                        {...field}
                        className="h-12 rounded-lg border-[#F3F2F8] focus:border-[#FF13F0] focus:ring-[#FF13F0]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-end">
              <Button
                type="submit"
                className="bg-[#E23359] hover:bg-[#E23359]/90 text-white rounded-[16px] px-8 py-5"
                disabled={isLoading}
              >
                {isLoading ? "Yadda saxlanılır..." : "Yadda saxla"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddressForm;
