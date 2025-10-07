"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useQuery } from "@tanstack/react-query"
import { getFaqsOptions } from "@/services/Home/Faqs/queries"

export function FaqSection() {
  const { data, isLoading, isError, error } = useQuery(getFaqsOptions());
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-0 mx-auto py-6">
      <Tabs defaultValue="shopping" className="w-full">
        <TabsList className="max-w-4xl mx-auto grid w-full grid-cols-1 sm:grid-cols-3 mb-8 p-1 rounded-4xl h-auto">
         {data?.map((item, index) => (
          <TabsTrigger key={index} value={item.name} className="rounded-4xl text-sm sm:text-base py-3 px-4">{item.name}</TabsTrigger>
         ))}
        </TabsList>
        {data?.map((item, index) => (
          <TabsContent key={index} value={item.name}>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full flex flex-col gap-2">
              {item.faqs.map((faq, index) => (
                <AccordionItem key={index} value={faq.question} className="border-b-0  border-1 border-[#F3F2F8] rounded-[16px] bg-[#FBFDFF] ">
                  <AccordionTrigger className="text-left font-medium  px-3 sm:px-4 text-sm sm:text-base  ">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 space-y-2  px-4 ">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
