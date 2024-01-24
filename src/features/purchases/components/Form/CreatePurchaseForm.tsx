import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { useToast } from '@components/ui/use-toast';
import {
  purchaseApi,
  PurchaseForm,
  PurchaseRecord,
  PurchaseRecordSchema,
} from '@features/purchases';
import { HandleFormSubmit } from '@lib/form';
import { useForm } from 'react-hook-form';
import { Product } from '../../schemas/productSchema';

interface IPurchaseCreateFormProps {
  initialValues?: Product;
  handleModalToggle(open: boolean): void;
}

export const CreatePurchaseForm: React.FC<IPurchaseCreateFormProps> = ({ handleModalToggle }) => {
  const { toast } = useToast();

  const purchaseRecordInitial: PurchaseRecord = {
    purchase: {
      date: format(new Date(), 'dd MMMM yyyy'),
      note: '',
    },
    details: [
      {
        product_name: 'select product',
        product_id: '',
        quantity: 0,
        net_price: 0,
        sale_price: 0,
      },
    ],
  };

  const form = useForm<PurchaseRecord>({
    resolver: zodResolver(PurchaseRecordSchema),
    defaultValues: purchaseRecordInitial,
  });

  const [createPurchase, { isLoading: isPurchaseLoading }] =
    purchaseApi.useCreatePurchaseMutation();

  async function onSubmit(purchaseRecord: PurchaseRecord) {
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
