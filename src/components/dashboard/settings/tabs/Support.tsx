'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const Support = () => {
  const [activeTab, setActiveTab] = useState('shopping')

  const tabs = [
    { id: 'shopping', label: 'Shopping nədir?' },
    { id: 'management', label: 'Məhsul və Mağaza İdarəetməsi' },
    { id: 'payment', label: 'Ödəniş və Çatdırılma' }
  ]

  const faqData = {
    shopping: [
      {
        id: 'shopping-what',
        question: 'Shopping nədir və nə işə yarayır?',
        answer: [
          'Shopping satıcılar üçün limitsiz imkanlar təqdim edən, məhsulların onlayn satışı üçün nəzərdə tutulmuş bir e-ticarət platformasıdır.',
          'Satıcılar məhsullarını əlavə edir, stoklarını idarə edir və müştərilərə online satış təqdim edə bilirlər.'
        ]
      },
      {
        id: 'shopping-who',
        question: 'Shopping kimlər üçün uyğundur?',
        answer: [
          'Shopping kiçik və orta biznes sahibləri üçün idealdır.',
          'Fiziki mağazası olan və ya yalnız online satış etmək istəyən hər kəs istifadə edə bilər.'
        ]
      },
      {
        id: 'shopping-countries',
        question: 'Shopping hansı ölkələrdə fəaliyyət göstərir?',
        answer: [
          'Hazırda Azərbaycan, Türkiyə və Gürcüstanda fəaliyyət göstərir.',
          'Tezliklə digər ölkələrə də genişləndiriləcək.'
        ]
      },
      {
        id: 'shopping-advantages',
        question: 'Shopping istifadəçilərə hansı üstünlükləri təqdim edir?',
        answer: [
          'Asan istifadə interfeysi',
          '24/7 texniki dəstək',
          'Aşağı komissiya dərəcələri',
          'Geniş ödəniş seçimləri'
        ]
      },
      {
        id: 'shopping-technical',
        question: 'Shopping ilə satış etmək üçün xüsusi texniki bilik tələb olunurmu?',
        answer: [
          'Xeyr, xüsusi texniki bilik tələb olunmur.',
          'Platforma istifadəçi dostu interfeysə malikdir və asanlıqla istifadə edilə bilər.'
        ]
      }
    ],
    management: [
      {
        id: 'product-add',
        question: 'Məhsul necə əlavə edilir?',
        answer: [
          'Dashboard-da "Məhsullar" bölməsinə daxil olun',
          'Yeni məhsul düyməsini basın və məlumatları doldurun'
        ]
      },
      {
        id: 'stock-manage',
        question: 'Stok necə idarə edilir?',
        answer: [
          'Məhsul siyahısında stok miqdarını yeniləyə bilərsiniz',
          'Avtomatik stok xəbərdarlıqları qura bilərsiniz'
        ]
      }
    ],
    payment: [
      {
        id: 'payment-methods',
        question: 'Hansı ödəniş üsulları dəstəklənir?',
        answer: [
          'Kart ilə ödəniş',
          'Bank köçürməsi',
          'Nağd ödəniş',
          'Kripto valyuta'
        ]
      },
      {
        id: 'delivery-options',
        question: 'Çatdırılma seçimləri nələrdir?',
        answer: [
          'Standart çatdırılma (3-5 gün)',
          'Sürətli çatdırılma (1-2 gün)',
          'Özün götür'
        ]
      }
    ]
  }

  return (
    <Card>
      <CardHeader className="max-md:p-4">
        <CardTitle className="flex text-2xl font-medium items-center gap-2 max-md:text-xl">
          Dəstək
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 max-md:space-y-4 max-md:p-4 max-md:pt-0">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 max-md:overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap max-md:px-3 max-md:py-2 max-md:text-xs ${
                activeTab === tab.id
                  ? 'border-gray-300 bg-gray-50 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 max-md:space-y-3">
          <Accordion type="single" collapsible className="w-full">
            {faqData[activeTab as keyof typeof faqData]?.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border border-gray-200 rounded-lg">
                <AccordionTrigger className="px-4 py-3 hover:no-underline max-md:px-3 max-md:py-2">
                  <span className="text-left font-medium max-md:text-sm max-md:leading-tight">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 max-md:px-3 max-md:pb-3">
                  <ul className="space-y-2 max-md:space-y-1">
                    {faq.answer.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start max-md:text-xs">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0 max-md:w-1 max-md:h-1 max-md:mt-1.5"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}

export default Support
