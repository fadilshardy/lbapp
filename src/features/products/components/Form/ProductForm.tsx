import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SeaarchableSelect } from '@components/ui/SearchableSelect';
import { AlertDialogCancel } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { useDebouncedQuery, useSearchQuery } from '@hooks/useSearchQuery';
import { ISelectLabel } from '@interfaces';
import { FormEventHandler } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Product } from '../../schemas/productSchema';
import { categoryApi } from '../../services/categoryApi';

interface IUpdateProductFormProps {
  form: UseFormReturn<Product>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isProductLoading: boolean;
}

export const ProductForm: React.FC<IUpdateProductFormProps> = ({
  form,
  handleSubmit,
  isProductLoading,
}) => {
  const { query, handleQueryChange } = useSearchQuery();
  const searchDebouncedQuery = useDebouncedQuery(query);

  const { data, isFetching: isCategoryLoading } = categoryApi.useGetSelectCategoriesQuery({
    searchQuery: searchDebouncedQuery,
  });

  const categories = data ?? [];
  const currentCategory = form.getValues('category') as ISelectLabel;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='flex flex-col space-y-4 overflow-y-auto'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Product Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category_id'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Category</FormLabel>
                <SeaarchableSelect
                  field={field}
                  selectItems={categories}
                  selectName='Category'
                  searchQuery={query}
                  handleQueryChange={handleQueryChange}
                  isLoading={isCategoryLoading}
                  currentValue={currentCategory}
                  handleSelect={(value) => {
                    return form.setValue('category_id', value.id);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='unit'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Input placeholder='Product Unit' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder='Product Brand' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder='Product Type' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='vendor_id'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Vendor</FormLabel>
                <SeaarchableSelect
                  field={field}
                  selectItems={categories}
                  selectName='Vendor'
                  searchQuery={query}
                  handleQueryChange={handleQueryChange}
                  isLoading={isCategoryLoading}
                  currentValue={currentCategory}
                  handleSelect={(value) => {
                    return form.setValue('category_id', value.id);
                  }}
                />
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
