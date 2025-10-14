"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePasswordMutation } from "@/services/auth/mutations";    

const Security = () => {
  const { mutate: updatePassword } = useUpdatePasswordMutation();
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  return (
    <Card className="bg-white border-none shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="flex text-2xl font-medium items-center gap-2 max-sm:text-xl max-sm:font-semibold">
          Təhlükəsizlik
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-0 max-sm:space-y-4">
        <div className="space-y-6 max-sm:space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-4 max-sm:text-base max-sm:mb-3">
              Şifrə dəyişmə
            </h3>
            <div className="grid grid-cols-2 gap-6 w-full max-sm:grid-cols-1 max-sm:gap-4">
              <div className="space-y-2 w-full max-sm:space-y-1.5">
                <Label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-gray-700 max-sm:text-xs"
                >
                  Şifrə
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Şifrənizi daxil edin"
                  className="h-12 rounded-lg w-full max-sm:h-10 max-sm:text-sm"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2 w-full max-sm:space-y-1.5">
                <Label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-gray-700 max-sm:text-xs"
                >
                  Yeni şifrə
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Yeni şifrənizi daxil edin"
                  className="h-12 rounded-lg w-full max-sm:h-10 max-sm:text-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end max-sm:justify-center">
            <Button onClick={() => updatePassword({ old_password: currentPassword, password: newPassword, password_confirmation: newPassword })} className="h-12 bg-[#E23359] hover:bg-[#E23359]/90 cursor-pointer rounded-[12px] max-sm:w-full max-sm:text-sm max-sm:py-2.5">
              Dəyişiklikləri yadda saxla
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Security;
