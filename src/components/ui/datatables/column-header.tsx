import { Column } from '@tanstack/react-table';

import BaseIcon from '@components/BaseIcon';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { cn } from '@lib/utils';
import {
  mdiEyeOffOutline,
  mdiSortAscending,
  mdiSortDescending,
  mdiUnfoldMoreHorizontal,
} from '@mdi/js';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <BaseIcon path={mdiSortDescending} className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <BaseIcon path={mdiSortAscending} className="ml-2 h-4 w-4" />
            ) : (
              <BaseIcon path={mdiUnfoldMoreHorizontal} className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <BaseIcon
              path={mdiSortAscending}
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <BaseIcon
              path={mdiSortDescending}
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <BaseIcon
              path={mdiEyeOffOutline}
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
            />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
