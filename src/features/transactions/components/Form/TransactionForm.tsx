import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@components/ui/button';
import { SelectableAccount, TransactionRecord, useTransactionTotals } from '@features/transactions';
import { FormEventHandler } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';

import {} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@components/DatePicker';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';

interface TransactionFormProps {
  form: UseFormReturn<TransactionRecord>;
  customFilter?: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isProductLoading: boolean;
}

const initialTransaction = {
  account_name: 'select account',
  account_id: 0,
  balance: 0,
  transaction_amount: 0,
  transaction_type: '',
};

export const TransactionForm: React.FC<TransactionFormProps> = ({
  form,
  customFilter,
  handleSubmit,
  isProductLoading,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: 'transactionDetails',
    control: form.control,
  });

  const { totalCredit, totalDebit } = useTransactionTotals(form);
  const isDisabled =
    totalCredit === 0 || totalDebit === 0 || isProductLoading || totalCredit !== totalDebit;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-8 font-xs'>
        <div className='flex flex-col w-full gap-y-4'>
          <div>
            <div className='flex justify-between'>
              <FormItem>
                <FormLabel>Select Transaction</FormLabel>
                <Select>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='expense'>Expense</SelectItem>
                    <SelectItem value='liability'>Liability</SelectItem>
                    <SelectItem value='system'>System</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name='transaction.date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Date</FormLabel>
                    <DatePicker field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='transaction.note'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Note <span className='text-xs text-gray-500'>(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder='...' className='resize-none h-full' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-2 space-x-4'>
            <div>
              <h3 className='text-lg font-semibold border-b text-center  mb-4  pb-2'>Debit</h3>
              {fields.map((field, index) => {
                const currentAccount = form.getValues(`transactionDetails.${index}`);
                return (
                  <div key={field.id}>
                    {currentAccount.transaction_type == 'debit' && (
                      <SelectableAccount
                        form={form}
                        index={index}
                        customFilter={customFilter}
                        remove={remove}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div>
              <h3 className='text-lg font-semibold border-b text-center mb-4 pb-2'>Credit</h3>
              {fields.map((field, index) => {
                const currentAccount = form.getValues(`transactionDetails.${index}`);
                return (
                  <div key={field.id}>
                    {currentAccount.transaction_type == 'credit' && (
                      <SelectableAccount
                        form={form}
                        index={index}
                        customFilter={customFilter}
                        remove={remove}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className='flex items-center justify-center gap-4'>
            <Button
              type='button'
              variant='outline'
              className='w-full text-black hover:text-blue-500 border-dashed border border-gray-300 hover:border-blue-500 hover:bg-gray-50'
              onClick={() => append({ ...initialTransaction, transaction_type: 'debit' })}
            >
              + Debit
            </Button>
            <Button
              type='button'
              variant='outline'
              className='w-full text-black hover:text-blue-500 border-dashed border border-gray-300 hover:border-blue-500 hover:bg-gray-50'
              onClick={() => append({ ...initialTransaction, transaction_type: 'credit' })}
            >
              + Credit
            </Button>
          </div>

          <hr />
          <div className='flex justify-between'>
            <FormItem>
              <FormLabel>Total debit</FormLabel>
              <FormControl>
                <Input
                  placeholder='...'
                  value={totalDebit}
                  className='w-32 h-12'
                  type='string'
                  min='1'
                  disabled={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Total credit</FormLabel>
              <FormControl>
                <Input
                  placeholder='...'
                  value={totalCredit}
                  className='w-32 h-12'
                  type='string'
                  min='1'
                  disabled={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
          <div className='flex justify-between'>
            <Button
              type='button'
              variant='default'
              className=' border'
              onClick={() => {
                remove(fields.map((obj, index) => index));
                append([
                  { ...initialTransaction, transaction_type: 'credit' },
                  { ...initialTransaction, transaction_type: 'debit' },
                ]);
              }}
            >
              clear
            </Button>
            <Button type='submit' variant='action' className=' border' disabled={isDisabled}>
              submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
