"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ReusablePagination from "../ReusablePagination"; // Bu komponentin yolunu yoxlayın
import { getClientsQuery } from "@/services/Seller-services/clients/queries"; // Düzgün yolu qeyd edin
import { ClientsResponse } from "@/types"; // Düzgün yolu qeyd edin

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: clientsResponse, isLoading, isError, error } = useQuery(getClientsQuery(currentPage));
  
  const clientsData = clientsResponse?.data || [];
  const meta = clientsResponse?.meta;

  const filteredClients =
    clientsData.filter(
      (client: ClientsResponse) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Axtarış dəyişdikdə birinci səhifəyə qayıt
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className=" bg-white ">
        <Card className="border-none shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-3">
                <div className="animate-spin w-8 h-8 border-4 border-[#F3F2F8] border-t-pink-500 rounded-full mx-auto" />
                <p className="text-gray-500">Müştərilər yüklənir...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className=" bg-white ">
        <Card className="border-none shadow-none">
          <CardContent className="p-6">
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-red-600 font-medium">Xəta baş verdi</p>
                <p className="text-gray-600 text-sm mt-1">{error?.message || 'Müştəriləri yükləyərkən xəta baş verdi'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className=" bg-white rounded-lg border border-[#F3F2F8] ">
      <Card className="border-none shadow-none">
        <CardContent className="p-4 max-sm:p-4">
          <div className="flex items-center space-x-4 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-3 max-sm:items-stretch">
            <div className="relative flex-1 max-w-md max-sm:max-w-none">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 max-sm:h-3 max-sm:w-3" />
              <Input
                type="text"
                placeholder="Məhsul axtarın"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-sm:h-10 max-sm:text-sm py-5.5"
              />
            </div>
        
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="max-sm:min-w-[800px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F3F2F8]">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">№</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Müştəri</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Telefon nömrəsi</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Ümumi sifariş</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Yaranma tarixi</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr
                      key={client.id}
                      className="border-b border-[#F3F2F8] hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-sm text-gray-900">{client.id}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">{client.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">{client.email || "Yoxdur"}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{client.phone}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{client.order_count}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{client.created_at}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-start space-x-2">
                          <Link
                            href={`/dashboard/customers/preview/${client.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end space-x-2">
        {meta && meta.last_page > 1 && (
          <ReusablePagination
            currentPage={currentPage}
            totalPages={meta.last_page}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      </div>
  );
}