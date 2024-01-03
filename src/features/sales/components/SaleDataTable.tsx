import { DataTables } from '@components/ui/datatables/DataTables';
import {
  CreateProductButton,
  ImportProductButton
} from '@features/products';
import {
  getSaleColumns,
  saleApi,
} from '@features/sales';

interface ProductDataTableProps { }

export const SaleDatatable: React.FC<ProductDataTableProps> = () => {
  const saleApiQuery = saleApi.useGetSalesQuery;
  const saleColumns = getSaleColumns();

  const ActionButtons = () => {
    return (
      <div className="flex gap-4">
        <ImportProductButton />
        <CreateProductButton />
      </div>
    );
  };

  return (
    <div className="space-y-4 w-full">
      <DataTables
        apiQuery={saleApiQuery}
        columns={saleColumns}
        ActionMenu={<ActionButtons />}
      />
    </div>
  );
};
