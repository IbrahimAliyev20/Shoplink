"use client";

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const PaymentMethod: React.FC = () => {
  const [cashPayment, setCashPayment] = useState(true);

  return (
    <div className="space-y-8 max-md:space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 max-md:text-xl max-md:mb-3">Ödəniş metodu</h2>
        <p className="text-gray-600 max-md:text-sm">Sizə uyğun olan ödəniş metodunu seçin</p>
      </div>

      {/* Nağd ödəmələr */}
      <div className="space-y-4 max-md:space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 max-md:text-base">Nağd ödəmələr</h3>
        <div className="flex items-center space-x-3 max-md:space-x-2">
          <Checkbox
            id="cash-payment"
            checked={cashPayment}
            onCheckedChange={(checked) => setCashPayment(checked as boolean)}
            className="max-md:scale-90" 
          />
          <label htmlFor="cash-payment" className="text-sm font-medium text-gray-700 max-md:text-xs">
            Nağd ödəniş
          </label>
        </div>
      </div>

   
    </div>
  );
};

export default PaymentMethod;
