import BaseIcon from '@components/BaseIcon';
import { Button } from '@components/ui/button';
import { DataTables } from '@components/ui/datatables/DataTables';

import { accountApi } from '@features/accounts';
import { getLedgerColumns } from '@features/reports';
import { mdiPrinter } from '@mdi/js';

export const LedgerDatatable: React.FC = () => {
  const accountApiQuery = accountApi.useGetAccountsQuery;
  const ledgerColumns = getLedgerColumns();

  return (
    <div className='space-y-4 w-full'>
      <DataTables
        apiQuery={accountApiQuery}
        columns={ledgerColumns}
        ActionMenu={
          <div className='flex gap-4'>
            <Button variant='outline'>
              <BaseIcon path={mdiPrinter} className='mr-2 h-4 w-4' />
              Print
            </Button>
          </div>
        }
      />
    </div>
  );
};
