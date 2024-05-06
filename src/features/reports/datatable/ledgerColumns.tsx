import { Badge } from '@components/ui/badge';
import { Account } from '@features/accounts';
import { formatCurrencyWithoutSymbol } from '@lib/format';
import { ColumnDef } from '@tanstack/react-table';

import { ViewLedgerButton } from '@features/reports';

export const getLedgerColumns = (): ColumnDef<Account>[] => [
  {
    accessorKey: 'code',
    cell: ({ row }) => {
      const isParent = row.original.is_parent;
      const code = row.original.code;

      return isParent ? <div className='font-bold'>{code}</div> : <div>{code}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },

  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <Badge variant='outline'>{row.getValue('type')}</Badge>,
  },
  {
    accessorKey: 'balance',
    cell: ({ row }) => {
      const formattedBalance = formatCurrencyWithoutSymbol(row.getValue('balance'));

      return formattedBalance;
    },
  },
  {
    id: 'actions',

    cell: ({ row }) => {
      return !row.original.is_parent ? (
        <ViewLedgerButton currentAccount={row.original} />
      ) : (
        <div></div>
      );
    },
  },
];
