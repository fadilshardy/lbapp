'use client';

import { DataTables } from '@components/ui/datatables/DataTables';
import { getProductColumns, productApi } from '@features/products';

interface ProductDataTableProps {}

export const ProductDatatable: React.FC<ProductDataTableProps> = () => {
  const productApiQuery = productApi.useGetProductsQuery;
  const productColumns = getProductColumns();

  return (
    <div className="space-y-4 w-full">
      <DataTables apiQuery={productApiQuery} columns={productColumns} />
    </div>
  );
};
