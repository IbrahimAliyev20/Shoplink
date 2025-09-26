"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowUpDown, Eye, Trash2, Pencil, Search,  ListFilter, X } from 'lucide-react';
import { ActiveInvestment, mockInvestments } from '@/utils/static';

const ReportsPage: React.FC = () => {
  type SortKey = keyof Omit<ActiveInvestment, 'startup' | 'documents'> | 'startup.name';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(3);

  const sortedAndFilteredData = useMemo(() => {
    const filtered = mockInvestments.filter(item =>
      item.startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.investmentAmount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.currentValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.developmentStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm)
    );

    return filtered.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      
      let aValue: string | number;
      let bValue: string | number;
      
      if (key === 'startup.name') {
        aValue = a.startup.name;
        bValue = b.startup.name;
      } else if (key === 'category') {
        aValue = a.category[0] || '';
        bValue = b.category[0] || '';
      } else {
        aValue = a[key as keyof ActiveInvestment] as string | number;
        bValue = b[key as keyof ActiveInvestment] as string | number;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 1 ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;
      return 0;
    });
  }, [searchTerm, sortConfig]);


  const requestSort = (key: SortKey) => {
    const direction: 'asc' | 'desc' = (sortConfig.key === key && sortConfig.direction === 'asc') ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    setCurrentPage(1); 
  };

  const handleViewProject = (project: ActiveInvestment) => {
    console.log("Viewing project:", project);
  };

  const handleEditProject = (project: ActiveInvestment) => {
    console.log("Editing project:", project);
  };




  const SortableHeader: React.FC<{ sortKey: SortKey; children: React.ReactNode; className?: string }> = ({ sortKey, children, className }) => (
    <TableHead onClick={() => requestSort(sortKey)} className={`cursor-pointer hover:bg-gray-50 ${className} max-md:px-2 max-md:py-2`}>
      <div className="flex items-center gap-1 text-gray-500 font-medium max-md:text-xs max-md:gap-0.5">
        {children}
        <ArrowUpDown className="h-4 w-4 max-md:h-3 max-md:w-3" />
      </div>
    </TableHead>
  );


  return (
    <div className="p-0">
      <div className="flex justify-between items-center gap-4 mb-6 max-md:flex-col max-md:items-stretch max-md:gap-3 max-md:mb-4">
        <div className="relative flex-1 max-w-md max-md:max-w-none">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Məhsul axtarın"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-md:h-10 max-md:text-sm"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-gray-300 max-md:w-full max-md:justify-center max-md:h-10">
          <ListFilter className="h-4 w-4" />
          <span className="max-md:text-sm">Filter</span>
        </Button>
      </div>

      <div className="border rounded-lg overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b-gray-200">
              <SortableHeader sortKey="id" className="max-md:min-w-[40px]">№</SortableHeader>
              <SortableHeader sortKey="startup.name" className="max-md:min-w-[120px]">Məhsul</SortableHeader>
              <SortableHeader sortKey="category" className="max-md:hidden">Kateqoriya</SortableHeader>
              <SortableHeader sortKey="investmentAmount" className="max-md:min-w-[80px]">Satış qiyməti</SortableHeader>
              <SortableHeader sortKey="currentValue" className="max-md:hidden">Satılan (ədəd)</SortableHeader>
              <SortableHeader sortKey="status" className="max-md:min-w-[90px]">Ümumi gəlir</SortableHeader>
              <SortableHeader sortKey="developmentStatus" className="max-md:min-w-[80px]">Stok</SortableHeader>
              <TableHead className="text-gray-500 font-medium max-md:px-2 max-md:py-2 max-md:text-xs max-md:min-w-[100px]">Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredData.slice(0, 5).map((item, index) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800 max-md:px-2 max-md:py-2 max-md:text-sm">
                  {index + 1}
                </TableCell>
                <TableCell className="max-md:px-2 max-md:py-2">
                  <div className="flex items-center gap-3 max-md:gap-2">
                    <Image 
                      src="/images/team1.png" 
                      alt="Saat" 
                      width={32} 
                      height={32} 
                      className="rounded-md max-md:w-6 max-md:h-6" 
                    />
                    <span className="font-medium text-gray-800 max-md:text-sm">Saat</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 max-md:hidden">Klassik</TableCell>
                <TableCell className="text-gray-600 max-md:px-2 max-md:py-2 max-md:text-sm">7.000 AZN</TableCell>
                <TableCell className="text-gray-600 max-md:hidden">120</TableCell>
                <TableCell className="text-gray-600 max-md:px-2 max-md:py-2 max-md:text-sm">12.000 AZN</TableCell>
                <TableCell className="max-md:px-2 max-md:py-2">
                  {index === 0 || index === 4 ? (
                    <div className="flex items-center gap-2 max-md:gap-1">
                      <span className='text-red-500'><X className="max-md:h-3 max-md:w-3" /></span>
                      <span className="text-red-600 text-sm max-md:text-xs max-md:hidden">Stokda yoxdur</span>
                      <span className="text-red-600 text-xs hidden max-md:inline">Yox</span>
                    </div>
                  ) : (
                    <span className="text-gray-600 max-md:text-sm">12</span>
                  )}
                </TableCell>
                <TableCell className="max-md:px-2 max-md:py-2">
                  <div className="flex items-center gap-2 max-md:gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-full max-md:h-6 max-md:w-6"
                      onClick={() => handleViewProject(item)}
                      title="Ətraflı bax"
                    >
                      <Eye className="h-4 w-4 max-md:h-3 max-md:w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-green-600 hover:bg-green-50 rounded-full max-md:h-6 max-md:w-6"
                      onClick={() => handleEditProject(item)}
                      title="Redaktə et"
                    >
                      <Pencil className="h-4 w-4 max-md:h-3 max-md:w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-600 hover:bg-red-50 rounded-full max-md:h-6 max-md:w-6"
                      onClick={() => {}}
                      title="Sil"
                    >
                      <Trash2 className="h-4 w-4 max-md:h-3 max-md:w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="mt-6 flex justify-end max-md:justify-center max-md:mt-4">
        <PaginationContent className="max-md:gap-1">
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                setCurrentPage(p => Math.max(1, p - 1)); 
              }} 
              className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} max-md:h-8 max-md:px-2 max-md:text-sm`}
            />
          </PaginationItem>
          <PaginationItem className="max-md:hidden">
            <PaginationLink 
              href="#" 
              isActive={currentPage === 1} 
              onClick={(e) => { 
                e.preventDefault(); 
                setCurrentPage(1); 
              }}
              className="max-md:h-8 max-md:w-8 max-md:text-sm"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="max-md:hidden">
            <span className="text-gray-500 max-md:text-sm">...</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink 
              href="#" 
              isActive={currentPage === 2} 
              onClick={(e) => { 
                e.preventDefault(); 
                setCurrentPage(2); 
              }}
              className="max-md:h-8 max-md:w-8 max-md:text-sm"
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
              className="max-md:h-8 max-md:w-8 max-md:text-sm"
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
              className="max-md:h-8 max-md:w-8 max-md:text-sm"
            >
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="max-md:hidden">
            <PaginationLink 
              href="#" 
              isActive={currentPage === 5} 
              onClick={(e) => { 
                e.preventDefault(); 
                setCurrentPage(5); 
              }}
              className="max-md:h-8 max-md:w-8 max-md:text-sm"
            >
              5
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="max-md:hidden">
            <span className="text-gray-500 max-md:text-sm">...</span>
          </PaginationItem>
          <PaginationItem className="max-md:hidden">
            <PaginationLink 
              href="#" 
              isActive={currentPage === 9} 
              onClick={(e) => { 
                e.preventDefault(); 
                setCurrentPage(9); 
              }}
              className="max-md:h-8 max-md:w-8 max-md:text-sm"
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
              className={`${currentPage === 9 ? "pointer-events-none opacity-50" : ""} max-md:h-8 max-md:px-2 max-md:text-sm`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ReportsPage;
