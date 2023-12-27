import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { FormControl } from '@/components/ui/form';
import BaseIcon from '@components/BaseIcon';
import { Button } from '@components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { ISelectLabel } from '@interfaces';
import { cn } from '@lib/utils';
import { mdiCheck, mdiUnfoldMoreHorizontal } from '@mdi/js';
import { useState } from 'react';

interface ISearchSelectProps<T> {
  field: any;
  selectName: string;
  selectItems: any;
  isLoading?: boolean;
  handleSelect: (value: string) => void;
  searchQuery: string;
  handleQueryChange: (query: string) => void;
  currentValue?: ISelectLabel;
  disabled?: boolean;
}

export const SeaarchableSelect: React.FC<ISearchSelectProps<any>> = ({
  field,
  selectItems,
  handleSelect,
  selectName,
  searchQuery,
  handleQueryChange,
  isLoading,
  currentValue,
  disabled,
}) => {
  function getSelectedOption() {
    const matchingItem = selectItems.find((item: ISelectLabel) => item.id === field.value);
    if (field.value && !matchingItem) return currentValue?.name;
    if (field.value && matchingItem) return matchingItem.name;

    return `Select ${selectName}`;
  }
  const [open, setOpen] = useState(false);

  const selectedOption = getSelectedOption();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'justify-between font-normal flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring',
              !field.value && 'text-muted-foreground'
            )}
            disabled={disabled}
          >
            {selectedOption}
            <BaseIcon path={mdiUnfoldMoreHorizontal} className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[200px]" side="right" align="start">
        <Command>
          <CommandInput
            placeholder={`Search ${selectName}...`}
            value={searchQuery}
            onValueChange={handleQueryChange}
          />
          <CommandList className="h-[var(--cmdk-list-height)] max-h-[200px]">
            <CommandEmpty>{isLoading ? `Loading...` : `No ${selectName} found.`}</CommandEmpty>
            <CommandGroup>
              {selectItems.map((item: ISelectLabel) => (
                <CommandItem
                  value={item.name}
                  key={item.id}
                  onSelect={() => {
                    handleSelect(item.id);
                    setOpen(false);
                  }}
                >
                  <BaseIcon
                    path={mdiCheck}
                    className={cn(
                      'mr-2 h-4 w-4',
                      item.id === field.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
