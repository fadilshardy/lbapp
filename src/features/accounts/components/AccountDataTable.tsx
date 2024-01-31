import { DataTables } from '@components/ui/datatables/DataTables';

import {
  CreateAccountButton,
  ImportProductButton,
  accountApi,
  getAccountColumns,
} from '@features/accounts';
import { InsertOpeningBalanceForm } from './Form/InsertOpeningBalanceForm';

interface AccountDataTableProps {}

export const AccountDatatable: React.FC<AccountDataTableProps> = () => {
  const accountApiQuery = accountApi.useGetAccountsQuery;
  const accountColumns = getAccountColumns();

  const ActionButtons = () => {
    return (
      <div className='flex gap-4'>
        <ImportProductButton />
        <CreateAccountButton />
      </div>
    );
  };

  return (
    <div className='space-y-4 w-full'>
      <InsertOpeningBalanceForm />
      <DataTables
        apiQuery={accountApiQuery}
        columns={accountColumns}
        ActionMenu={<ActionButtons />}
      />
    </div>
  );
};
