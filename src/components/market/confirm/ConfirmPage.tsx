"use client";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { createOrderMutation } from "@/services/User-services/orderforusers/mutations";
import { getUserQuery } from "@/services/auth/queries";
import { OrderPayload } from "@/types";

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
  const { cartItems, getCartSummary, clearCart, appliedPromocode } = useCart();
  const router = useRouter();
  const params = useParams();
  const marketSlug = params.market as string;
  
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

  const summary = getCartSummary();

  const { mutate: createOrder, isPending } = useMutation({
    ...createOrderMutation(),
    onSuccess: () => {
      toast.success("Sifarişiniz uğurla təsdiqləndi!");
      clearCart();
      router.push(`/${marketSlug}`);
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
      name: data.fullName,
      email: data.email,
      phone: `${data.phoneCode} ${data.phoneNumber}`,
      note: data.notes || "",
      address: data.address,
      city: data.city,
      store_slug: marketSlug,
      promocode: appliedPromocode?.name || null,
      products: cartItems.map((item) => ({ 
        quantity: Number(item.quantity),
        product_id: Number(item.id)
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
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6">
              <fieldset disabled={isPending}>
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Ödəniş metodu
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-y-3 gap-x-12">
                    <label className="flex items-center gap-4 cursor-pointer">
                      <input
                        type="radio"
                        value="cash"
                        {...register("paymentMethod")}
                        className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                      />
                      <span className="text-gray-700">Nağd ödəniş</span>
                    </label>
                  </div>
                </div>

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
                        {...register("fullName", { required: "Ad və soyad mütləqdir" })}
                        className="w-full h-12 rounded-lg border-gray-300"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
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
                            message: "E-mail formatı yanlışdır"
                          }
                        })}
                        className="w-full h-12 rounded-lg border-gray-300"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Telefon nömrəsi
                      </label>
                      <div className="flex items-center w-full h-12 border border-gray-300 rounded-lg focus-within:ring-1">
                        <Controller
                          name="phoneCode"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
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
                          {...register("phoneNumber", { required: "Nömrə mütləqdir" })}
                          className="flex-1 h-full bg-transparent border-0 rounded-l-none"
                        />
                      </div>
                      {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Çatdırılma Məlumatları
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Şəhər</label>
                      <Controller
                        name="city"
                        control={control}
                        rules={{ required: "Şəhər seçmək mütləqdir" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full h-12 rounded-lg border-gray-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bakı">Bakı</SelectItem>
                              <SelectItem value="Gəncə">Gəncə</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                       {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ünvan</label>
                      <Input
                        type="text"
                        placeholder="Ünvanı qeyd edin"
                        {...register("address", { required: "Ünvan mütləqdir" })}
                        className="w-full h-12 rounded-lg border-gray-300"
                      />
                       {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Qeyd</h2>
                  <textarea
                    placeholder="Sifarişiniz barədə əlavə qeydləriniz varsa daxil edin"
                    {...register("notes")}
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg resize-none"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.push(`/${marketSlug}/basket`)} className="flex-1 h-12 rounded-[16px]">
                    Ləğv et
                  </Button>
                  <Button type="submit" className="flex-1 h-12 bg-[#FF13F0] hover:bg-pink-500 text-white rounded-[16px]">
                    {isPending ? "Təsdiqlənir..." : "Təsdiqlə"}
                  </Button>
                </div>
              </fieldset>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{marketSlug}</h3>
              <p className="text-gray-600 mb-6">{cartItems.length} məhsul</p>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} width={96} height={96} className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-1 space-y-4">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">{item.quantity} ədəd</p>
                        <p className="text-sm font-medium text-gray-900">{item.price * item.quantity} AZN</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {appliedPromocode && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-800 font-medium">Tətbiq edilmiş promokod: {appliedPromocode.name}</span>
                  </div>
                </div>
              )}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between items-center"><span className="text-gray-600">Qiymət</span><span className="font-medium text-gray-900">{summary.subtotal} AZN</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Çatdırılma</span><span className="font-medium text-gray-900">{summary.delivery === 0 ? "Pulsuz" : `${summary.delivery} AZN`}</span></div>
                {summary.promocodeDiscount > 0 && (
                  <div className="flex justify-between items-center"><span className="text-green-600">Promokod endirimi</span><span className="font-medium text-green-600">-{summary.promocodeDiscount} AZN</span></div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">Toplam</span>
                    <span className="text-xl font-medium text-gray-900">{summary.total} AZN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPage;