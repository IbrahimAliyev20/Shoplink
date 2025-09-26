"use client";

import React, { useState } from "react";

function Support() {
  const [activeTab, setActiveTab] = useState("registration");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const registrationFaqs = [
    {
      question: "Necə qeydiyyatdan keçə bilərəm?",
      answer: "• Ana səhifədə \"Hesab\" düyməsinə klikləyib məlumatlarını daxil etməklə qeydiyyatdan keçə bilərsiniz."
    },
    {
      question: "Nə üçün qeydiyyatdan keçməliyəm?",
      answer: "Qeydiyyatdan keçməklə sifarişlərinizi izləyə, ünvanlarınızı idarə edə və xüsusi təkliflərdən yararlana bilərsiniz."
    },
    {
      question: "Qeydiyyat üçün hansı məlumatlar lazımdır?",
      answer: "Ad, soyad, email ünvanı və telefon nömrəsi kifayətdir. Parol təyin etməyi unutmayın."
    },
    {
      question: "Email təsdiqləmə necə işləyir?",
      answer: "Qeydiyyatdan sonra email ünvanınıza təsdiq linki göndəriləcək. Bu linkə klikləyərək hesabınızı aktivləşdirin."
    }
  ];

  const orderDeliveryFaqs = [
    {
      question: "Sifarişimi necə ləğv edə bilərəm?",
      answer: "Sifarişinizi ləğv etmək üçün sifarişlərim bölməsinə keçin və 'Ləğv et' düyməsini basın. Sifariş göndərilməmişdirsə, tam geri qaytarma mümkündür."
    },
    {
      question: "Çatdırılma müddəti nə qədərdir?",
      answer: "Bakı üçün çatdırılma müddəti 1-2 iş günü, digər şəhərlər üçün 3-5 iş günüdür. Çatdırılma haqqı 100 AZN-dən yuxarı sifarişlərdə pulsuzdur."
    },
    {
      question: "Qaytarma siyasəti necədir?",
      answer: "Məhsulları 14 gün ərzində qaytara bilərsiniz. Məhsul orijinal vəziyyətdə olmalıdır. Qaytarma haqqı bizim tərəfimizdən ödənilir."
    },
    {
      question: "Ödəniş üsulları hansılardır?",
      answer: "Bank kartı, nağd ödəniş və online ödəniş sistemləri ilə ödəniş edə bilərsiniz. Bütün ödənişlər SSL şifrələmə ilə qorunur."
    }
  ];

  const aboutShoplinkFaqs = [
    {
      question: "Shoplink nədir?",
      answer: "Shoplink Azərbaycanın aparıcı onlayn alış-veriş platformasıdır. Müxtəlif kateqoriyalarda məhsullar təqdim edirik."
    },
    {
      question: "Şirkət haqqında məlumat",
      answer: "2020-ci ildə yaradılan Shoplink, müştəri məmnuniyyətini ən yüksək prioritet kimi qəbul edir."
    },
    {
      question: "Məhsul keyfiyyəti necə təmin edilir?",
      answer: "Bütün məhsullar keyfiyyət yoxlamasından keçir və orijinal zəmanət ilə təqdim edilir."
    },
    {
      question: "Müştəri xidmətləri necədir?",
      answer: "7/24 müştəri dəstəyi, sürətli çatdırılma və rahat qaytarma siyasəti ilə xidmətinizdəyik."
    }
  ];

  const getCurrentFaqs = () => {
    switch (activeTab) {
      case "registration":
        return registrationFaqs;
      case "order":
        return orderDeliveryFaqs;
      case "about":
        return aboutShoplinkFaqs;
      default:
        return registrationFaqs;
    }
  };

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-medium text-gray-900 mb-2 max-sm:text-xl max-sm:font-semibold max-sm:mb-4">
        Dəstək
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 max-sm:mb-4">
        <nav className="flex space-x-8 max-sm:space-x-4 max-sm:overflow-x-auto max-sm:pb-2">
          <button
            onClick={() => setActiveTab("registration")}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap max-sm:text-xs max-sm:py-1.5 ${
              activeTab === "registration"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Qeydiyyat
          </button>
          <button
            onClick={() => setActiveTab("order")}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap max-sm:text-xs max-sm:py-1.5 ${
              activeTab === "order"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Sifariş və çatdırılma
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap max-sm:text-xs max-sm:py-1.5 ${
              activeTab === "about"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Shoplink barədə
          </button>
        </nav>
      </div>

      {/* FAQ Content */}
      <div className="space-y-4 max-sm:space-y-3">
        {getCurrentFaqs().map((item, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 max-sm:pb-3">
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
    </div>
  );
}

export default Support;
