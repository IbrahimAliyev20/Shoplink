import { Box, Clock, LoaderCircle, Truck, Check, X } from "lucide-react";

const StatusIcons = ({ status }: { status: number }) => {
  if (status === 0)
    return (
      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-lg font-medium text-sm">
        <Clock className="w-4 h-4" />
        Gözləmədə
      </div>
    );
  
  if (status === 1)
    return (
      <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-3 py-1.5 rounded-lg font-medium text-sm">
        <Check className="w-4 h-4" />
        Təsdiqləndi
      </div>
    );
  
  if (status === 2)
    return (
      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg font-medium text-sm">
        <LoaderCircle className="w-4 h-4 animate-spin" />
        Hazırlanır
      </div>
    );
  
  if (status === 3)
    return (
      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-lg font-medium text-sm">
        <Truck className="w-4 h-4" />
        Yoldadır
      </div>
    );
  
  if (status === 4)
    return (
      <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-3 py-1.5 rounded-lg font-medium text-sm">
        <Box className="w-4 h-4" />
        Çatdırıldı
      </div>
    );
  
  if (status === 5)
    return (
      <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-medium text-sm">
        <X className="w-4 h-4" />
        Ləğv edildi
      </div>
    );
  
  return (
    <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium text-sm">
      Naməlum
    </div>
  );
};

export default StatusIcons;