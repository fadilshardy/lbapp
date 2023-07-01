import { Product, UpdateProductButton } from '@features/products';
import { DeleteProductButton } from '@features/products/components/Button/DeleteProductButton';
import { Row } from '@tanstack/react-table';

interface DataTableCrudRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableCrudRowActions<TData>({ row }: DataTableCrudRowActionsProps<TData>) {
  const currentProduct = row.original as Product;

  return (
    <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm items-center">
      <UpdateProductButton currentProduct={currentProduct} />

      <DeleteProductButton currentProduct={currentProduct} />
    </span>
  );
}
