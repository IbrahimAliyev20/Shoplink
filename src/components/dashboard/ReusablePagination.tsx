"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ReusablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ReusablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: ReusablePaginationProps) {
  return (
    <div className="flex items-center justify-between max-sm:flex-col max-sm:space-y-3">
      <Pagination className="max-sm:mt-0 justify-end">
        <PaginationContent className="max-sm:gap-1">
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.max(1, currentPage - 1));
              }}
              className={`${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              } max-sm:h-8 max-sm:px-2 max-sm:text-xs`}
            />
          </PaginationItem>

          {/* First page */}
          {currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(1);
                  }}
                  className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {currentPage > 4 && (
                <PaginationItem>
                  <span className="text-gray-500 max-sm:text-xs px-2">...</span>
                </PaginationItem>
              )}
            </>
          )}

          {/* Pages around current page */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => Math.abs(page - currentPage) <= 2)
            .map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                  className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

          {/* Last page */}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <PaginationItem>
                  <span className="text-gray-500 max-sm:text-xs px-2">...</span>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(totalPages);
                  }}
                  className="max-sm:h-8 max-sm:w-8 max-sm:text-xs"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.min(totalPages, currentPage + 1));
              }}
              className={`${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              } max-sm:h-8 max-sm:px-2 max-sm:text-xs`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
