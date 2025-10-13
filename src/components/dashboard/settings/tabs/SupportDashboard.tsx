'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const SupportDashboard = () => {
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
        <Tabs defaultValue="shopping" className="w-full">
          <TabsList className="max-w-3xl mx-auto flex w-full overflow-x-auto sm:grid sm:grid-cols-3 mb-6 p-1 rounded-4xl h-auto scrollbar-hide bg-[#f2f4f8]">
            {tabs.map((tab, index) => (
              <TabsTrigger key={index} value={tab.id} className="rounded-4xl text-sm sm:text-base py-3 px-4 whitespace-nowrap">{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab, index) => (
            <TabsContent key={index} value={tab.id}>
              <Accordion type="single" collapsible defaultValue="item-1" className="w-full flex flex-col gap-2">
                {faqData[tab.id as keyof typeof faqData]?.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={faq.question} className="border-b-0 border-1 border-[#F3F2F8] rounded-[16px] bg-[#FBFDFF]">
                    <AccordionTrigger className="text-left font-medium px-3 sm:px-4 text-sm sm:text-base">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 space-y-2 px-4">
                      <ul className="space-y-1.5">
                        {faq.answer.map((item, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default SupportDashboard
