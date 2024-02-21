import { DataTableCrudRowActions } from '@components/ui/datatables/DataTableCrudRowActions';
import { DataTableColumnHeader } from '@components/ui/datatables/column-header';
import { DeleteProductButton, Product, UpdateProductButton } from '@features/products';
import { ColumnDef } from '@tanstack/react-table';

interface ProductColumnsProps {}

export const getProductColumns = (): ColumnDef<Product>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => {
      const { name, code } = row.original;
      return (
        <div className='flex flex-col'>
          <span className='max-w-[500px] truncate font-medium'>{name}</span>
          <span className='text-muted-foreground'> {code}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Unit' />,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Brand' />,
  },
  {
    accessorKey: 'vendor',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Vendor' />,
    cell: ({ row }) => {
      return row.original.vendor?.name ?? '-';
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableCrudRowActions row={row}>
        <UpdateProductButton currentProduct={row.original} />
        <DeleteProductButton currentProduct={row.original} />
      </DataTableCrudRowActions>
    ),
  },
];
