"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye, Edit, Trash2, Watch, ListFilter } from "lucide-react";
import Link from "next/link";
import { productQueries } from "@/services/Seller-services/product/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductMutation } from "@/services/Seller-services/product/mutations";
import { toast } from "sonner";
import ReusablePagination from "../../ReusablePagination";
import { categoryQueries } from "@/services/Seller-services/category/queries";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const queryClient = useQueryClient();
  const { data: categories } = useQuery({ ...categoryQueries.all() });
  const { data: allProducts } = useQuery({ ...productQueries.all() });

  const filteredProducts =
    allProducts?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const products = filteredProducts.slice(startIndex, endIndex);

  const mutation = useMutation({
    ...deleteProductMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productQueries.all().queryKey,
      });
    },
  });

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = (id: number) => {
    mutation.mutate(id);
    toast.success("Məhsul uğurla silindi");
  };

  return (
    <div className="space-y-6 max-sm:space-y-4">
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:space-y-3">
        <h1 className="text-3xl font-medium text-gray-900 max-sm:text-2xl max-sm:font-semibold">
          Məhsullar
        </h1>
        <Button
          disabled={categories?.length === 0} 
          variant="default"
          onClick={() => router.push("/dashboard/products/create")}
          className="bg-pink-500 hover:bg-pink-600 text-white max-sm:w-full max-sm:text-sm max-sm:py-2.5"
        >
          Məhsul əlavə et
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 max-sm:p-4">
          <div className="flex items-center justify-between space-x-4 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-3 max-sm:items-stretch">
            <div className="min-w-sm relative max-sm:w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 max-sm:h-3 max-sm:w-3" />
              <Input
                type="text"
                placeholder="Məhsul axtarın"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-sm:pl-8 max-sm:h-10 max-sm:text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 max-sm:w-full max-sm:h-10 max-sm:text-sm max-sm:space-x-1.5"
            >
              <ListFilter className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="max-sm:min-w-[700px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      №
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Məhsul
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Satış qiyməti
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Alış qiyməti
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Stok məlumatı
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Əməliyyatlar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                          {product.id}
                        </td>
                        <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                          <div className="flex items-center space-x-3 max-sm:space-x-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center max-sm:w-6 max-sm:h-6">
                              <Watch className="h-4 w-4 text-orange-600 max-sm:h-3 max-sm:w-3" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 max-sm:text-xs">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                          {product.detail?.sales_price || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                          {product.detail?.purchase_price || "N/A"}
                        </td>
                        <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                          {product.detail?.stock ? (
                            typeof product.detail.stock === "string" ? (
                              <span className="inline-flex items-center space-x-1 text-sm text-red-600 max-sm:text-xs max-sm:space-x-0.5">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full max-sm:w-1 max-sm:h-1"></span>
                                <span>{product.detail.stock}</span>
                              </span>
                            ) : (
                              <span className="text-sm text-gray-900 max-sm:text-xs">
                                {product.detail.stock}
                              </span>
                            )
                          ) : (
                            <span className="text-sm text-gray-900 max-sm:text-xs">
                              N/A
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                          <div className="flex items-center justify-start space-x-2 max-sm:space-x-1">
                            <Link
                              href={`/dashboard/products/preview/${product.id}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors max-sm:p-1.5"
                            >
                              <Eye className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                            </Link>
                            <Link
                              href={`/dashboard/products/edit/${product.id}`}
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors max-sm:p-1.5"
                            >
                              <Edit className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors max-sm:p-1.5"
                            >
                              <Trash2 className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Search className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="text-gray-500">
                            {searchTerm ? (
                              <>
                                <p className="text-lg font-medium">
                                  Axtarışa uyğun məhsul tapılmadı
                                </p>
                                <p className="text-sm mt-1">
                                  {searchTerm} üçün nəticə yoxdur
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-lg font-medium">
                                  Hələ məhsul əlavə edilməyib
                                </p>
                                <p className="text-sm mt-1">
                                  İlk məhsulunuzu əlavə etmək üçün Məhsul əlavə
                                  et düyməsini basın
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
