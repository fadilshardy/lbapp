import { Button } from '@components/ui/button';
import { DataTableColumnHeader } from '@components/ui/datatables/column-header';
import { IProductCatalog } from '@features/pos/product-catalog';
import { formatCurrency, formatDateToString } from '@lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { PlusSquare } from 'lucide-react';

interface ProductCatalogColumnsProps {
  handleAddToCart: (product: IProductCatalog) => void;
}

export const getProductCatalogColumns = ({
  handleAddToCart,
}: ProductCatalogColumnsProps): ColumnDef<IProductCatalog>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const { name, brand, type, unit, code } = row.original;

      return (
        <div className="flex flex-col text-sm">
          <span className="sm:max-w-[250px] 2xl:max-w-full truncate font-medium  hover:text-clip ">
            {name}
          </span>
          <div className="text-xs text-gray-500 flex space-x-2 justify-between">
            <span>{brand}</span>
            <span>{unit}</span>
          </div>
          <div className="text-xs text-gray-500 flex space-x-2 justify-between">
            <span>{type}</span>
            <span>{code}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'detail',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Detail" />,
    cell: ({ row }) => {
      const { salePrice, QuantityInStock } = row.original;
      const formattedPrice = formatCurrency(salePrice);

      return (
        <div className="flex flex-col text-sm w-full h-full ">
          <div className="text-xs text-gray-500 flex space-x-2 justify-between">
            <span>price</span>
            <span className="font-medium">{formattedPrice}</span>
          </div>
          <div className="text-xs text-gray-500 flex space-x-2 justify-between">
            <span>Qty</span>
            <span className="font-medium">{QuantityInStock}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'purchaseDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const { purchaseDate } = row.original;
      const formattedDate = formatDateToString(purchaseDate);
      return <span className="text-sm text-gray-500">{formattedDate}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { original: cartItem } = row;

      return (
        <>
          <Button
            onClick={() => handleAddToCart(cartItem)}
            variant="outline"
            className="text-sm leading-none  py-3 px-4  rounded group"
          >
            <PlusSquare className="h-4 w-4 text-gray-600 group-hover:text-blue-500" />
          </Button>
        </>
      );
    },
  },
];
