'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdatePasswordMutation } from '@/services/auth/mutations'

const Security = () => {  
  const { mutate: updatePassword } = useUpdatePasswordMutation();
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  
  return (
    <Card>
      <CardHeader className="max-md:p-4">
        <CardTitle className="flex text-2xl font-medium items-center gap-2 max-md:text-xl">
          Təhlükəsizlik
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-24 max-md:space-y-4 max-md:p-4 max-md:pt-0 max-md:pb-12">
        <div className="space-y-6 max-md:space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-4 max-md:text-base max-md:mb-3">Şifrə dəyişmə</h3>
            <div className="grid grid-cols-2 gap-6 w-full max-md:grid-cols-1 max-md:gap-4">
              <div className="space-y-2 w-full">
                <Label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-gray-700 max-md:text-xs"
                >
                  Şifrə
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Şifrənizi daxil edin"
                  className="h-12 rounded-lg w-full max-md:h-10 max-md:text-sm"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-gray-700 max-md:text-xs"
                >
                  Yeni şifrə
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Yeni şifrənizi daxil edin"
                  className="h-12 rounded-lg w-full max-md:h-10 max-md:text-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end max-md:justify-center">
          <Button className="bg-[#E23359] hover:bg-purple-700 cursor-pointer rounded-[16px] max-md:w-full max-md:h-10"
           onClick={() => updatePassword({ old_password: currentPassword, password: newPassword, password_confirmation: newPassword })} disabled={!currentPassword || !newPassword}>
            Dəyişiklikləri yadda saxla
          </Button>
        </div>

        </div>

       
      </CardContent>
    </Card>
  )
}

export default Security
