import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import * as React from 'react';

import { FormControl } from '@/components/ui/form';
import BaseIcon from '@components/BaseIcon';
import { Button } from '@components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { ISelectLabel } from '@interfaces';
import { cn } from '@lib/utils';
import { mdiCheck, mdiUnfoldMoreHorizontal } from '@mdi/js';

interface ISearchSelectProps<T> {
  field: any;
  selectName: string;
  selectItems: any;
  isLoading?: boolean;
  handleSelect: (value: string) => void;
  searchQuery: string;
  handleQueryChange: (query: string) => void;
  currentValue: ISelectLabel;
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
}) => {
  function getSelectedOption() {
    const matchingItem = selectItems.find((item: ISelectLabel) => item.id === field.value);
    if (field.value && !matchingItem) return currentValue?.name;
    if (field.value && matchingItem) return matchingItem.name;

    return `Select ${selectName}`;
  }

  const selectedOption = getSelectedOption();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn('justify-between font-normal', !field.value && 'text-muted-foreground')}
          >
            {selectedOption}
            <BaseIcon path={mdiUnfoldMoreHorizontal} className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className=" p-0 w-full" align="end">
        <Command>
          <CommandInput
            placeholder={`search ${selectName}`}
            value={searchQuery}
            onValueChange={handleQueryChange}
          />
          <CommandEmpty>{isLoading ? `Loading...` : `No ${selectName} found.`}</CommandEmpty>

          <CommandGroup>
            {selectItems.map((item: any) => (
              <CommandItem
                value={item.name}
                key={item.id}
                onSelect={() => {
                  handleSelect(item.id);
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
        </Command>
      </PopoverContent>
    </Popover>
  );
};
