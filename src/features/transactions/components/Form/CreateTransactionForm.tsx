import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { useToast } from '@components/ui/use-toast';
import {
  PurchaseForm,
  PurchaseRecord,
  PurchaseRecordSchema,
} from '@features/purchases';
import {transactionApi } from '@features/transactions'
import { HandleFormSubmit } from '@lib/form';
import { useForm } from 'react-hook-form';

interface IPurchaseCreateFormProps {
  handleModalToggle(open: boolean): void;
}

export const CreatePurchaseForm: React.FC<IPurchaseCreateFormProps> = ({ handleModalToggle }) => {
  const { toast } = useToast();

  const purchaseRecordInitial: PurchaseRecord = {
    purchase: {
      date: format(new Date(), 'dd MMMM yyyy'),
      note: '',
      total_amount: 0,
    },
    purchaseDetails: [
      {
        product_name: 'select product',
        product_id: '',
        quantity: 0,
        net_price: 0,
        sale_price: 0,
        purchase_amount: 0,
      },
    ],
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
    ],
  };

  const form = useForm<PurchaseRecord>({
    resolver: zodResolver(PurchaseRecordSchema),
    defaultValues: purchaseRecordInitial,
  });

  const [createPurchase, { isLoading: isPurchaseLoading }] =
  transactionApi.useCreateTransactionMutation();

  async function onSubmit(purchaseRecord: PurchaseRecord) {
    const debitTransaction = {
      account_id: 1,
      transaction_amount: purchaseRecord.purchase.total_amount,
      transaction_type: 'debit',
    };

    purchaseRecord.transactionDetails.push(debitTransaction);

    HandleFormSubmit({
      form: form,
      toast: toast,
      mutation: createPurchase,
      handleModalToggle,
      mutationProps: {
        payload: purchaseRecord,
      },
    });
  }

  return (
    <PurchaseForm
      form={form}
      handleSubmit={form.handleSubmit(onSubmit)}
      isProductLoading={isPurchaseLoading}
    />
  );
};