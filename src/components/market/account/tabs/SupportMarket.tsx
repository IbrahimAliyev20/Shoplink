"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFaqsOptions } from "@/services/Home/Faqs/queries";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

function SupportMarket() {
  const [activeTab, setActiveTab] = useState(0);

  const { data: faqsData, isLoading, error } = useQuery(getFaqsOptions());



  const getCurrentFaqs = () => {
    const dataToUse = faqsData && faqsData.length > 0 ? faqsData : [];
    return dataToUse[activeTab]?.faqs || [];
  };

  const getFaqsData = () => {
    return faqsData && faqsData.length > 0 ? faqsData : [];
  };

  return (
    <Card>
      <CardHeader className="max-md:p-4">
        <CardTitle className="flex text-2xl font-medium items-center gap-2 max-md:text-xl">
          Dəstək
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 max-md:space-y-4 max-md:p-4 max-md:pt-0">
        {getFaqsData().length > 0 && (
          <Tabs value={activeTab.toString()} onValueChange={(value) => setActiveTab(parseInt(value))} className="w-full">
            <TabsList className="max-w-3xl mx-auto flex w-full overflow-x-auto sm:grid sm:grid-cols-3 mb-6 p-1 rounded-4xl h-auto scrollbar-hide bg-[#F2F4F8]">
              {getFaqsData().map((faq, index) => (
                <TabsTrigger key={index} value={index.toString()} className="rounded-4xl text-sm sm:text-base py-3 px-4 whitespace-nowrap">
                  {faq.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {getFaqsData().map((faq, index) => (
              <TabsContent key={index} value={index.toString()}>
                <Accordion type="single" collapsible className="w-full flex flex-col gap-2">
                  {getCurrentFaqs().map((item, faqIndex) => (
                    <AccordionItem key={faqIndex} value={item.question} className="border-b-0 border-1 border-[#F3F2F8] rounded-[16px] bg-[#FBFDFF]">
                      <AccordionTrigger className="text-left font-medium px-3 sm:px-4 text-sm sm:text-base">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 space-y-2 px-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            <span className="ml-2 text-gray-600">Yüklənir...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm">
              FAQ məlumatları yüklənərkən xəta baş verdi. Zəhmət olmasa səhifəni
              yenidən yükləyin.
            </p>
          </div>
        )}

        {!isLoading && !error && getCurrentFaqs().length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Hal-hazırda məlumat mövcud deyil.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SupportMarket;
