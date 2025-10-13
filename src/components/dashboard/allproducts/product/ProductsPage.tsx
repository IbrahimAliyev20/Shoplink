"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Eye, Edit, Trash2, ArrowUpDown, X,  } from "lucide-react";
import Link from "next/link";
import { productQueries } from "@/services/Seller-services/product/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductMutation } from "@/services/Seller-services/product/mutations";
import { toast } from "sonner";
import ReusablePagination from "../../ReusablePagination";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const queryClient = useQueryClient();
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
    <div className="bg-gray-50">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-medium text-gray-900">
              Məhsullar
            </h1>
            <Button
              variant="default"
              onClick={() => router.push("/dashboard/products/create")}
              className="bg-[#E23359] hover:bg-[#E23359]/90 text-white font-medium py-2 px-6 rounded-lg cursor-pointer"
            >
              Məhsul əlavə et
            </Button>
          </div>
      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-6">
        

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Məhsul axtarın"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
           
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#F3F2F8]">
                  <TableHead className="text-gray-500 font-medium text-center">№</TableHead>
                  <TableHead className="text-gray-500 font-medium text-center">
                    <div className="flex items-center gap-1 justify-center">
                      Məhsul
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium">
                    <div className="flex items-center gap-1 justify-center">
                      Satış qiyməti
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium">
                    <div className="flex items-center gap-1 justify-center">
                      Alış qiyməti
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium">
                    <div className="flex items-center gap-1 justify-center">
                      Stok məlumatı
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium text-center">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <TableRow
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <TableCell className="font-medium text-gray-900 py-4">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3 ">
                          <Image
                            src={product.thumb_image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                          <span className="font-medium text-gray-900">
                            {product.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className=" text-gray-700 font-medium py-4 text-center">
                        {product.detail?.sales_price || "N/A"} AZN
                      </TableCell>
                      <TableCell className=" text-gray-700 font-medium py-4 text-center">
                        {product.detail?.purchase_price || "N/A"} AZN
                      </TableCell>
                      <TableCell className="py-4 text-center">
                        {product.detail?.stock === null || product.detail?.stock === 0 ? (
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-red-500" />
                            <span className="text-red-600 text-sm font-medium">Stokda yoxdur</span>
                          </div>
                        ) : (
                          <span className="text-gray-700 font-medium text-center">
                            {product.detail?.stock}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            asChild
                          >
                            <Link href={`/dashboard/products/preview/${product.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                            asChild
                          >
                            <Link href={`/dashboard/products/edit/${product.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center">
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
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-end">
              <ReusablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
