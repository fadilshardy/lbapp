import { Row } from '@tanstack/react-table';

interface DataTableCrudRowActionsProps<TData> {
  row: Row<TData>;
  children: React.ReactNode;
}

export function DataTableCrudRowActions<TData>({ row, children }: DataTableCrudRowActionsProps<TData>) {
  return (
    <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm items-center">
      {children}
    </span>
  );
}
