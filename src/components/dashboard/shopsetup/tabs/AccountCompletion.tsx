"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserData } from "@/types";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserMutation } from "@/services/auth/updateUser/mutations"; // Düzgün yolu öz proyektinizə görə qeyd edin
import { getUserQuery } from "@/services/auth/queries";

interface AccountCompletionProps {
  user: UserData;
  onStepComplete?: () => void;
}

export interface AccountCompletionRef {
  handleSubmit: () => void;
  isFormValid: () => boolean;
}

const AccountCompletion = React.forwardRef<AccountCompletionRef, AccountCompletionProps>(
  ({ onStepComplete }, ref) => {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending } = useMutation({
      ...updateUserMutation(),
      onSuccess: () => {
        queryClient.invalidateQueries(getUserQuery());
        toast.success("Məlumatlar uğurla yadda saxlanıldı");
        if (onStepComplete) {
          onStepComplete();
        }
      },
      onError: (error) => {
        toast.error("Xəta baş verdi: " + error.message);
      },
    });

    const [voen, setVoen] = useState("");
    const [fin, setFin] = useState("");
    const [type, setType] = useState("");
    const [region, setRegion] = useState("");

    const isFormValid = () => Boolean(voen && fin && type && region);

    const handleSubmit = () => {
      if (!isFormValid()) {
        toast.error("Bütün tələb olunan sahələri doldurun");
        return;
      }

      const formdata = new FormData();
      formdata.append("voen", voen);
      formdata.append("fin", fin);
      formdata.append("type", type);
      formdata.append("region", region);
      
      updateUser(formdata);
    };

    React.useImperativeHandle(ref, () => ({
      handleSubmit,
      isFormValid,
    }));

    return (
      <div className="space-y-6 max-md:space-y-4">
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2 max-md:text-xl max-md:mb-3">
            Hesabı Tamamla
          </h2>
     
        </div>

        <form className="space-y-6 max-md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:grid-cols-1 max-md:gap-4">
            <div className="space-y-2 max-md:space-y-1">
              <label className="text-sm font-medium text-gray-700 max-md:text-xs">
                VÖEN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="VÖEN-i daxil edin"
                value={voen}
                onChange={(e) => setVoen(e.target.value)}
                required={true}
                disabled={isPending}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed max-md:h-10 max-md:text-sm max-md:px-3"
              />
            </div>

            <div className="space-y-2 max-md:space-y-1">
              <label className="text-sm font-medium text-gray-700 max-md:text-xs">
                FİN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="FİN kodunuzu daxil edin"
                value={fin}
                onChange={(e) => setFin(e.target.value)}
                required={true}
                disabled={isPending}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed max-md:h-10 max-md:text-sm max-md:px-3"
              />
            </div>

            <div className="space-y-2 max-md:space-y-1">
              <label className="text-sm font-medium text-gray-700 max-md:text-xs">
                Üzvlük tipi <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={setType} value={type} disabled={isPending}>
                <SelectTrigger className="w-full max-md:h-10 max-md:text-sm">
                  <SelectValue placeholder="Üzvlük tipini seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Fiziki şəxs</SelectItem>
                  <SelectItem value="2">Hüquqi şəxs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 max-md:space-y-1">
              <label className="text-sm font-medium text-gray-700 max-md:text-xs">
                Bölgə <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={setRegion} value={region} disabled={isPending}>
                <SelectTrigger className="w-full max-md:h-10 max-md:text-sm">
                  <SelectValue placeholder="Bölgəni seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baku">Bakı</SelectItem>
                  <SelectItem value="ganja">Gəncə</SelectItem>
                  <SelectItem value="sumgait">Sumqayıt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

AccountCompletion.displayName = "AccountCompletion";

export default AccountCompletion;