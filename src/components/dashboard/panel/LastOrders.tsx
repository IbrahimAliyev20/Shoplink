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
import {  Eye, Trash2, Pencil, X } from 'lucide-react';
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
    <TableHead onClick={() => requestSort(sortKey)} className={`cursor-pointer hover:bg-gray-50 ${className || ''}`}>
      <div className="flex gap-1 text-gray-500 font-medium justify-center">
        {children}
        </div>
    </TableHead>
  );




  return (
    <div className="bg-gray-50 ">
      <div className="bg-white rounded-xl  border border-[#F3F2F8]">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-gray-900">Ən son sifarişlər</h2>
            <button className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1">
              Hamısına bax →
            </button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#F3F2F8] text-center">
                  <SortableHeader sortKey="id" className="text-center">№</SortableHeader>
                  <SortableHeader sortKey="startup.name" className="text-center">Məhsul</SortableHeader>
                  <SortableHeader sortKey="investmentAmount" className="text-center">Satış qiyməti</SortableHeader>
                  <SortableHeader sortKey="currentValue" className="text-rigcenterht">Alış qiyməti</SortableHeader>
                  <SortableHeader sortKey="status" className="text-center">Stok məlumatı</SortableHeader>
                  <TableHead className="text-center">
                    <div className="text-gray-500 font-medium">
                      Əməliyyatlar
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAndFilteredData.slice(0, 5).map((item, index) => (
                  <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900 py-4 text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex items-center gap-3">
                        <Image 
                          src="/images/team1.png" 
                          alt="Saat" 
                          width={40} 
                          height={40} 
                          className="rounded-md object-cover" 
                        />
                        <span className="font-medium text-gray-900">Saat</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-gray-700 font-medium py-4">7.000 AZN</TableCell>
                    <TableCell className="text-center text-gray-700 font-medium py-4">10.000 AZN</TableCell>
                    <TableCell className="py-4 text-center">
                      {index === 0 || index === 4 ? (
                        <div className="flex items-center gap-2 justify-center">
                          <X className="w-4 h-4 text-red-500" />
                          <span className="text-red-600 text-sm font-medium">Stokda yoxdur</span>
                        </div>
                      ) : (
                        <span className="text-gray-700 font-medium">12</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          onClick={() => handleViewProject(item)}
                          title="Ətraflı bax"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                          onClick={() => handleEditProject(item)}
                          title="Redaktə et"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
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
      </div>
    </div>
  );
};

export default LastOrders;
