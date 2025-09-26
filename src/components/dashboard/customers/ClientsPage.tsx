'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search,
  Eye,
  Edit,
  Trash2,
  ListFilter
} from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Product {
  id: number;
  clientName: string;
  email: string;
  phone: string;
  totalOrders: string;
  createdAt: string;
}

const products: Product[] = [
  {
    id: 1,
    clientName: 'Vəliyev Vəli',
    email: 'markup@gmail.com',
    phone: '+994 99 999 99 99',
    totalOrders: '12',
    createdAt: '2021-01-01',
  },
  {
    id: 2,
    clientName: 'Əliyev Əli',
    email: 'markup@gmail.com',
    phone: '+994 99 999 99 99',
    totalOrders: '12',
    createdAt: '2021-01-01',
  },
  {
    id: 3,
    clientName: 'Əliyev Əli',
    email: 'markup@gmail.com',
    phone: '+994 99 999 99 99',
    totalOrders: 'Yoxdur',
    createdAt: '2021-01-01',
  },
  {
    id: 4,
    clientName: 'Əliyev Əli',
    email: 'markup@gmail.com',
    phone: '+994 99 999 99 99',
    totalOrders: '12',
    createdAt: '2021-01-01',
  },
  {
    id: 5,
    clientName: 'Əliyev Əli',
    email: 'markup@gmail.com',
    phone: '+994 99 999 99 99',
    totalOrders: '12',
    createdAt: '2021-01-01',
  },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(3);

  return (
    <div className="space-y-6 bg-white max-sm:space-y-4">
      <Card className="border-none shadow-none">
        <CardContent className="p-6 max-sm:p-4">
          <div className="flex items-center justify-between space-x-4 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-3 max-sm:items-stretch">
            <div className=" relative max-sm:w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 max-sm:h-3 max-sm:w-3" />
              <Input
                type="text"
                placeholder="Müştəri axtarın"
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

      {/* Clients Table */}
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="max-sm:min-w-[800px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      №
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Müştəri
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Email
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Telefon nömrəsi
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Ümumi sifariş 
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Yaranma tarixi
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
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900 max-sm:text-xs">
                            {product.clientName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {product.email}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {product.phone}
                      </td>
                      <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                        {typeof product.totalOrders === 'string' ? (
                          <span className="inline-flex items-center space-x-1 text-sm max-sm:text-xs">
                            <span>{product.totalOrders}</span>
                          </span>
                        ) : (
                          <span className="text-sm text-gray-900 max-sm:text-xs">
                            {product.totalOrders}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {product.createdAt}
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

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2">
        <Pagination className="mt-6 flex justify-end max-sm:justify-center max-sm:mt-4">
          <PaginationContent className="max-sm:gap-1">
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setCurrentPage(p => Math.max(1, p - 1)); 
                }} 
                className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} max-sm:h-8 max-sm:px-2 max-sm:text-xs`}
              />
            </PaginationItem>
            <PaginationItem className="max-sm:hidden">
              <PaginationLink 
                href="#" 
                isActive={currentPage === 1} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setCurrentPage(1); 
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="max-sm:hidden">
              <span className="text-gray-500 max-sm:text-xs">...</span>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                href="#" 
                isActive={currentPage === 2} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setCurrentPage(2); 
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                href="#" 
                isActive={currentPage === 3} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setCurrentPage(3); 
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                href="#" 
                isActive={currentPage === 4} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setCurrentPage(4); 
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="max-sm:hidden">
              <PaginationLink 
                href="#" 
                isActive={currentPage === 5} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setCurrentPage(5); 
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="max-sm:hidden">
              <span className="text-gray-500 max-sm:text-xs">...</span>
            </PaginationItem>
            <PaginationItem className="max-sm:hidden">
              <PaginationLink 
                href="#" 
                isActive={currentPage === 9} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setCurrentPage(9); 
                }}
                className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
              >
                9
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setCurrentPage(p => Math.min(9, p + 1)); 
                }} 
                className={`${currentPage === 9 ? "pointer-events-none opacity-50" : ""} max-sm:h-8 max-sm:px-2 max-sm:text-xs`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
