import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SeaarchableSelect } from '@components/ui/SearchableSelect';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { accountApi } from '@features/accounts';
import { PurchaseRecord } from '@features/purchases/schemas/purchaseSchema';
import { useDebouncedQuery, useSearchQuery } from '@hooks/useSearchQuery';
import { UseFormReturn, useFieldArray } from 'react-hook-form';

interface TransactionFormProps {
  form: UseFormReturn<PurchaseRecord>;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ form }) => {
  const initialTransaction = {
    account_name: 'select account',
    account_id: 0,
    balance: 0,
    transaction_amount: 0,
    transaction_type: 'credit',
  };

  const { fields, append, remove } = useFieldArray({
    name: 'transactionDetails',
    control: form.control,
  });

  const { query, handleQueryChange } = useSearchQuery();
  const searchDebouncedQuery = useDebouncedQuery(query);

  const { data, isFetching: isLoading } = accountApi.useGetSelectAccountsQuery({
    searchQuery: searchDebouncedQuery,
    customFilter: 'is_parent=0&type[]=liability&type[]=asset&is_active=1',
  });
  const accounts = data ?? [];

  return (
    <div className='flex flex-col w-full gap-y-4'>
      <h3 className='text-lg font-semibold'>Payment</h3>

      {fields.map((field, index) => {
        form.watch(`transactionDetails.${index}`);
        const currentAccount = form.getValues(`transactionDetails.${index}`);

        return (
          <div className='flex  items-end gap-4' key={field.id}>
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
                  <FormLabel>Current Balance</FormLabel>
                  <FormControl>
                    <Input
                      disabled={true}
                      placeholder='...'
                      {...field}
                      className='w-32 h-full'
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
        );
      })}
      <div className='flex items-center justify-center gap-4'>
        <Button
          type='button'
          variant='outline'
          className='w-full text-black hover:text-blue-500 border-dashed border border-gray-300 hover:border-blue-500 hover:bg-gray-50'
          onClick={() => append(initialTransaction)}
        >
          + Add Field
        </Button>
        <Button
          type='button'
          variant='ghost'
          className=' border'
          onClick={() => {
            remove(fields.map((obj, index) => index));
            append(initialTransaction);
          }}
        >
          clear
        </Button>
      </div>
    </div>
  );
};
