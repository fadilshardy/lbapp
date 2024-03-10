import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@components/ui/button';
import {
  SelectTransactionType,
  SelectableAccount,
  TransactionRecord,
  useTransactionTotals,
} from '@features/transactions';
import { FormEventHandler, useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';

import {} from '@/components/ui/form';
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

  const [debitFilter, setDebitFilter] = useState('');
  const [creditFilter, setCreditFilter] = useState('');

  const clearAccountInput = () => {
    remove(fields.map((obj, index) => index));
    append([
      { ...initialTransaction, transaction_type: 'credit' },
      { ...initialTransaction, transaction_type: 'debit' },
    ]);
  };

  const handleTransactionFilter = (debit: string, credit: string) => {
    const commonFilter = 'is_parent=0&is_active=1';
    setDebitFilter(`${commonFilter}${debit}`);
    setCreditFilter(`${commonFilter}${credit}`);
    clearAccountInput();
  };

  const { totalCredit, totalDebit } = useTransactionTotals(form);
  const isDisabled =
    totalCredit === 0 || totalDebit === 0 || isProductLoading || totalCredit !== totalDebit;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-8 font-xs'>
        <div className='flex flex-col w-full gap-y-4'>
          <div>
            <div className='flex justify-between'>
              <SelectTransactionType
                handleTransactionFilter={handleTransactionFilter}
                form={form}
              />
              <FormField
                control={form.control}
                name='transaction.date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>
                      <span className='text-xs font-bold relative top-[-3px] text-red-500 pr-1'>
                        (2)
                      </span>
                      Date
                    </FormLabel>
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
                    <span className='text-xs font-bold relative top-[-3px] text-red-500 pr-1'>
                      (3)
                    </span>
                    Note
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='...'
                      className='resize-none h-full'
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-2 space-x-4'>
            <div>
              <h3 className='text-lg font-semibold border-b text-center  mb-4  pb-2'>
                <span className='text-xs font-bold relative top-[-5px] text-red-500 pr-1'>(4)</span>
                Debit
              </h3>
              {fields.map((field, index) => {
                const currentAccount = form.getValues(`transactionDetails.${index}`);
                return (
                  <div key={field.id}>
                    {currentAccount.transaction_type == 'debit' && (
                      <SelectableAccount
                        form={form}
                        index={index}
                        customFilter={debitFilter}
                        remove={remove}
                        disabled={!debitFilter}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div>
              <h3 className='text-lg font-semibold border-b text-center mb-4 pb-2'>
                <span className='text-xs font-bold relative top-[-5px] text-red-500 pr-1'>(5)</span>
                Credit
              </h3>
              {fields.map((field, index) => {
                const currentAccount = form.getValues(`transactionDetails.${index}`);
                return (
                  <div key={field.id}>
                    {currentAccount.transaction_type == 'credit' && (
                      <SelectableAccount
                        form={form}
                        index={index}
                        customFilter={creditFilter}
                        remove={remove}
                        disabled={!creditFilter}
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
            <Button type='button' variant='default' className=' border' onClick={clearAccountInput}>
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
