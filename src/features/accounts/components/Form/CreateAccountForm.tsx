import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@components/ui/use-toast';
import { Account, AccountForm, AccountSchema, accountApi } from '@features/accounts';
import { HandleFormSubmit } from '@lib/form';
import { useForm } from 'react-hook-form';

interface IAccountCreateFormProps {
  initialValues?: Account;
  handleModalToggle(open: boolean): void;
}

export const CreateAccountForm: React.FC<IAccountCreateFormProps> = ({ handleModalToggle }) => {
  const { toast } = useToast();

  const form = useForm<Account>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: '',
      type: '',
      parent_id: '',
      code: '',
      isParent: false,
    },
  });

  const [createAccount, { isLoading: isAccountLoading }] = accountApi.useCreateAccountMutation();

  async function onSubmit(account: Account) {
    HandleFormSubmit({
      form: form,
      toast: toast,
      mutation: createAccount,
      handleModalToggle: handleModalToggle,
      mutationProps: {
        payload: { ...account, parent_id: account.parent_id },
      },
    });
  }

  return (
    <AccountForm
      form={form}
      handleSubmit={form.handleSubmit(onSubmit)}
      isAccountLoading={isAccountLoading}
    />
  );
};
