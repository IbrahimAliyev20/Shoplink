"use client";

import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the heavy RichTextEditor component
const RichTextEditor = lazy(() => import("@/components/shared/editor"));

interface LazyRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function LazyRichTextEditor({
  value,
  onChange,
  placeholder = "Write something awesome...",
  className = "",
}: LazyRichTextEditorProps) {
  return (
    <Suspense
      fallback={
        <div className={className}>
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-32 w-full" />
        </div>
      }
    >
      <RichTextEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
    </Suspense>
  );
}
