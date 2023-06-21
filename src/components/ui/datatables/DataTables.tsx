import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import BaseDatatable from '@components/ui/datatables/baseDataTable';
import { DataTableToolbar } from '@components/ui/datatables/data-table-toolbar';
import { usePagination } from '@hooks/usePagination';
import { useDebouncedQuery, useSearchQuery } from '@hooks/useSearchQuery';
import { useEffect, useState } from 'react';

interface DataTablesProps<T> {
  apiQuery: any;
  columns: ColumnDef<T>[];
}

export const DataTables: React.FC<DataTablesProps<any>> = ({ apiQuery, columns }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { query, handleQueryChange } = useSearchQuery();
  const { page, handlePagination, perPage, handlePerPage } = usePagination();

  const searchDebouncedQuery = useDebouncedQuery(query);

  const { data, isLoading, isError, isFetching } = apiQuery({
    searchQuery: searchDebouncedQuery,
    page: page,
    perPage: perPage,
  });

  const fetchData = data?.data ?? [];
  const paginationInfo = data?.meta ?? {};

  useEffect(() => {
    handlePagination(paginationInfo.current_page);
    handlePerPage(paginationInfo.per_page);
  }, [searchDebouncedQuery, columnFilters, sorting]);

  const ReactTable = useReactTable({
    data: fetchData,
    columns: columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4 w-full">
      <DataTableToolbar table={ReactTable} onSearchChange={handleQueryChange} searchValue={query} />
      <div className="">
        <BaseDatatable
          data={fetchData}
          table={ReactTable}
          columns={columns}
          dataStatus={{ isLoading, isError, isFetching }}
          paginationInfo={paginationInfo}
          handlePagination={handlePagination}
          handlePerPage={handlePerPage}
        />
      </div>
    </div>
  );
};
