"use client";

import React from "react";
import { List, LayoutGrid } from "lucide-react";

export type ViewMode = "list" | "grid";

interface ViewToggleProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  activeView,
  onViewChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onViewChange("list")}
        className={`p-2 border rounded-md transition-colors ${
          activeView === "list"
            ? "bg-green-100 border-green-500"
            : "border-gray-200 hover:bg-gray-100"
        }`}
        aria-label="Siyahı görünüşü"
      >
        <List
          className={`w-4 h-4 ${
            activeView === "list" ? "text-green-600" : "text-gray-400"
          }`}
        />
      </button>
      <button
        onClick={() => onViewChange("grid")}
        className={`p-2 border rounded-md transition-colors ${
          activeView === "grid"
            ? "bg-green-100 border-green-500"
            : "border-gray-200 hover:bg-gray-100"
        }`}
        aria-label="Cədvəl görünüşü"
      >
        <LayoutGrid
          className={`w-4 h-4 ${
            activeView === "grid" ? "text-green-600" : "text-gray-400"
          }`}
        />
      </button>
    </div>
  );
};