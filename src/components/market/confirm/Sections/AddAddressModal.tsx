"use client";

import React, { useEffect } from "react";
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
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAddressMutation } from "@/services/User-services/address/mutations";
import { Address } from "@/types";

const addressSchema = z.object({
  country: z.string().min(1, "Ölkə mütləqdir"),
  city: z.string().min(1, "Şəhər mütləqdir"),
  title: z.string().min(1, "Ünvan başlığı mütləqdir"),
  address: z.string().min(1, "Ünvan mütləqdir"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddAddressModal({ isOpen, onClose }: AddAddressModalProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "",
      city: "",
      title: "",
      address: "",
    },
  });

  const { mutate: createAddress, isPending } = useMutation({
    ...createAddressMutation(),
    onMutate: async (newAddress) => {
      await queryClient.cancelQueries({ queryKey: ["addresses"] });

      const previousAddresses = queryClient.getQueryData<Address[]>([
        "addresses",
      ]);

      queryClient.setQueryData<Address[]>(["addresses"], (old = []) => [
        ...old,
        {
          ...newAddress,
          id: Date.now(),
          selected: 0,
          is_selected: 0,
          name: "",
          surname: "",
          phone: "",
        } as Address,
      ]);

      return { previousAddresses };
    },
    onError: (err, newAddress, context) => {
      if (context?.previousAddresses) {
        queryClient.setQueryData(["addresses"], context.previousAddresses);
      }
      toast.error(`Xəta baş verdi: ${err.message}`);
    },
    onSuccess: () => {
      toast.success("Ünvan uğurla yaradıldı!");
      form.reset();
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  const onSubmit = (data: AddressFormData) => {
    console.log("Form submitted with data:", data);
    createAddress(data as Omit<Address, "id" | "selected">);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            Yeni ünvan əlavə et
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Ölkə</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ölkəni qeyd edin"
                        {...field}
                        className="h-12 rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500"
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
                    <FormLabel className="text-sm font-medium text-gray-700">Şəhər</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Şəhəri qeyd edin"
                        {...field}
                        className="h-12 rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Ünvan başlığı</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ünvan başlığı qeyd edin"
                        {...field}
                        className="h-12 rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500"
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
                    <FormLabel className="text-sm font-medium text-gray-700">Ünvan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ünvanı qeyd edin"
                        {...field}
                        className="h-12 rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-4 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 h-12 rounded-xl bg-white border-[#F3F2F8] text-gray-700 hover:bg-gray-50"
                  disabled={isPending}
                >
                  Ləğv et
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 h-12 bg-[#FF13F0] hover:bg-[#E011D1] text-white rounded-xl"
                >
                  {isPending ? "Yadda saxlanılır..." : "Yadda saxla"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddAddressModal;
