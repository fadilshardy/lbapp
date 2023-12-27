import { Badge } from '@components/ui/badge';
import { DataTableCrudRowActions } from '@components/ui/datatables/DataTableCrudRowActions';
import { DataTableColumnHeader } from '@components/ui/datatables/column-header';
import { Account } from '@features/accounts';
import { formatCurrency } from '@lib/format';
import { ColumnDef } from '@tanstack/react-table';

export const getAccountColumns = (): ColumnDef<Account>[] => [
  {
    accessorKey: 'code',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },

  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => <Badge variant="outline">{row.getValue('type')}</Badge>,
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Balance" />,
    cell: ({ row }) => {
      const formattedBalance = formatCurrency(row.getValue('balance'));

      return formattedBalance;
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
    cell: ({ row }) => {
      const isActive = row.getValue('is_active');
      return (
        <Badge
          variant="outline"
          className={isActive ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}
        >
          {isActive ? 'active' : 'inactive'}
        </Badge>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableCrudRowActions row={row} />,
  },
];
