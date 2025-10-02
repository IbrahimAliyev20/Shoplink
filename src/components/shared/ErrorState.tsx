import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export function ErrorState({ 
  title = "Xəta baş verdi",
  message = "Məlumatları yükləyərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
  onRetry,
  fullScreen = false
}: ErrorStateProps) {
  const content = (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm max-w-md mx-auto">{message}</p>
      </div>
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="mt-4"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Yenidən cəhd et
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="py-12">
      {content}
    </div>
  );
}

// Empty state component
export function EmptyState({ 
  icon,
  title = "Məlumat tapılmadı",
  message,
  action
}: { 
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-12 space-y-4">
      {icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        {message && (
          <p className="text-gray-600 text-sm max-w-md mx-auto">{message}</p>
        )}
      </div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

