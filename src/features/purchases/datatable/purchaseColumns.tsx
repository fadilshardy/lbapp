import { DataTableColumnHeader } from '@components/ui/datatables/column-header';
import { Purchase } from '@features/purchases';
import { formatCurrencyWithoutSymbol } from '@lib/format';
import { ColumnDef } from '@tanstack/react-table';
import { ViewPurchaseButton } from '../components/Button/ViewPurchaseButton';

interface ProductColumnsProps {}

export const getPurchaseColumns = (): ColumnDef<Purchase>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='No Receipt' />,
    cell: ({ row }) => {
      const { no_receipt } = row.original;
      return (
        <div className='flex flex-col'>
          <span className='max-w-[500px] truncate font-medium'>{no_receipt}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Date' />,
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Amount (Rp)' />,
    cell: ({ row }) => formatCurrencyWithoutSymbol(row.original.total_amount),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ViewPurchaseButton currentPurchase={row.original} />,
  },
];
