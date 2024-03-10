'use client';

import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import BaseIcon from '@components/BaseIcon';
import { mdiCalendarMonth } from '@mdi/js';
import { FormControl } from './ui/form';

export function DatePicker({ field }: { field: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] pl-3 text-left font-normal h-[40px]',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value ? format(field.value, 'dd MMMM yyyy') : format(new Date(), 'dd MMMM yyyy')}
            <BaseIcon path={mdiCalendarMonth} className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
