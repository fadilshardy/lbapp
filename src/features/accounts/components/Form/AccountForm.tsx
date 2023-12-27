import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SeaarchableSelect } from '@components/ui/SearchableSelect';
import { Switch } from '@components/ui/Switch';
import { AlertDialogCancel } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { Account, accountApi } from '@features/accounts';
import { useDebouncedQuery, useSearchQuery } from '@hooks/useSearchQuery';
import { ISelectLabel } from '@interfaces';
import { FormEventHandler } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IAccountFormProps {
  form: UseFormReturn<Account>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isAccountLoading: boolean;
}

export const AccountForm: React.FC<IAccountFormProps> = ({
  form,
  handleSubmit,
  isAccountLoading,
}) => {
  const { query, handleQueryChange } = useSearchQuery();
  const searchDebouncedQuery = useDebouncedQuery(query);

  const isParent = form.watch('isParent');
  const handleIsParentToggle = (checked: boolean) => {
    form.setValue('isParent', checked);
    form.setValue('parentId', '');
    form.setValue('code', '');
  };


  const { data, isFetching: isCategoryLoading } = accountApi.useGetSelectAccountsQuery({
    searchQuery: searchDebouncedQuery,
  });

  const parentAccounts = data ?? [];

  const currentParentAccountId = form.getValues('parentId') as ISelectLabel | undefined;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col space-y-4 overflow-y-auto">
          <FormField
            control={form.control}
            name="isParent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Parent Account</FormLabel>
                  <FormDescription>
                    If disabled, the account will be signed as child account.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    onCheckedChange={handleIsParentToggle}
                    name={field.name}
                    ref={field.ref}
                    className="data-[state=checked]:bg-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {isParent && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="transition animate-in fade-in  duration-500">
                  <FormLabel>Parent Code</FormLabel>
                  <FormControl>
                    <Input placeholder="code..." {...field} disabled={!isParent} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {!isParent && (
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem className="transition animate-in fade-in duration-500">
                  <FormLabel>Parent Account</FormLabel>
                  <FormControl>
                    <SeaarchableSelect
                      disabled={isParent}
                      field={field}
                      selectItems={parentAccounts}
                      selectName="account"
                      searchQuery={query}
                      handleQueryChange={handleQueryChange}
                      isLoading={isCategoryLoading}
                      currentValue={currentParentAccountId}
                      handleSelect={(value) => {
                        return form.setValue('parentId', value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Account type..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="border-t flex justify-between w-full items-center pt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button type="submit" disabled={isAccountLoading} variant="action">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
