'use client';

import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import BaseDatatable from '@components/ui/datatables/baseDataTable';
import { Input } from '@components/ui/input';
import { CartItem, addToCart } from '@features/pos/cart';
import { getProductCatalogColumns, productCatalogsApi } from '@features/pos/product-catalog';
import { useDebouncedQuery, useSearchQuery } from '@hooks/useSearchQuery';
import { useAppDispatch } from '@stores/hooks';
import { useState } from 'react';

interface CatalogataTableProps {}

export const CatalogDatatable: React.FC<CatalogataTableProps> = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const dispatch = useAppDispatch();

  const { query: searchCatalogQuery, handleQueryChange: handleCatalogQueryChange } =
    useSearchQuery();

  const searchCatalogDebouncedQuery = useDebouncedQuery(searchCatalogQuery);

  const handleAddToCart = (cart: CartItem) => {
    dispatch(addToCart(cart));
  };

  const productCatalogColumns = getProductCatalogColumns({ handleAddToCart });

  const {
    data: productCatalogs,
    isLoading,
    isError,
  } = productCatalogsApi.useGetProductCatalogsQuery(searchCatalogDebouncedQuery);

  const productTable = useReactTable({
    data: productCatalogs,
    columns: productCatalogColumns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search products..."
        className="h-12 w-full my-4"
        value={searchCatalogQuery}
        onChange={(e) => handleCatalogQueryChange(e.target.value)}
      />
      <div className="rounded-md border">
        <BaseDatatable
          data={productCatalogs}
          table={productTable}
          columns={productCatalogColumns}
          dataStatus={{ isLoading, isError }}
        />
      </div>
    </div>
  );
};
