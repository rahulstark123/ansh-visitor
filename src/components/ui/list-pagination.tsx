"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function ListPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  className,
}: ListPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalItems <= pageSize) {
    return null;
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-border/40 pt-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <p className="text-xs font-semibold text-muted-foreground">
        Showing{" "}
        <span className="text-foreground">
          {start}–{end}
        </span>{" "}
        of <span className="text-foreground">{totalItems}</span>
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 gap-1 rounded-full px-3 text-xs"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Previous
        </Button>
        <span className="min-w-[88px] text-center text-xs font-semibold text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 gap-1 rounded-full px-3 text-xs"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

export function paginateList<T>(items: T[], currentPage: number, pageSize: number): T[] {
  const start = (currentPage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
