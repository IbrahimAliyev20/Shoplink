import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Subscription = () => {
  return (
    <div className=" mx-auto px-4 py-8">
      {/* Header Section */}
      <div className=" mb-12">
        <h1 className="text-2xl font-medium text-gray-800 mb-4">
          Tariflər
        </h1>
        <p className="text-lg text-gray-600  mx-auto">
          Sənə uyğun olan tarif planını seç və abuna olaraq öz onlayn e-ticarət mağazanı yarat.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-2 gap-8  mx-auto">
        {/* Monthly Plan */}
        <Card className="relative bg-gray-50 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Aylıq plan
              </CardTitle>
              <Badge className="bg-pink-100 text-pink-600 border-0 rounded-full px-4 py-1 font-semibold">
                aylıq
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div >
              <span className="text-4xl font-medium text-gray-800">25 AZN</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Aylıq sabiq qiymət ödəyərək öz onlayn mağazanı aç və limitsiz satış et. 
              Satışlardan əlavə faiz tutulmur, qazancın səndə qalır.
            </p>
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium">
              Abunə ol
            </Button>
          </CardContent>
        </Card>

        {/* Commission-based Plan */}
        <Card className="relative bg-gray-50 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Faizli plan
              </CardTitle>
              <Badge className="bg-pink-100 text-pink-600 border-0 rounded-full px-4 py-1 font-semibold">
                Hər satışdan
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div >
              <span className="text-4xl font-medium text-gray-800">3.5 %</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Bu planda aylıq sabit ödəniş yoxdur. Yalnız satış olduqda 3.5% komissiya ödənilir. 
              Satış etmədikdə heç bir xərcin olmur.
            </p>
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium">
              Abunə ol
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Subscription