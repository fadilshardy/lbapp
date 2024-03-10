import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormField, FormItem, FormLabel } from '@components/ui/form';
import { TransactionRecord } from '@features/transactions';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface SelectTransactionTypeProps {
  handleTransactionFilter: (debitFilter: string, creditFilter: string) => void;
  form: UseFormReturn<TransactionRecord>;
}

export const SelectTransactionType: React.FC<SelectTransactionTypeProps> = ({
  handleTransactionFilter,
  form,
}) => {
  const setTransactionFilters = (value: string) => {
    switch (value) {
      case 'asset':
        handleTransactionFilter('&type[]=asset', '&type[]=liability&type[]=asset');
        break;
      case 'revenue':
        handleTransactionFilter('&type[]=asset', '&type[]=revenue');
        break;
      case 'liability':
        handleTransactionFilter('&type[]=liability&type[]=asset', '&type[]=liability&type[]=asset');
        break;
      case 'equity':
        handleTransactionFilter('&type[]=asset', '&type[]=equity');
        break;
      case 'expense':
        handleTransactionFilter('&type[]=expense', '&type[]=asset&type[]=liability');
      default:
        return null;
    }
  };
  return (
    <FormField
      control={form.control}
      name='transaction.transaction_type'
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <span className='text-xs font-bold relative top-[-3px] text-red-500 pr-1'>(1)</span>
            Select Transaction
          </FormLabel>
          <Select
            onValueChange={(value) => {
              setTransactionFilters(value);
              field.onChange(value);
            }}
            defaultValue={field.value}
          >
            <SelectTrigger className='w-[180px] h-[40px] overflow-hidden'>
              <SelectValue placeholder='Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='expense'>Beban Biaya</SelectItem>
              <SelectItem value='liability'>Kewajiban</SelectItem>
              <SelectItem value='equity'>Ekuitas</SelectItem>
              <SelectItem value='asset'>Aset</SelectItem>
              <SelectItem value='revenue'>Pendapatan</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
