"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit,  Trash2, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPromocode } from "@/services/Promocode/api";
import {
  createPromocodeMutation,
  deletePromocodeMutation,
  changePromocodeStatusMutation,
} from "@/services/Promocode/mutations";
import { toast } from "sonner";
import getPromocodeOptions from "@/services/Promocode/queries";
import EditPromocodeModal from "@/components/dashboard/modal/EditPromocodeModal";
import { Promocode } from "@/types";
import ReusablePagination from "../ReusablePagination";

function DiscountPage() {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPromocodeForEdit, setSelectedPromocodeForEdit] =
    useState<Promocode | null>(null);

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

  const { mutate: deletePromocode } = useMutation({
    ...deletePromocodeMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getPromocodeOptions().queryKey,
      });
    },
  });

  const { mutate: changeStatus } = useMutation({
    ...changePromocodeStatusMutation(),
    onSuccess: () => {
      toast.success("Promo kod statusu dəyişdirildi");
      queryClient.invalidateQueries({
        queryKey: getPromocodeOptions().queryKey,
      });
    },
    onError: () => {
      toast.error("Status dəyişdirilərkən xəta baş verdi");
    },
  });

  const handleDeleteProduct = (promoCodeId: number) => {
    deletePromocode(promoCodeId);
    toast.success("Promo kod uğurla silindi");
  };

  const handleChangeStatus = (promoCodeId: number) => {
    const formData = new FormData();
    formData.append("id", promoCodeId.toString());
    changeStatus(formData);
  };

  const handleEditProduct = (promoCodeId: number) => {
    const promocodeToEdit = promocode?.find((p) => p.id === promoCodeId);
    setSelectedPromocodeForEdit(promocodeToEdit || null);
    setIsEditModalOpen(true);
  };

  // Pagination logic
  const itemsPerPage = 5;
  const totalItems = promocode?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = promocode?.slice(startIndex, endIndex) || [];

  return (
    <div className="bg-gray-50">
      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">
              Yeni promo kod əlavə et
            </h2>
            <div className="flex justify-between gap-20 items-center max-sm:flex-col max-sm:gap-3">
              <div className="w-full flex gap-8 items-center max-sm:flex-col max-sm:gap-3">
                <Input
                  type="text"
                  placeholder="Promo kodu daxil edin"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-[#F3F2F8] border border-[#F3F2F8] rounded-lg h-12  px-4 flex-1 max-sm:w-full focus:ring-pink-500 focus:border-pink-500"
                />
                <Input
                  type="text"
                  placeholder="Endirim faizi"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="bg-[#F3F2F8] border border-[#F3F2F8] rounded-lg h-12 px-4 flex-1 max-sm:w-full focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <Button
                className="h-12 px-10 bg-[#E23359] hover:bg-[#E23359]/90 text-white font-medium rounded-lg max-sm:h-12 max-sm:px-6 max-sm:w-full"
                onClick={handleCreatePromocode}
              >
                Əlavə et
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#F3F2F8]">
                  <TableHead className="text-gray-500 font-medium text-center">
                    №
                  </TableHead>
                  <TableHead className="text-black font-medium text-center">
                    <div className="flex items-center gap-1 justify-center">
                      Promokod adı
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-black font-medium text-center">
                    <div className="flex items-center gap-1 justify-center">
                      Endirim dəyəri
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-black font-medium text-center">
                    Əməliyyatlar
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.map((promocode ) => (
                  <TableRow
                    key={promocode.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="text-center py-4">
                      <Checkbox
                        checked={promocode.status === 1}
                        onCheckedChange={() => handleChangeStatus(promocode.id)}
                      />
                    </TableCell>
                    <TableCell className="text-gray-900 text-center py-4 font-medium">
                      {promocode.name}
                    </TableCell>
                    <TableCell className="text-gray-900 text-center py-4 font-medium">
                      {promocode.discount}%
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-600 hover:bg-gray-50 rounded-full"
                          onClick={() => handleEditProduct(promocode.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 rounded-full"
                          onClick={() => handleDeleteProduct(promocode.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

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
