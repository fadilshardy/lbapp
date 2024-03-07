import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DatePicker } from '@components/DatePicker';
import { AlertDialogCancel } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { PaymentTransactionForm, PurchaseDetailForm, PurchaseRecord } from '@features/purchases';
import { FormEventHandler, useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

interface IProductFormProps {
  form: UseFormReturn<PurchaseRecord>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isProductLoading: boolean;
}

export const PurchaseForm: React.FC<IProductFormProps> = ({
  form,
  handleSubmit,
  isProductLoading,
}) => {
  const details = useWatch({
    control: form.control,
    name: ['purchaseDetails', 'transactionDetails'],
  });

  useEffect(() => {
    const totalPurchaseAmount = form.getValues('purchaseDetails').reduce((total, item) => {
      return total + Number(item.quantity * item.net_price);
    }, 0);

    const totalPaymentAmount = form.getValues('transactionDetails').reduce((total, item) => {
      return total + Number(item.transaction_amount);
    }, 0);

    form.setValue('purchase.total_amount', totalPurchaseAmount);
    form.setValue('transaction.total_amount', totalPaymentAmount);
  }, [details]);

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='flex flex-col space-y-4 overflow-y-auto'>
          <div className='flex gap-4'>
            <div className='flex flex-col'>
              <div className='flex justify-between'>
                <FormField
                  control={form.control}
                  name='purchase.date'
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
                name='purchase.note'
                render={({ field }) => (
                  <FormItem className='mb-2 pb-4'>
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
            <PaymentTransactionForm form={form} />
          </div>

          <hr className='border-dotted' />
          <PurchaseDetailForm form={form} />
          <hr className='border-dotted' />
          <h3 className='text-lg font-semibold'>Calculation</h3>
        </div>
        <div className='flex justify-between h-full'>
          <FormField
            control={form.control}
            name={`transaction.total_amount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Total Payment <span className='text-xs text-gray-500'>(Credit)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='...'
                    {...field}
                    className='w-32 h-12'
                    type='string'
                    min='1'
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`purchase.total_amount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Total Purchase <span className='text-xs text-gray-500'>(Debit)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='...'
                    {...field}
                    className='w-32 h-12'
                    type='string'
                    min='1'
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='border-t flex justify-between w-full items-center pt-4'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button type='submit' disabled={isProductLoading} variant='action'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
