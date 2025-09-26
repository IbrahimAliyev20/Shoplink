import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search,
  Eye,
  Edit,
  Trash2,
  Watch,
  ListFilter
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  salePrice: string;
  purchasePrice: string;
  image?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Saat',
    salePrice: '7.000 AZN',
    purchasePrice: '10.000 AZN',
  },
  {
    id: 2,
    name: 'Saat',
    salePrice: '7.000 AZN',
    purchasePrice: '10.000 AZN',
  },
  {
    id: 3,
    name: 'Saat',
    salePrice: '7.000 AZN',
    purchasePrice: '10.000 AZN',
  },
  {
    id: 4,
    name: 'Saat',
    salePrice: '7.000 AZN',
    purchasePrice: '10.000 AZN',
  },
  {
    id: 5,
    name: 'Saat',
    salePrice: '7.000 AZN',
    purchasePrice: '10.000 AZN',
  },
];

export default function PurchasePage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 bg-white max-sm:space-y-4">
      <Card className='border-none shadow-none'>
        <CardContent className="p-6 max-sm:p-4">
          <div className="flex items-center justify-between space-x-4 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-3 max-sm:items-stretch">
            <div className="min-w-sm relative max-sm:w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 max-sm:h-3 max-sm:w-3" />
              <Input
                type="text"
                placeholder="Məhsul axtarın"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-sm:pl-8 max-sm:h-10 max-sm:text-sm"
              />
            </div>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 max-sm:w-full max-sm:h-10 max-sm:text-sm max-sm:space-x-1.5">
              <ListFilter className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className='border-none shadow-none'>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="max-sm:min-w-[600px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Sifariş №
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Təchizatçı
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Cəmi
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Əməliyyatlar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {product.id}
                      </td>
                      <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                        <div className="flex items-center space-x-3 max-sm:space-x-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center max-sm:w-6 max-sm:h-6">
                            <Watch className="h-4 w-4 text-orange-600 max-sm:h-3 max-sm:w-3" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 max-sm:text-xs">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {product.salePrice}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {product.purchasePrice}
                      </td>
                      <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                        <div className="flex items-center justify-start space-x-2 max-sm:space-x-1">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors max-sm:p-1.5">
                            <Eye className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors max-sm:p-1.5">
                            <Edit className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors max-sm:p-1.5">
                            <Trash2 className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
