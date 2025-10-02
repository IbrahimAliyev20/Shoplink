"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function OrderTracking() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  

  return (

    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <h1 className="text-xl font-medium text-gray-900">
              Sifariş nömrəsi :{" "}
              <span className="font-semibold">#9581347322</span>
            </h1>
            <p className="text-gray-600">
              Sifariş tarixi : <span className="text-gray-900">01.20.2003</span>
            </p>
          </div>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Sifarişi verən :</span> Aysun
              Feyzullayeva
            </p>
            <p>
              <span className="font-medium">Çatdırılma ünvanı :</span> Nizami
              rayonu ,M.Abbasov küçəsi
            </p>
            <p>
              <span className="font-medium">Sifariş xülasəsi :</span> 1 məhsul
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <h2 className="text-xl font-medium text-gray-900">
              Sifarişin izlənilməsi
            </h2>
            <p className="text-gray-600">
              Çatdırılma nömrəsi :{" "}
              <span className="text-gray-900">#9581347322</span>
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs text-gray-500">Addım 1</p>
                <p className="mt-1 text-center text-sm font-medium text-gray-900">
                  Sifarişin təsdiqi
                </p>
              </div>

              <div className="mb-12 h-px flex-1 bg-gray-300" />

              <div className="flex flex-col items-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs text-gray-500">Addım 2</p>
                <p className="mt-1 text-center text-sm font-medium text-gray-900">
                  Sifarişin hazırlanılır
                </p>
              </div>

              <div className="mb-12 h-px flex-1 bg-gray-300" />

              <div className="flex flex-col items-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-green-500 bg-white">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <p className="text-xs text-gray-500">Addım 3</p>
                <p className="mt-1 text-center text-sm font-medium text-gray-900">
                  Sifarişiniz yoldadır
                </p>
              </div>

              <div className="mb-12 h-px flex-1 bg-gray-300" />

              <div className="flex flex-col items-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span className="text-sm font-medium text-gray-400">4</span>
                </div>
                <p className="text-xs text-gray-500">Addım 4</p>
                <p className="mt-1 text-center text-sm font-medium text-gray-900">
                  Sifarişiniz çatdırıldı
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="mb-4 flex items-center gap-2 text-blue-500 hover:text-blue-600"
            >
              <span className="font-medium">İzləmə təfərrüatları</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  isDetailsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDetailsOpen && (
              <div className="relative pl-6">
                <div className="absolute left-2 top-0 h-full w-px bg-gray-200" />
                <div className="relative mb-6">
                  <div className="absolute -left-[1.3rem] top-1 h-3 w-3 rounded-full border-2 border-green-500 bg-white">
                    <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500" />
                  </div>
                  <div className="mb-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                    CARI
                  </div>
                  <p className="font-medium text-gray-900">
                    Sifarişiniz hazırlanılır
                  </p>
                  <p className="text-sm text-gray-500">05.09.2025 11:24</p>
                </div>

                <div className="relative mb-6">
                  <div className="absolute -left-[1.3rem] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-2 w-2 text-white" />
                  </div>
                  <p className="text-gray-600">
                    Sifarişiniz hazırlanmağa başlanılır
                  </p>
                  <p className="text-sm text-gray-500">05.09.2025 11:24</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[1.3rem] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-2 w-2 text-white" />
                  </div>
                  <p className="text-gray-600">Sifarişiniz artıq təsdiqlənib</p>
                  <p className="text-sm text-gray-500">05.09.2025 11:24</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-medium text-gray-900">
            Ödəniş detalları
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Qiymət</span>
              <span className="font-medium">1250 AZN</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Çatdırılma</span>
              <span className="font-medium">20 AZN</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg">
                <span className="font-medium text-gray-900">Toplam</span>
                <span className="font-semibold text-gray-900">1270 AZN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
