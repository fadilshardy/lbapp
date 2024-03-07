import { DataTables } from '@components/ui/datatables/DataTables';
import {
  CreateTransactionButton,
  getTransactionColumns,
  transactionApi,
} from '@features/transactions';

interface PurchaseDataTableProps {}

export const TransactionDatatable: React.FC<PurchaseDataTableProps> = () => {
  const productApiQuery = transactionApi.useGetTransactionsQuery;
  const productColumns = getTransactionColumns();

  const ActionButtons = () => {
    return (
      <div className='flex gap-4'>
        <CreateTransactionButton />
      </div>
    );
  };

  return (
    <div className='space-y-4 w-full'>
      <DataTables
        apiQuery={productApiQuery}
        columns={productColumns}
        ActionMenu={<ActionButtons />}
      />
    </div>
  );
};
