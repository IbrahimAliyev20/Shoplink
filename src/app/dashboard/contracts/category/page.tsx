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
  ListFilter,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryQueries } from '@/services/Seller-services/category/queries';
import { deleteCategoryMutation } from '@/services/Seller-services/category/mutations';


export default function Category() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: category } = useQuery(categoryQueries.all());

  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...deleteCategoryMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueries.all().queryKey });
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  }

  return (
    <div className="space-y-6 max-sm:space-y-4">
      <div className='flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:space-y-3'>
        <h1 className='text-3xl font-medium text-gray-900 max-sm:text-2xl max-sm:font-semibold'>
          Kateqoriyalar
        </h1>
        <Link href="/dashboard/contracts/category/create">
          <Button variant="default" className="bg-pink-500 hover:bg-pink-600 text-white max-sm:w-full max-sm:text-sm max-sm:py-2.5 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:space-x-2">
            <Plus className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
            <span>Kateqoriya əlavə et</span>
          </Button>
        </Link>
      </div>
      <div className='bg-white'>

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
            <div className="max-sm:min-w-[500px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      №
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Kateqoriya adı
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Sıralama
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                      Əməliyyatlar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((category) => (
                    <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {category.id}
                      </td>
                      <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900 max-sm:text-xs">
                            {category.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 max-sm:py-3 max-sm:px-4 max-sm:text-xs">
                        {category.order}
                      </td>
                      <td className="py-4 px-6 max-sm:py-3 max-sm:px-4">
                        <div className="flex items-center justify-start space-x-2 max-sm:space-x-1">
                          <Link href={`/dashboard/contracts/category/preview/${category.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors max-sm:p-1.5">
                            <Eye className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                          </Link>
                          <Link href={`/dashboard/contracts/category/edit/${category.id}`} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors max-sm:p-1.5">
                              <Edit className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                          </Link>
                          <button onClick={() => handleDelete(category.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors max-sm:p-1.5">
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
    </div>
  );
}
