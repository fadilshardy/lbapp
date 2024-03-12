import BaseIcon from '@components/BaseIcon';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { DataTableCrudRowActions } from '@components/ui/datatables/DataTableCrudRowActions';
import { DataTableColumnHeader } from '@components/ui/datatables/column-header';
import { Account, UpdateAccountButton } from '@features/accounts';
import { formatCurrencyWithoutSymbol } from '@lib/format';
import { mdiTrashCanOutline } from '@mdi/js';
import { ColumnDef } from '@tanstack/react-table';
import { InsertOpeningBalanceForm } from '../components/Form/InsertOpeningBalanceForm';
export const getAccountColumns = (): ColumnDef<Account>[] => [
  {
    accessorKey: 'code',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Code' />,
    cell: ({ row }) => {
      const isParent = row.original.is_parent;
      const code = row.original.code;

      return isParent ? (
        <div className='font-bold'>{code}</div>
      ) : (
        <div className='pl-2'>{code}</div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
  },

  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
    cell: ({ row }) => <Badge variant='outline'>{row.getValue('type')}</Badge>,
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Balance' />,
    cell: ({ row }) => {
      const formattedBalance = formatCurrencyWithoutSymbol(row.getValue('balance'));

      return formattedBalance;
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Active' />,
    cell: ({ row }) => {
      const isActive = row.getValue('is_active');
      return (
        <Badge
          variant='outline'
          className={isActive ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}
        >
          {isActive ? 'active' : 'inactive'}
        </Badge>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DataTableCrudRowActions row={row}>
          <InsertOpeningBalanceForm />

          <UpdateAccountButton currentAccount={row.original} />
          <Button
            className='border-e text-gray-700 hover:bg-gray-50 focus:relative'
            title='Edit Product'
            variant='ghost'
          >
            <BaseIcon path={mdiTrashCanOutline} className='w-4 h-4' />
          </Button>
        </DataTableCrudRowActions>
      );
    },
  },
];
