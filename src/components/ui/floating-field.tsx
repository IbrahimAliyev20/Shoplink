import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FloatingFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

/**
 * Reusable floating label field component
 * Used in forms for a consistent floating label pattern
 */
export function FloatingField({ 
  id, 
  label, 
  error,
  children, 
  className,
  required = false
}: FloatingFieldProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <Label 
        htmlFor={id}
        className={cn(
          "absolute left-3 bg-white px-2 text-xs transition-all",
          "peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5",
          "peer-focus:-top-2.5 peer-focus:text-xs",
          error ? "text-red-600 peer-focus:text-red-600" : "text-gray-600 peer-focus:text-purple-600",
          "-top-2.5"
        )}
      >
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

