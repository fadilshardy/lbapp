import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginationInfo: Record<string, any>;
  handlePagination: (number: number) => void;
  handlePerPage: (number: number) => void;
  isFetching: boolean;
}

export function DataTablePagination<TData>({
  table,
  paginationInfo,
  handlePagination,
  isFetching,
  handlePerPage,
}: DataTablePaginationProps<TData>) {
  const { last_page: lastPage, current_page: currentPage, per_page: perPage } = paginationInfo;

  const goToNextPage = () => {
    if (currentPage < lastPage) {
      handlePagination(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    handlePagination(1);
  };

  const goToLastPage = () => {
    handlePagination(lastPage);
  };

  return (
    <div className="flex items-center justify-between mt-3 px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {paginationInfo.to} of {paginationInfo.total} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${perPage}`}
            onValueChange={(value) => {
              handlePerPage(parseInt(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  onClick={() => handlePerPage(pageSize)}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {paginationInfo.current_page} of {paginationInfo.last_page}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToFirstPage}
            disabled={isFetching || currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToPrevPage}
            disabled={isFetching || currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToNextPage}
            disabled={isFetching || currentPage === lastPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToLastPage}
            disabled={isFetching || currentPage === lastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
