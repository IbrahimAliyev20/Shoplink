'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Trash } from 'lucide-react'
import { PAYMENT_METHODS } from '@/utils/static'

interface PaymentMethod {
  id: string
  name: string
  enabled: boolean
}

function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(PAYMENT_METHODS)

  const handleTogglePaymentMethod = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === id 
          ? { ...method, enabled: !method.enabled }
          : method
      )
    )
  }


  return (
    <Card>
      <CardHeader className="max-md:p-4">
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-3">
          <CardTitle className="text-2xl font-medium max-md:text-xl">
            Ödəniş metodları
          </CardTitle>
          <Button className="bg-[#E23359] hover:bg-purple-700 cursor-pointer rounded-[10px] max-md:w-full max-md:h-10">
            Əlavə et
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-md:space-y-3 max-md:p-4 max-md:pt-0">
        <div className="space-y-4 max-md:space-y-3">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className="flex items-center justify-between p-4 border border-[#F3F2F8] rounded-lg bg-[#FBFDFF] max-md:p-3"
            >
              <div className="flex items-center">
                <span className="text-gray-900 font-medium max-md:text-sm">
                  {method.name}
                </span>
              </div>
              <div className='flex items-center gap-4 max-md:gap-3'>
              
              <Switch
                checked={method.enabled}
                onCheckedChange={() => handleTogglePaymentMethod(method.id)}
                className="data-[state=checked]:bg-green-500 max-md:scale-90"
              />
              <Trash className="h-5 w-5 text-gray-600 cursor-pointer max-md:h-4 max-md:w-4" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentMethods