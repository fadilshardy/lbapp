import { AlertDialogCancel, AlertDialogDescription } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { useToast } from '@components/ui/use-toast';
import { Product } from '../../schemas/productSchema';
import { productApi } from '../../services/PurchaseApi';

interface IDeleteProductFormProps {
  handleModalToggle(open: boolean): void;
  currentProduct: Product;
}

export const DeleteProductForm: React.FC<IDeleteProductFormProps> = ({
  handleModalToggle,
  currentProduct,
}) => {
  const { toast } = useToast();

  const [deleteProduct, { isLoading: isProductLoading }] = productApi.useDeleteProductMutation();

  const cors = productApi.useGetCorsQuery({});

  async function handleDelete() {
    try {
      await deleteProduct({ productKey: currentProduct.code }).unwrap();
      toast({
        title: 'Success!',
        variant: 'success',
        description: `${currentProduct.name} is succesfully deleted!`,
      });
      handleModalToggle(false);
    } catch (error) {
      toast({
        title: 'Failed!',
        variant: 'destructive',
        description: `something wrong happened!`,
      });
      handleModalToggle(false);
    }
  }

  return (
    <>
      <AlertDialogDescription className="py-4">
        This action cannot be undone. This will permanently delete{' '}
        <span className="font-medium">{currentProduct.name}</span> and remove all data from our
        servers.
      </AlertDialogDescription>
      <div className="border-t flex justify-between w-full items-center pt-4">
        <AlertDialogCancel>Cancel</AlertDialogCancel>

        <Button onClick={handleDelete} disabled={isProductLoading} variant="destructive">
          Delete
        </Button>
      </div>
    </>
  );
};
