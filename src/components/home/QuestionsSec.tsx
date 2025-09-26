
"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSetupOptions } from "@/services/Setup/queries";




export default function QuestionsSec() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const { data, isLoading, isError, error } = useQuery(getSetupOptions());
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <section >
      
    <div className="grid lg:grid-cols-7 gap-12 items-center">
          {/* Left side - Image */}
     <div className="lg:col-span-3" >
     <Image 
      src="/images/Card.svg" 
      alt="Questions" 
      width={500} 
      height={500} 
      className="w-full h-auto object-cover rounded-lg" 
      />
     </div>
          {/* Right side - Questions */}
          <div className="order-1 lg:order-2 lg:col-span-4">
            <h2 className="text-[40px] font-medium text-gray-900 mb-8 leading-tight text-center  ">
              E-ticarət saytı necə qurulur?
            </h2>
            
            <div className="space-y-4">
              {data?.map((q, index) => (
                <div key={index} className="rounded-lg ">
                  <button
                    onClick={() => toggleQuestion(index + 1)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-gray-900">{index + 1}.</span>
                      <span className="text-lg font-medium text-gray-900">{q.title}</span>
                    </div>
                    {openQuestion === index + 1 ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {openQuestion === index + 1 && (
                    <div className="px-6 pb-4">
                      <div className="pl-8 text-gray-600 leading-relaxed">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{q.description}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}