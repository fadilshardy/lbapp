import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SeaarchableSelect } from '@components/ui/SearchableSelect';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { accountApi } from '@features/accounts';
import { TransactionRecord } from '@features/transactions';
import { useDebouncedQuery, useSearchQuery } from '@hooks/useSearchQuery';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface TransactionFormProps {
  form: UseFormReturn<TransactionRecord>;
  customFilter?: string;
  index: number;
  remove: (index: number) => void;
  disabled?: boolean;
}

export const SelectableAccount: FC<TransactionFormProps> = ({
  form,
  index,
  customFilter,
  remove,
  disabled,
}) => {
  const { query, handleQueryChange } = useSearchQuery();
  const searchDebouncedQuery = useDebouncedQuery(query);

  const { data, isFetching: isLoading } = accountApi.useGetSelectAccountsQuery({
    searchQuery: searchDebouncedQuery,
    customFilter: customFilter,
  });

  const accounts = data ?? [];

  const currentAccount = form.watch(`transactionDetails.${index}`);

  return (
    <div className='col-span-2'>
      <div className='flex items-end gap-4'>
        <FormField
          control={form.control}
          name={`transactionDetails.${index}.account_name`}
          render={({ field }) => (
            <FormItem className='flex flex-col w-full '>
              <FormLabel>Name</FormLabel>
              <SeaarchableSelect
                field={field}
                selectItems={accounts}
                selectName='account'
                searchQuery={query}
                handleQueryChange={handleQueryChange}
                isLoading={isLoading}
                disabled={disabled}
                currentValue={{
                  name: currentAccount.account_name,
                  id: currentAccount.account_id,
                }}
                handleSelect={(value) => {
                  form.setValue(`transactionDetails.${index}.account_id`, value.id);
                  form.setValue(`transactionDetails.${index}.account_name`, value.name);
                  form.setValue(`transactionDetails.${index}.balance`, Number(value.balance));
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`transactionDetails.${index}.balance`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current</FormLabel>
              <FormControl>
                <Input
                  disabled={true}
                  placeholder='...'
                  {...field}
                  className='w-24 h-full'
                  type='number'
                  min='1'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`transactionDetails.${index}.transaction_amount`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder='...'
                  {...field}
                  className='w-32 h-full'
                  type='number'
                  min='1'
                  disabled={currentAccount.account_id ? false : true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isLoading}
          variant='ghost'
          onClick={() => remove(index)}
          className='mb-6'
        >
          x
        </Button>
      </div>
    </div>
  );
};
