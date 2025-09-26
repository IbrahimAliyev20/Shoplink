"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Eye, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPromocode } from "@/services/Promocode/api";
import {
  createPromocodeMutation,
  deletePromocodeMutation,
} from "@/services/Promocode/mutations";
import { toast } from "sonner";
import getPromocodeOptions from "@/services/Promocode/queries";
import EditPromocodeModal from "@/components/dashboard/modal/EditPromocodeModal";
import { Promocode } from "@/types";

function DiscountPage() {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(3);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPromocodeForEdit, setSelectedPromocodeForEdit] = useState<Promocode | null>(null);
  const queryClient = useQueryClient();

  const { data: promocode } = useQuery({
    queryKey: getPromocodeOptions().queryKey,
    queryFn: () => getPromocode(),
  });

  const { mutate: createPromocode } = useMutation({
    ...createPromocodeMutation(),
    onSuccess: () => {
      toast.success("Promo kod uğurla əlavə edildi");
      queryClient.invalidateQueries({
        queryKey: getPromocodeOptions().queryKey,
      });
      setPromoCode("");
      setDiscountPercent("");
    },
    onError: () => {
      toast.error("Promo kod əlavə edilərkən xəta baş verdi");
    },
  });

  const handleCreatePromocode = () => {
    const formData = new FormData();
    formData.append("name", promoCode);
    formData.append("discount", discountPercent);
    createPromocode(formData);
  };

  const mutation = useMutation({
    ...deletePromocodeMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getPromocodeOptions().queryKey,
      });
    },
  });
  const handleDeleteProduct = (promoCodeId: number) => {
    mutation.mutate(promoCodeId);
    toast.success("Promo kod uğurla silindi");
  };

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };
  const handleEditProduct = (promoCodeId: number) => {
    const promocodeToEdit = promocode?.find(p => p.id === promoCodeId);
    setSelectedPromocodeForEdit(promocodeToEdit || null);
    setIsEditModalOpen(true);
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6 bg-white border border-gray-200 rounded-lg mb-8">
        <h2 className="text-lg font-medium mb-4">Yeni promo kod əlavə et</h2>
        <div className="flex gap-4 items-center max-sm:flex-col">
          <Input
            type="text"
            placeholder="Promo kodu daxil edin"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="bg-gray-100 border-transparent rounded-lg h-12 px-4 flex-grow max-sm:w-full focus:ring-pink-500 focus:border-pink-500"
          />
          <Input
            type="text"
            placeholder="Endirim faizi"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            className="bg-gray-100 border-transparent rounded-lg h-12 px-4  max-sm:w-full focus:ring-pink-500 focus:border-pink-500"
          />
          <Button
            className="h-12 px-8 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg max-sm:h-10 max-sm:px-4 max-sm:w-full flex-shrink-0"
            onClick={handleCreatePromocode}
          >
            Əlavə et
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white max-sm:overflow-x-auto">
        <div className="max-sm:min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-16 text-center font-medium text-gray-700 max-sm:text-xs max-sm:font-normal ">
                  №
                </TableHead>
                <TableHead className="text-center font-medium text-gray-700 max-sm:text-xs max-sm:font-normal">
                  Promokod adı ↑↓
                </TableHead>
                <TableHead className="text-center font-medium text-gray-700 max-sm:text-xs max-sm:font-normal">
                  Endirim dəyəri ↑↓
                </TableHead>
                <TableHead className="text-center font-medium text-gray-700 max-sm:text-xs max-sm:font-normal">
                  Əməliyyatlar
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promocode?.map((promocode) => (
                <TableRow
                  key={promocode.id}
                  className="border-b border-gray-100"
                >
                  <TableCell className="text-center max-sm:px-2">
                    <Checkbox
                      checked={selectedProducts.includes(promocode.id)}
                      onCheckedChange={() => handleSelectProduct(promocode.id)}
                      className="max-sm:w-5 max-sm:h-5"
                    />
                  </TableCell>

                  <TableCell className="text-gray-800 text-center max-sm:text-xs max-sm:px-2">
                    {promocode.name}
                  </TableCell>

                  <TableCell className="text-gray-800 text-center font-medium max-sm:text-xs max-sm:px-2">
                    {promocode.discount} %
                  </TableCell>

                  <TableCell className="text-center max-sm:px-2 ">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 p-0 hover:bg-gray-100 rounded-full max-sm:w-6 max-sm:h-6"
                    >
                      <Eye className="w-5 h-5 text-blue-500 max-sm:w-4 max-sm:h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 p-0 hover:bg-gray-100 rounded-full max-sm:w-6 max-sm:h-6"
                      onClick={() => handleEditProduct(promocode.id)}
                   >
                      <Edit className="w-5 h-5 text-gray-500 max-sm:w-4 max-sm:h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 p-0 hover:bg-gray-100 rounded-full max-sm:w-6 max-sm:h-6"
                      onClick={() => handleDeleteProduct(promocode.id)}
                    >
                      <Trash2 className="w-5 h-5 text-red-500 max-sm:w-4 max-sm:h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Pagination className="mt-6 flex justify-end max-sm:justify-center max-sm:mt-4">
          <PaginationContent className="max-sm:gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
                className={`${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                } max-sm:h-8 max-sm:px-2 max-sm:text-xs`}
              />
            </PaginationItem>
            <PaginationItem className="max-sm:hidden">
              <PaginationLink
                href="#"
                isActive={currentPage === 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(1);
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="max-sm:hidden">
              <span className="px-2 py-1 text-gray-500">...</span>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 2}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(2);
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 3}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(3);
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 4}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(4);
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 5}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(5);
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="max-sm:hidden">
              <span className="px-2 py-1 text-gray-500">...</span>
            </PaginationItem>
            <PaginationItem className="max-sm:hidden">
              <PaginationLink
                href="#"
                isActive={currentPage === 9}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(9);
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                9
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.min(9, p + 1));
                }}
                className={`${
                  currentPage === 9 ? "pointer-events-none opacity-50" : ""
                } max-sm:h-8 max-sm:px-2 max-sm:text-xs`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {isEditModalOpen && (
        <EditPromocodeModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedPromocodeForEdit(null);
          }}
          promocode={selectedPromocodeForEdit}
        />
      )}
    </div>
  );
}

export default DiscountPage;
