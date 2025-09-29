'use client';

import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface ReusablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function ReusablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = ""
}: ReusablePaginationProps) {
  
  if (totalPages <= 1) {
    return null;
  }

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      if (currentPage > 3) {
        pages.push(1);
        if (currentPage > 4) {
          pages.push('...');
        }
      }
      
      // Show pages around current page
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Show last page
      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className={`flex justify-end ${className}`}>
      <Pagination className="justify-end">
        <PaginationContent className="max-sm:gap-1">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={`${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              } max-sm:h-8 max-sm:px-2 max-sm:text-xs`}
            />
          </PaginationItem>

          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <span className="text-gray-500 max-sm:text-xs px-2">...</span>
              ) : (
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page as number);
                  }}
                  className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={`${
                currentPage === totalPages ? "pointer-events-none opacity-50" : ""
              } max-sm:h-8 max-sm:px-2 max-sm:text-xs`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}