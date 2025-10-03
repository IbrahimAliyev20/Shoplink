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
import { ArrowUpDown, Eye, Trash2, Pencil } from 'lucide-react';
import { ActiveInvestment, mockInvestments } from '@/utils/static';

const LastOrders: React.FC = () => {
  type SortKey = keyof Omit<ActiveInvestment, 'startup' | 'documents'> | 'startup.name';
  
  const [searchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'id', direction: 'asc' });

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
  };

  const handleViewProject = (project: ActiveInvestment) => {
    // TODO: Implement view project functionality
    console.log('View project:', project);
  };

  const handleEditProject = (project: ActiveInvestment) => {
    // TODO: Implement edit project functionality
    console.log('Edit project:', project);
  };

  const handleDeleteProject = (project: ActiveInvestment) => {
    // TODO: Implement delete project functionality
    console.log('Delete project:', project);
  };



  const SortableHeader: React.FC<{ sortKey: SortKey; children: React.ReactNode; className?: string }> = ({ sortKey, children, className }) => (
    <TableHead onClick={() => requestSort(sortKey)} className={`cursor-pointer hover:bg-gray-50 ${className}`}>
      <div className="flex items-center gap-1 text-gray-500 font-medium">
        {children}
        <ArrowUpDown className="h-4 w-4" />
      </div>
    </TableHead>
  );




  return (
    <div className="p-0">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold text-gray-800">Ən son sifarişlər</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
            Hamısına bax →
          </button>
        </div>
      </div>

      <div className="border rounded-lg overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b-gray-200">
              <SortableHeader sortKey="id">№</SortableHeader>
              <SortableHeader sortKey="startup.name">Məhsul</SortableHeader>
              <SortableHeader sortKey="investmentAmount">Satış qiyməti</SortableHeader>
              <SortableHeader sortKey="currentValue">Alış qiyməti</SortableHeader>
              <SortableHeader sortKey="status">Stok məlumatı</SortableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredData.slice(0, 5).map((item, index) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image 
                      src="/images/team1.png" 
                      alt="Saat" 
                      width={32} 
                      height={32} 
                      className="rounded-md" 
                    />
                    <span className="font-medium text-gray-800">Saat</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">7.000 AZN</TableCell>
                <TableCell className="text-gray-600">10.000 AZN</TableCell>
                <TableCell>
                  {index === 0 || index === 4 ? (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="text-red-600 text-sm">Stokda yoxdur</span>
                    </div>
                  ) : (
                    <span className="text-gray-600">12</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-full"
                      onClick={() => handleViewProject(item)}
                      title="Ətraflı bax"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-green-600 hover:bg-green-50 rounded-full"
                      onClick={() => handleEditProject(item)}
                      title="Redaktə et"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-600 hover:bg-red-50 rounded-full"
                      onClick={() => handleDeleteProject(item)}
                      title="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LastOrders;
