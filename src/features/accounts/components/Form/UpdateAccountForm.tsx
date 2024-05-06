import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@components/ui/use-toast';
import { Account, AccountForm, AccountSchema, accountApi } from '@features/accounts';
import { HandleFormSubmit } from '@lib/form';
import { useForm } from 'react-hook-form';

interface IUpdateAccountFormProps {
  handleModalToggle(open: boolean): void;
  currentAccount: Account;
}

export const UpdateAccountForm: React.FC<IUpdateAccountFormProps> = ({
  handleModalToggle,
  currentAccount,
}) => {
  const { toast } = useToast();

  const form = useForm<Account>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      ...currentAccount,
    },
  });

  const [updateAccount, { isLoading }] = accountApi.useUpdateAccountMutation();

  async function onSubmit(account: Account) {
    HandleFormSubmit({
      form: form,
      toast: toast,
      mutation: updateAccount,
      handleModalToggle: handleModalToggle,
      successMessage: `${account.name} is successfully updated!`,
      mutationProps: {
        payload: {
          ...account,
        },
        productKey: currentAccount.code,
      },
    });
  }

  return (
    <AccountForm
      form={form}
      handleSubmit={form.handleSubmit(onSubmit)}
      isAccountLoading={isLoading}
    />
  );
};
