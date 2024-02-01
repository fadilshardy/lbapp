import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DatePicker } from '@components/DatePicker';
import { SeaarchableSelect } from '@components/ui/SearchableSelect';
import { AlertDialogCancel } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { productApi } from '@features/products';
import { PurchaseRecord } from '@features/purchases';
import { useDebouncedQuery, useSearchQuery } from '@hooks/useSearchQuery';
import { FormEventHandler } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';

interface IUpdateProductFormProps {
  form: UseFormReturn<PurchaseRecord>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isProductLoading: boolean;
}

export const PurchaseForm: React.FC<IUpdateProductFormProps> = ({
  form,
  handleSubmit,
  isProductLoading,
}) => {
  const { query, handleQueryChange } = useSearchQuery();
  const searchDebouncedQuery = useDebouncedQuery(query);

  const { data, isFetching: isLoading } = productApi.useGetSelectProductsQuery({
    searchQuery: searchDebouncedQuery,
  });
  const products = data ?? [];

  const { fields, append, remove } = useFieldArray({
    name: 'details',
    control: form.control,
  });

  const initialProduct = {
    product_name: 'select product',
    product_id: '1',
    quantity: 0,
    net_price: 0,
    sale_price: 0,
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='flex flex-col space-y-4 overflow-y-auto'>
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

          <FormField
            control={form.control}
            name='purchase.note'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Note <span className='text-xs text-gray-500'>(optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder='...' className='resize-none' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className='border-dotted' />
          {fields.map((field, index) => {
            form.watch(`details.${index}`);
            const currentPurchase = form.getValues(`details.${index}`);
            return (
              <div className='flex h-16 items-end gap-4 ' key={field.id}>
                <FormField
                  control={form.control}
                  name={`details.${index}.product_name`}
                  render={({ field }) => (
                    <FormItem className='flex flex-col w-full'>
                      <FormLabel>Name</FormLabel>
                      <SeaarchableSelect
                        field={field}
                        selectItems={products}
                        selectName='product'
                        searchQuery={query}
                        handleQueryChange={handleQueryChange}
                        isLoading={isLoading}
                        currentValue={{
                          name: `${currentPurchase.product_name}`,
                          id: currentPurchase.product_id as string,
                        }}
                        handleSelect={(value) => {
                          form.setValue(`details.${index}.product_id`, value.id);
                          form.setValue(`details.${index}.product_name`, value.name);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`details.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className='text-center'>
                      <FormLabel>QTY</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='qty'
                          {...field}
                          className='w-16  h-full'
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
                  name={`details.${index}.net_price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Net price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='...'
                          {...field}
                          className='w-28 h-full'
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
                  name={`details.${index}.sale_price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='...'
                          {...field}
                          className='w-28 h-full'
                          type='number'
                          min='1'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  disabled={isProductLoading}
                  variant='ghost'
                  onClick={() => remove(index)}
                >
                  x
                </Button>
              </div>
            );
          })}

          <div className='flex items-center justify-center gap-8'>
            <Button
              type='button'
              variant='action'
              className='w-32 border bg-gray-200 text-black hover:text-white '
              onClick={() => append(initialProduct)}
            >
              +
            </Button>
            <Button
              type='button'
              variant='ghost'
              className='w-32 border'
              onClick={() => {
                remove(fields.map((obj, index) => index));
                append(initialProduct);
              }}
            >
              clear
            </Button>
          </div>
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
