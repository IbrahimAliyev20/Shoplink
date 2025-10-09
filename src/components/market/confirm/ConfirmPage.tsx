"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { createOrderMutation } from "@/services/User-services/orderforusers/mutations";
import { getUserQuery } from "@/services/auth/queries";
import { OrderPayload, Address } from "@/types";
import { addressQueries } from "@/services/User-services/address/queries";
import { useCart } from "@/contexts/CartContext";
import {
  PersonalInfoSection,
  AddressSelectionSection,
  OrderSummarySection,
  ActionButtonsSection,
} from "./Sections";

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

function ConfirmPage() {
  const { cartItems, clearCart, appliedPromocode } = useCart();
  const params = useParams();
  const marketSlug = params.market as string;
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const { data: addresses } = useQuery(addressQueries.all());
  const { data: userData } = useQuery(getUserQuery());

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderFormValues>({
    defaultValues: {
      paymentMethod: "cash",
      phoneCode: "+994",
      city: "Bakı",
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      notes: "",
    },
  });

  const { mutate: createOrder, isPending } = useMutation({
    ...createOrderMutation(),
    onSuccess: () => {
      toast.success("Sifarişiniz uğurla təsdiqləndi!");
      clearCart();
      window.location.href = `/${marketSlug}`;
    },
    onError: (error) => {
      toast.error("Sifariş zamanı xəta baş verdi: " + error.message);
    },
  });

  const onSubmit: SubmitHandler<OrderFormValues> = (data) => {
    if (cartItems.length === 0) {
      toast.error("Sifarişi tamamlamaq üçün səbətinizdə məhsul olmalıdır.");
      return;
    }

    const orderPayload: OrderPayload = {
      name: selectedAddress
        ? `${selectedAddress.name} ${selectedAddress.surname}`
        : data.fullName,
      email: data.email,
      phone: selectedAddress
        ? selectedAddress.phone
        : `${data.phoneCode} ${data.phoneNumber}`,
      note: data.notes || "",
      address: selectedAddress ? selectedAddress.address : data.address,
      city: selectedAddress ? selectedAddress.city : data.city,
      store_slug: marketSlug,
      promocode: appliedPromocode?.name || null,
      products: cartItems.map((item) => ({
        quantity: Number(item.quantity),
        product_id: Number(item.id),
      })),
    };

    if (userData?.data?.id) {
      orderPayload.user_id = Number(userData.data.id);
    }
    createOrder(orderPayload);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Sifarişi tamamla
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl p-6"
            >
              <fieldset disabled={isPending}>
                <PersonalInfoSection
                  register={register}
                  control={control}
                  errors={errors}
                />

                <AddressSelectionSection
                  addresses={addresses}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                  register={register}
                  control={control}
                  errors={errors}
                />

                <ActionButtonsSection
                  marketSlug={marketSlug}
                  isPending={isPending}
                />
              </fieldset>
            </form>
          </div>

          <div className="lg:col-span-1">
            <OrderSummarySection marketSlug={marketSlug} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPage;
