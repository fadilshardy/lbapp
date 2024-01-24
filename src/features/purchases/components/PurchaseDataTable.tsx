import { DataTables } from '@components/ui/datatables/DataTables';
import { CreatePurchaseButton, getPurchaseColumns, purchaseApi } from '@features/purchases';



interface PurchaseDataTableProps { }

export const PurchaseDatatable: React.FC<PurchaseDataTableProps> = () => {
  const productApiQuery = purchaseApi.useGetPurchasesQuery;
  const productColumns = getPurchaseColumns();

  const ActionButtons = () => {
    return (
      <div className="flex gap-4">
        <CreatePurchaseButton />
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
