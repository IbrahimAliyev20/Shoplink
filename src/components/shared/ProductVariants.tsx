"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export interface ProductVariant {
  type: "color" | "size";
  name: string;
  image?: File | null;
}

const ModalFormField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="relative">
    <label className="absolute -top-2.5 left-3 text-xs bg-white px-1 text-gray-500 z-10">
      {label}
    </label>
    <div className="h-14 w-full">{children}</div>
  </div>
);

interface ProductVariantsProps {
  variants: ProductVariant[];
  setVariants: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
}

const ProductVariants = ({ variants, setVariants }: ProductVariantsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variantType, setVariantType] = useState<"color" | "size">("color");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleAddVariant = () => {
    if (!name.trim()) {
      toast.error("Variant adı boş ola bilməz.");
      return;
    }

    const newVariant: ProductVariant = {
      type: variantType,
      name: name.trim(),
      image: variantType === "color" ? image : null,
    };

    setVariants((prev) => [...prev, newVariant]);

    setName("");
    setImage(null);
    setIsModalOpen(false);
  };

  const removeVariant = (indexToRemove: number) => {
    setVariants((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Variant</CardTitle>
            <p className="text-sm text-muted-foreground pt-1">
              Məhsulun rəng və ölçü olaraq variantlarını əlavə edin
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E23359] hover:bg-[#E23359]/90 text-white cursor-pointer"
          >
            Variant əlavə et
          </Button>
        </CardHeader>
        {variants.length > 0 && (
          <CardContent>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-600">
                Əlavə edilmiş variantlar:
              </h4>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 rounded-md p-2 text-sm"
                  >
                    <span>
                      {variant.type === "color" ? "Rəng" : "Ölçü"}:{" "}
                      <strong>{variant.name}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Variant Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg mx-auto flex flex-col">
            <div className="relative p-6 border-b border-[#F3F2F8]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-900">
                Variant əlavə et
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Məhsulun rəng və ya ölçü variantlarını əlavə edin
              </p>
            </div>
            <div className="p-6 space-y-6 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    variantType === "color"
                      ? "border-fuchsia-500 bg-fuchsia-50/50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="variant"
                    value="color"
                    checked={variantType === "color"}
                    onChange={() => setVariantType("color")}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                      variantType === "color"
                        ? "border-fuchsia-500"
                        : "border-gray-400"
                    }`}
                  >
                    {variantType === "color" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-800">Rəng</span>
                </label>
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    variantType === "size"
                      ? "border-fuchsia-500 bg-fuchsia-50/50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="variant"
                    value="size"
                    checked={variantType === "size"}
                    onChange={() => setVariantType("size")}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                      variantType === "size"
                        ? "border-fuchsia-500"
                        : "border-gray-400"
                    }`}
                  >
                    {variantType === "size" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-800">Ölçü</span>
                </label>
              </div>
              {variantType === "color" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-t pt-6">
                    Rəng
                  </h3>
                  <ModalFormField label="Rəng adı">
                    <Input
                      placeholder="Rəngin adını qeyd edin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-full rounded-xl border-gray-300"
                    />
                  </ModalFormField>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Uyğun məhsulun şəklini seçin
                    </label>
                    <div className="mt-2 border-2 border-dashed border-[#F3F2F8] rounded-lg p-8 text-center hover:border-fuchsia-500 transition-colors cursor-pointer">
                      <ImageIcon className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-500 mb-2">Fayl seçin</p>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          setImage(e.target.files ? e.target.files[0] : null)
                        }
                      />
                    </div>
                    {image && (
                      <p className="text-sm text-green-600 mt-2">
                        Seçildi: {image.name}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {variantType === "size" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-t pt-6">
                    Ölçü
                  </h3>
                  <ModalFormField label="Ölçü adı">
                    <Input
                      placeholder="Ölçünün adını qeyd edin (örn: M, L, 42, 43)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-full rounded-xl border-gray-300"
                    />
                  </ModalFormField>
                </div>
              )}
            </div>
            <div className="flex gap-4 p-6 border-t border-[#F3F2F8] bg-gray-50/50 rounded-b-2xl">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 h-12"
              >
                Geri
              </Button>
              <Button
                type="button"
                onClick={handleAddVariant}
                className="flex-1 h-12 bg-fuchsia-500 hover:bg-fuchsia-600 text-white"
              >
                Yadda saxla
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductVariants;
