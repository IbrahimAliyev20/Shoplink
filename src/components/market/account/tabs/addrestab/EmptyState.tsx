import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface EmptyStateProps {
  onAddNew: () => void;
}

function EmptyState({ onAddNew }: EmptyStateProps) {
  return (
    <div className=" flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16  rounded-full flex items-center justify-center mb-6">
        <MapPin className="w-8 h-8 text-[#565355]" />
      </div>
      <p className="text-gray-600 mb-8 max-w-sm">
        Hazırda yadda saxlanılmış ünvan yoxdur
      </p>
      <p className="text-sm text-gray-500 mb-8 max-w-sm">
        Ünvan əlavə edərək alış-veriş zamanı vaxt itirməyən sifarişlərinizi daha tez tamamlaya bilərsiniz.
      </p>
      <Button 
        onClick={onAddNew}
        className='bg-[#E23359] hover:bg-[#E23359]/90 cursor-pointer text-white px-30 py-6 rounded-[16px] text-base font-medium '
      >
        Ünvan əlavə et
      </Button>
    </div>
  );
}

export default EmptyState;
