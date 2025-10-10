"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import AccountCompletion, { AccountCompletionRef } from './tabs/AccountCompletion';
import PaymentMethod from './tabs/PaymentMethod';
import StoreLogo, { StoreLogoRef } from './tabs/StoreLogo';
import { getAllStoreQuery } from '@/services/Seller-services/store/allstore/queries';
import { getUserQuery } from '@/services/auth/queries';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ShopSetup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { data: storeData } = useQuery(getAllStoreQuery());
  const { data: userData } = useQuery(getUserQuery());
  const storeId = storeData?.id;
  const router = useRouter();

  const accountCompletionRef = useRef<AccountCompletionRef>(null);
  const storeLogoRef = useRef<StoreLogoRef>(null);

  const handleStepComplete = () => {
    setCurrentStep(currentStep + 1);
  };

  const steps = [
    {
      id: 1,
      title: 'Hesabı tamamla',
      component: () => userData?.data ? (
        <AccountCompletion
          ref={accountCompletionRef}
          user={userData.data}
          onStepComplete={handleStepComplete}
        />
      ) : <div>Loading...</div>
    },
    {
      id: 2,
      title: 'Mağaza dizaynı',
      component: () => (
        <StoreLogo
          ref={storeLogoRef}
          storeId={storeId}
          onStepComplete={handleStepComplete}
        />
      )
    },
    {
      id: 3,
      title: 'Ödəniş metodu',
      component: () => <PaymentMethod />
    },
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      if (accountCompletionRef.current) {
        if (!accountCompletionRef.current.isFormValid()) {
          toast.error("Bütün sahələri doldurun");
          return;
        }
        accountCompletionRef.current.handleSubmit();
      }
    } else if (currentStep === 2) {
      if (storeLogoRef.current) {
        if (!storeLogoRef.current.isFormValid()) {
          toast.error("Ən azı bir şəkil seçin");
          return;
        }
        storeLogoRef.current.handleSubmit();
      }
    } else if (currentStep === 3) {
      toast.success("Mağaza qurulumu tamamlandı!");
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentComponent = steps.find(step => step.id === currentStep)?.component;

  return (
    <div className="space-y-8 max-md:space-y-6">
      {/* BAŞLANĞIC: DÜZƏLİŞ EDİLMİŞ HİSSƏ */}
      <div className="flex items-center justify-start max-md:overflow-x-auto max-md:pb-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start  max-md:flex-shrink-0"> {/* items-center -> items-start olaraq dəyişdirildi */}
            <div className="flex flex-col items-center max-md:min-w-[120px] max-md:bg-gray-50 max-md:p-3 max-md:rounded-lg max-md:mx-1">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 max-md:w-10 max-md:h-10 max-md:flex-shrink-0 ${
                currentStep > step.id
                  ? 'bg-green-500 border-green-500 text-white'
                  : currentStep === step.id
                  ? ' border-green-500 text-white'
                  : 'border-gray-300  text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <Check className="w-6 h-6 max-md:w-5 max-md:h-5" />
                ) : currentStep === step.id ? (
                  <div className="w-4 h-4 bg-green-500 rounded-full max-md:w-3 max-md:h-3"></div>
                ) : (
                  <span className="text-base font-medium max-md:text-sm">{step.id}</span>
                )}
              </div>
              <div className="mt-3 text-center max-md:mt-2">
                <p className="text-xs text-gray-500 max-md:text-xs">Addım {step.id}</p>
                <p className="text-sm font-medium text-gray-900 max-md:text-xs max-md:font-semibold max-md:whitespace-nowrap">{step.title}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-24 h-0.5 mx-6 max-md:hidden mt-5 ${ /* mt-[23px] əlavə edildi */
                currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      {/* SON: DÜZƏLİŞ EDİLMİŞ HİSSƏ */}

      <div className="bg-white rounded-xl border border-[#f3f2f8] p-8 max-md:p-4 max-md:rounded-lg">
        {CurrentComponent && <CurrentComponent />}
      </div>

      <div className="flex justify-end gap-3 max-md:flex-col max-md:gap-3">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="text-black bg-white px-12 rounded-lg max-md:w-full max-md:h-12 max-md:order-2"
        >
          Geri
        </Button>

        <Button
          onClick={handleNext}
          className="bg-[#ff13f0] hover:bg-[#ff42f3] text-white px-8 max-md:w-full max-md:h-12 max-md:order-1"
        >
          {currentStep === 3 ? "Təsdiqlə" : "Davam et"}
        </Button>
      </div>
    </div>
  );
};

export default ShopSetup;