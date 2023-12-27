import { DataTables } from '@components/ui/datatables/DataTables';

import {
  CreateAccountButton,
  ImportProductButton,
  accountApi,
  getAccountColumns,
} from '@features/accounts';

interface ProductDataTableProps {}

export const AccountDatatable: React.FC<ProductDataTableProps> = () => {
  const productApiQuery = accountApi.useGetAccountsQuery;
  const accountColumns = getAccountColumns();

  const ActionButtons = () => {
    return (
      <div className="flex gap-4">
        <ImportProductButton />
        <CreateAccountButton />
      </div>
    );
  };

  return (
    <div className="space-y-4 w-full">
      <DataTables
        apiQuery={productApiQuery}
        columns={accountColumns}
        ActionMenu={<ActionButtons />}
      />
    </div>
  );
};
