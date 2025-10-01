"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFaqsOptions } from "@/services/Home/Faqs/queries";

function Support() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const { data: faqsData, isLoading, error } = useQuery(getFaqsOptions());

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getCurrentFaqs = () => {
    const dataToUse = faqsData && faqsData.length > 0 ? faqsData : [];
    return dataToUse[activeTab]?.faqs || [];
  };

  const getFaqsData = () => {
    return faqsData && faqsData.length > 0 ? faqsData : [];
  };

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-medium text-gray-900 mb-2 max-sm:text-xl max-sm:font-semibold max-sm:mb-4">
        Dəstək
      </h1>

      {getFaqsData().length > 0 && (
        <div className="border-b border-gray-200 mb-6 max-sm:mb-4">
          <nav className="flex space-x-8 max-sm:space-x-4 max-sm:overflow-x-auto max-sm:pb-2">
            {getFaqsData().map((faq, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap max-sm:text-xs max-sm:py-1.5 ${
                  activeTab === index
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {faq.name}
              </button>
            ))}
          </nav>
        </div>
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

      {!isLoading && !error && getCurrentFaqs().length > 0 && (
        <div className="space-y-4 max-sm:space-y-3">
          {getCurrentFaqs().map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-4 max-sm:pb-3"
            >
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full flex justify-between items-center text-left py-2 max-sm:py-1.5"
              >
                <span className="text-gray-800 font-medium max-sm:text-sm max-sm:pr-2">
                  {item.question}
                </span>
                <span className="text-gray-500 text-xl max-sm:text-lg flex-shrink-0">
                  {expandedItems.includes(index) ? "−" : "+"}
                </span>
              </button>
              {expandedItems.includes(index) && (
                <div className="mt-2 pl-4 max-sm:pl-2 max-sm:mt-1">
                  <p className="text-gray-600 text-sm leading-relaxed max-sm:text-xs max-sm:leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && getCurrentFaqs().length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Hal-hazırda məlumat mövcud deyil.
          </p>
        </div>
      )}
    </div>
  );
}

export default Support;
