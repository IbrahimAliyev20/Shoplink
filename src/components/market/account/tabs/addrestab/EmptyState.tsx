import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface EmptyStateProps {
  onAddNew: () => void;
}

function EmptyState({ onAddNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4 text-center">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
        <MapPin className="w-6 h-6 md:w-8 md:h-8 text-[#565355]" />
      </div>
      <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-sm">
        Hazırda yadda saxlanılmış ünvan yoxdur
      </p>
      <p className="text-xs md:text-sm text-gray-500 mb-6 md:mb-8 max-w-sm">
        Ünvan əlavə edərək alış-veriş zamanı vaxt itirməyən sifarişlərinizi daha tez tamamlaya bilərsiniz.
      </p>
      <Button 
        onClick={onAddNew}
        className='bg-[#E23359] hover:bg-[#E23359]/90 cursor-pointer text-white px-6 md:px-8 py-3 md:py-6 rounded-[16px] text-sm md:text-base font-medium w-full md:w-auto max-w-xs'
      >
        Ünvan əlavə et
      </Button>
    </div>
  );
}

export default EmptyState;
