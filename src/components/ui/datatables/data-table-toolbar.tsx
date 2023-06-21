import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { PlusSquare } from 'lucide-react';
import { Button } from '../button';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onSearchChange: (event) => void;
  searchValue: string;
}

export function DataTableToolbar<TData>({
  table,
  onSearchChange,
  searchValue,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-h-12  w-[150px] lg:w-[250px]"
          type="search"
          name="search"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Button size="default">
          <PlusSquare className="mr-2 h-4 w-4" />
          Product
        </Button>
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
