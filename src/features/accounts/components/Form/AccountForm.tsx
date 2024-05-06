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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LoadingSpinner from '@components/LoadingSpinner';
import { SeaarchableSelect } from '@components/ui/SearchableSelect';
import { Switch } from '@components/ui/Switch';
import { AlertDialogCancel } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { Account, useCustomSelect } from '@features/accounts';
import { ISelectLabel } from '@interfaces';
import { FormEventHandler, useEffect } from 'react';
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
  const isParent = form.watch('is_parent');
  const parentId = form.watch('parent_id');

  const {
    selectedAccount,
    handleSelectedChange,
    accounts,
    query,
    handleQueryChange,
    isAccountFetching,
  } = useCustomSelect({
    customFilter: parentId ? `id=${parentId}` : 'is_parent=1',
  });

  useEffect(() => {
    if (!isParent && parentId && !selectedAccount.id && !isAccountFetching) {
      const account = accounts?.find((account) => account.id == parentId) as ISelectLabel;
      handleSelectedChange(account);
    }
  }, [selectedAccount, isAccountFetching]);

  if (isAccountFetching) return <LoadingSpinner />;

  const handleIsParentToggle = (checked: boolean) => {
    form.setValue('is_parent', checked);
    form.setValue('parent_id', '');
    form.setValue('code', '');
    handleSelectedChange({ id: null, name: null });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='flex flex-col space-y-4 overflow-y-auto'>
          <FormField
            control={form.control}
            name='is_parent'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                <div className='space-y-0.5'>
                  <FormLabel>Parent Account</FormLabel>
                  <FormDescription>
                    If disabled, the account will be signed as child account.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={handleIsParentToggle}
                    name={field.name}
                    ref={field.ref}
                    disabled={!isParent}
                    className='data-[state=checked]:bg-blue-500'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {isParent === true && (
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem className='transition animate-in fade-in  duration-500'>
                  <FormLabel>Parent Code</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isParent} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {!isParent && (
            <FormField
              control={form.control}
              name='parent_id'
              render={({ field }) => (
                <FormItem className='transition animate-in fade-in duration-500'>
                  <FormLabel>Parent Account</FormLabel>
                  <FormControl>
                    <SeaarchableSelect
                      disabled={!isParent && selectedAccount.id !== null}
                      field={field}
                      selectItems={accounts}
                      selectName='account'
                      searchQuery={query}
                      handleQueryChange={handleQueryChange}
                      isLoading={isAccountFetching}
                      currentValue={selectedAccount}
                      handleSelect={(value) => {
                        handleSelectedChange(value);
                        form.setValue('type', value.type);
                        form.setValue('parent_id', value.id);
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className='focus:outline-none'>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} disabled={!isParent} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select account type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='asset'>Asset</SelectItem>
                    <SelectItem value='liability'>Liability</SelectItem>
                    <SelectItem value='equity'>Equity</SelectItem>
                    <SelectItem value='revenue'>Revenue</SelectItem>
                    <SelectItem value='expense'>Expense</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='border-t flex justify-between w-full items-center pt-4'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button type='submit' disabled={isAccountLoading} variant='action'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
