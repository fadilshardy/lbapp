import { Badge } from '@components/ui/badge';
import { DataTableColumnHeader } from '@components/ui/datatables/column-header';
import { ITransaction, ViewTransactionButton } from '@features/transactions';
import { formatCurrencyWithoutSymbol } from '@lib/format';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const getTransactionColumns = (): ColumnDef<ITransaction>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Code' />,
    cell: ({ row }) => {
      return (
        <div className='flex flex-col'>
          <span className='max-w-[500px] truncate font-medium'>{row.original.code}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Date' />,
    cell: ({ row }) => (row.original.date ? format(row.original.date, 'dd MMMM yyyy') : 'N/A'),
  },
  {
    accessorKey: 'total_amount',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Amount (Rp)' />,
    cell: ({ row }) => formatCurrencyWithoutSymbol(row.original.total_amount),
  },
  {
    accessorKey: 'is_balanced',
    header: ({ column }) => <DataTableColumnHeader column={column} title='balanced' />,
    cell: ({ row }) => {
      const is_balanced = row.getValue('is_balanced');
      return (
        <Badge
          variant='outline'
          className={
            is_balanced ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'
          }
        >
          {is_balanced ? '✔' : '❌'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ViewTransactionButton currentTransaction={row.original} />,
  },
];
