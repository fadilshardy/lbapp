import BaseIcon from '@components/BaseIcon';
import { Button } from '@components/ui/button';
import { useToast } from '@components/ui/use-toast';
import { clearCart, resetPayment } from '@features/pos/cart';
import { saleApi } from '@features/sales';
import { mdiPrinterPos } from '@mdi/js';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { transformCartData } from '../../utils/transformCartData';

interface ICheckoutCreateFormProps {
  handleModalToggle(open: boolean): void;
}

export const CreateCheckoutForm: React.FC<ICheckoutCreateFormProps> = ({ handleModalToggle }) => {
  const { toast } = useToast();
  const { totalPrice, cartItems } = useAppSelector((state) => state.cart);
  const [createSale, { isLoading }] = saleApi.useCreateSaleMutation();

  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const handleSuccess = () => {
      toast({
        title: 'Success!',
        variant: 'success',
        description: 'Transaction is successfully created!',
      });

      if (handleModalToggle && !isLoading) {
        handleModalToggle(false);
        dispatch(clearCart());
        dispatch(resetPayment());
      }
    };

    const handleError = (error: Error) => {
      toast({
        title: 'Failed!',
        variant: 'destructive',
        description: 'Transaction Failed, something went wrong.',
      });

      console.error('Request failed:', error.message);
    };

    try {
      const transformedData = transformCartData(cartItems, totalPrice);
      console.log(transformedData);

      await createSale({ payload: transformedData }).unwrap();

      handleSuccess();
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof Error) {
        handleError(error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      <Button type='submit' disabled={isLoading} variant='action'>
        <BaseIcon path={mdiPrinterPos} className='mr-2 h-4 w-4' />
        Confirm
      </Button>
    </form>
  );
};
