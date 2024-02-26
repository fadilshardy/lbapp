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
import { usePagination } from '@hooks/usePagination';
import { useDebouncedQuery, useSearchQuery } from '@hooks/useSearchQuery';
import { useEffect, useState } from 'react';
import { Input } from '../input';
import DataTableLayout, {
  DataTableContent,
  DataTableFooter,
  DataTableHeader,
} from './DataTableLayout';
import { DataTablePagination } from './dataTablePagination';

interface DataTablesProps<T> {
  apiQuery: any;
  columns: ColumnDef<T>[];
  handleModalToggle?: (open: boolean) => void;
  ActionMenu: React.ReactElement;
}

export const DataTables: React.FC<DataTablesProps<any>> = ({ apiQuery, columns, ActionMenu }) => {
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
    <DataTableLayout>
      <div className='space-y-4 w-full'>
        <DataTableHeader>
          <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center space-x-2'>
              <Input
                placeholder='Filter...'
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className='h-h-12  w-[150px] lg:w-[250px]'
                type='search'
                name='search'
              />
            </div>

            <div className='flex items-center space-x-2'>{ActionMenu}</div>
          </div>
        </DataTableHeader>
        <DataTableContent>
          <BaseDatatable
            data={fetchData}
            table={ReactTable}
            columns={columns}
            dataStatus={{ isLoading, isError }}
          />
        </DataTableContent>
        <DataTableFooter>
          {paginationInfo && (
            <DataTablePagination
              table={ReactTable}
              paginationInfo={paginationInfo}
              handlePagination={handlePagination}
              isFetching={isFetching}
              handlePerPage={handlePerPage}
            />
          )}
        </DataTableFooter>
      </div>
    </DataTableLayout>
  );
};
