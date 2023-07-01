import { DataTables } from '@components/ui/datatables/DataTables';
import {
  CreateProductButton,
  ImportProductButton,
  getProductColumns,
  productApi,
} from '@features/products';

interface ProductDataTableProps {}

export const ProductDatatable: React.FC<ProductDataTableProps> = () => {
  const productApiQuery = productApi.useGetProductsQuery;
  const productColumns = getProductColumns();

  const ActionButtons = () => {
    return (
      <div className="flex gap-4">
        {/* <Button variant="outline">
          <BaseIcon path={mdiFileUploadOutline} className="mr-2 h-4 w-4" />
          Import
        </Button> */}
        <ImportProductButton />
        <CreateProductButton />
      </div>
    );
  };

  return (
    <div className="space-y-4 w-full">
      <DataTables
        apiQuery={productApiQuery}
        columns={productColumns}
        ActionMenu={<ActionButtons />}
      />
    </div>
  );
};
