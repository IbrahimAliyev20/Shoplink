"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mockCartItems,
  calculateCartSummary,
} from "@/components/market/data/cart";
import Image from "next/image";
import Link from "next/link";

interface OrderForm {
  paymentMethod: string;
  fullName: string;
  phoneCode: string;
  phoneNumber: string;
  city: string;
  address: string;
  notes: string;
}

function ConfirmPage() {
  const [formData, setFormData] = useState<OrderForm>({
    paymentMethod: "card",
    fullName: "",
    phoneCode: "+994",
    phoneNumber: "",
    city: "Bakı",
    address: "",
    notes: "",
  });

  const cartItems = mockCartItems.slice(0, 2);
  const summary = calculateCartSummary(cartItems);

  const handleInputChange = (field: keyof OrderForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
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
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6">
              {/* Payment Method */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Ödəniş metodu
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-y-3 gap-x-12">
                  <label className="flex items-center gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={(e) =>
                        handleInputChange("paymentMethod", e.target.value)
                      }
                      className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                    />
                    <span className="text-gray-700">
                      Bank kartı vasitəsilə onlayn ödəniş
                    </span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={(e) =>
                        handleInputChange("paymentMethod", e.target.value)
                      }
                      className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                    />
                    <span className="text-gray-700">Nağd ödəniş</span>
                  </label>
                </div>
              </div>

              {/* Personal Information */}
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
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="w-full h-12 rounded-lg border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Telefon nömrəsi
                    </label>
                    <div className="flex items-center w-full h-12 border border-gray-300 rounded-lg focus-within:ring-1 transition-all duration-200">
                      <Select
                        value={formData.phoneCode}
                        onValueChange={(value) =>
                          handleInputChange("phoneCode", value)
                        }
                      >
                        <SelectTrigger className="w-22 h-full bg-transparent border-0 rounded-r-none focus:ring-0 focus:ring-offset-0">
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
                        placeholder="Telefon nömrənizi daxil edin"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        className="flex-1 h-full bg-transparent border-0 rounded-l-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Çatdırılma Məlumatları
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Şəhər
                    </label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) =>
                        handleInputChange("city", value)
                      }
                    >
                      <SelectTrigger className="w-full h-12 rounded-lg border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bakı">Bakı</SelectItem>
                        <SelectItem value="Gəncə">Gəncə</SelectItem>
                        <SelectItem value="Sumqayıt">Sumqayıt</SelectItem>
                        <SelectItem value="Mingəçevir">Mingəçevir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ünvan
                    </label>
                    <Input
                      type="text"
                      placeholder="Ünvanı qeyd edin"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full h-12 rounded-lg border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Qeyd</h2>
                <textarea
                  placeholder="Sifarişiniz barədə əlavə qeydləriniz varsa daxil edin"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Link href="/market/basket" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50 rounded-[16px]"
                  >
                    Ləğv et
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-[#FF13F0] hover:bg-pink-500 text-white font-medium rounded-[16px]"
                >
                  Təsdiqlə
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Stridex
              </h3>
              <p className="text-gray-600 mb-6">{cartItems.length} məhsul</p>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">1 ədəd</p>
                        <p className="text-sm font-medium text-gray-900">
                          {item.price} AZN
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Qiymət</span>
                  <span className="font-medium text-gray-900">
                    {summary.subtotal} AZN
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Çatdırılma</span>
                  <span className="font-medium text-gray-900">
                    {summary.delivery === 0 ? "Pulsuz" : `${summary.delivery} AZN`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">Toplam</span>
                    <span className="text-xl font-medium text-gray-900">
                      {summary.total} AZN
                    </span>
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