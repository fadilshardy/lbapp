import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormItem, FormLabel } from '@components/ui/form';
import React from 'react';

interface SelectTransactionTypeProps {
  handleTransactionFilter: (debitFilter: string, creditFilter: string) => void;
}

export const SelectTransactionType: React.FC<SelectTransactionTypeProps> = ({
  handleTransactionFilter,
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
        handleTransactionFilter('&type[]=asset', '&type[]=liability');
        break;
      case 'equity':
        handleTransactionFilter('&type[]=asset', '&type[]=equity');
        break;
      case 'expense':
        handleTransactionFilter('&type[]=expense', '&type[]=asset');
      default:
        return null;
    }
  };
  return (
    <FormItem>
      <FormLabel>
        <span className='text-xs font-bold relative top-[-3px] text-red-500 pr-1'>(1)</span>
        Select Transaction
      </FormLabel>
      <Select onValueChange={setTransactionFilters}>
        <SelectTrigger className='w-[180px] h-[40px] overflow-hidden'>
          <SelectValue placeholder='Type' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='expense'>Expenses</SelectItem>
          <SelectItem value='liability'>Liability</SelectItem>
          <SelectItem value='equity'>Equity</SelectItem>
          <SelectItem value='asset'>Asset</SelectItem>
          <SelectItem value='revenue'>Revenue</SelectItem>
        </SelectContent>
      </Select>
    </FormItem>
  );
};
