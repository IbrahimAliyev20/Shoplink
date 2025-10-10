"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  onSearchChange: (value: string) => void;
}

export const SearchInputInvestment: React.FC<SearchInputProps> = ({
  placeholder = "Axtarın",
  onSearchChange,
}) => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-[#F3F2F8] pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 text-white bg-black rounded-full p-1" />
    </div>
  );
};