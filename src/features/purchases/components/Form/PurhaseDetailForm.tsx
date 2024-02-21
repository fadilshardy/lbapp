import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SeaarchableSelect } from '@components/ui/SearchableSelect';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { productApi } from '@features/products';
import { PurchaseRecord } from '@features/purchases/schemas/purchaseSchema';
import { useDebouncedQuery, useSearchQuery } from '@hooks/useSearchQuery';
import { UseFormReturn, useFieldArray } from 'react-hook-form';

interface PurhaseDetailFormProps {
  form: UseFormReturn<PurchaseRecord>;
}

export const PurchaseDetailForm: React.FC<PurhaseDetailFormProps> = ({ form }) => {
  const initialProduct = {
    product_name: 'select product',
    product_id: '1',
    quantity: 0,
    net_price: 0,
    sale_price: 0,
    purchase_amount: 0,
  };

  const { fields, append, remove } = useFieldArray({
    name: 'purchaseDetails',
    control: form.control,
  });

  const { query, handleQueryChange } = useSearchQuery();
  const searchDebouncedQuery = useDebouncedQuery(query);

  const { data, isFetching: isLoading } = productApi.useGetSelectProductsQuery({
    searchQuery: searchDebouncedQuery,
  });

  const products = data ?? [];

  const calculateTotal = (index: number) => {
    const netPrice = form.getValues(`purchaseDetails.${index}.net_price`);
    const quantity = form.getValues(`purchaseDetails.${index}.quantity`);

    const totalAmount = netPrice * quantity;

    form.setValue(`purchaseDetails.${index}.purchase_amount`, totalAmount);
  };

  return (
    <>
      <h3 className='text-lg font-semibold'>Detail</h3>

      {fields.map((field, index) => {
        form.watch(`purchaseDetails.${index}`);
        const currentPurchase = form.getValues(`purchaseDetails.${index}`);

        const isProductSelected = currentPurchase.product_id ? false : true;

        return (
          <div className='flex h-16 items-end gap-4' key={field.id}>
            <FormField
              control={form.control}
              name={`purchaseDetails.${index}.product_name`}
              render={({ field }) => (
                <FormItem className='flex flex-col w-full '>
                  <FormLabel>Name</FormLabel>
                  <SeaarchableSelect
                    field={field}
                    selectItems={products}
                    selectName='product'
                    searchQuery={query}
                    handleQueryChange={handleQueryChange}
                    isLoading={isLoading}
                    currentValue={{
                      name: currentPurchase.product_name,
                      id: currentPurchase.product_id,
                    }}
                    handleSelect={(value) => {
                      form.setValue(`purchaseDetails.${index}.product_id`, value.id);
                      form.setValue(`purchaseDetails.${index}.product_name`, value.name);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`purchaseDetails.${index}.quantity`}
              render={({ field }) => (
                <FormItem className='text-center'>
                  <FormLabel>QTY</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isProductSelected}
                      placeholder='qty'
                      {...field}
                      className='w-16  h-full'
                      type='number'
                      min='1'
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                        calculateTotal(index);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`purchaseDetails.${index}.net_price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Net price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isProductSelected}
                      placeholder='...'
                      {...field}
                      className='w-32 h-full'
                      type='number'
                      min='1'
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                        calculateTotal(index);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`purchaseDetails.${index}.purchase_amount`}
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
                      disabled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`purchaseDetails.${index}.sale_price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='...'
                      {...field}
                      className='w-32 h-full'
                      type='number'
                      min='1'
                      disabled={isProductSelected}
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
          onClick={() => append(initialProduct)}
        >
          + Add Field
        </Button>
        <Button
          type='button'
          variant='ghost'
          className=' border'
          onClick={() => {
            remove(fields.map((obj, index) => index));
            append(initialProduct);
          }}
        >
          clear
        </Button>
      </div>
    </>
  );
};
