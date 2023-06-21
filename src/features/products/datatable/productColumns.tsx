import { Button } from '@components/ui/button';
import { DataTableColumnHeader } from '@components/ui/datatables/column-header';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { IProduct } from '../interfaces/product';

interface ProductColumnsProps {}

export const getProductColumns = (): ColumnDef<IProduct>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const { name, code } = row.original;
      return (
        <div className="flex flex-col">
          <span className="max-w-[500px] truncate font-medium">{name}</span>
          <span className="text-muted-foreground"> {code}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Unit" />,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Brand" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </>
      );
    },
  },
];
