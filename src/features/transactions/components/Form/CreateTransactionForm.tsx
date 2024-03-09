import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { useToast } from '@components/ui/use-toast';
import {
  ITransactionRecord,
  TransactionForm,
  TransactionRecord,
  TransactionRecordSchema,
  transactionApi,
} from '@features/transactions';
import { HandleFormSubmit } from '@lib/form';
import { useForm } from 'react-hook-form';

interface ITransactionCreateFormProps {
  handleModalToggle(open: boolean): void;
}

const transactionRecordInitial: ITransactionRecord = {
  transaction: {
    type_id: 1,
    reference_id: 1,
    date: format(new Date(), 'dd MMMM yyyy'),
    total_amount: 0,
  },
  transactionDetails: [
    {
      account_name: 'select account',
      account_id: 0,
      balance: 0,
      transaction_amount: 0,
      transaction_type: 'credit',
    },
    {
      account_name: 'select account',
      account_id: 0,
      balance: 0,
      transaction_amount: 0,
      transaction_type: 'debit',
    },
  ],
};

export const CreateTransactionForm: React.FC<ITransactionCreateFormProps> = ({
  handleModalToggle,
}) => {
  const { toast } = useToast();

  const form = useForm<TransactionRecord>({
    resolver: zodResolver(TransactionRecordSchema),
    defaultValues: transactionRecordInitial,
  });

  const [createTransaction, { isLoading: isTransactionLoading }] =
    transactionApi.useCreateTransactionMutation();

  async function onSubmit(transactionRecord: TransactionRecord) {
    HandleFormSubmit({
      form: form,
      toast: toast,
      mutation: createTransaction,
      handleModalToggle,
      mutationProps: {
        payload: transactionRecord,
      },
    });
  }

  return (
    <TransactionForm
      form={form}
      handleSubmit={form.handleSubmit(onSubmit)}
      isProductLoading={isTransactionLoading}
      customFilter={'is_parent=0&is_active=1'}
    />
  );
};
