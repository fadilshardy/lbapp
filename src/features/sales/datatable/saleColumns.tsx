import { DataTableColumnHeader } from '@components/ui/datatables/column-header';
import { Sale } from '@features/sales';
import { ColumnDef } from '@tanstack/react-table';
import { ViewSaleButton } from "../components/Button/ViewSaleButton";

interface SaleColumnsProps { }

export const getSaleColumns = (): ColumnDef<Sale>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="No Receipt" />,
    cell: ({ row }) => {
      const { no_receipt } = row.original;
      return (
        <div className="flex flex-col">
          <span className="max-w-[500px] truncate font-medium">{no_receipt}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
  },
  {
    id: 'actions',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Details" className="flex justify-center font-bold" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <ViewSaleButton currentSale={row.original} />
        </div>
      );
    },
  },
];
