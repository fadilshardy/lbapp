import { AlertDialogCancel, AlertDialogDescription } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { useToast } from '@components/ui/use-toast';
import { Account, accountApi } from '@features/accounts';
interface IDeleteProductFormProps {
  handleModalToggle(open: boolean): void;
  selectedItem: Account;
}

export const DeleteProductForm: React.FC<IDeleteProductFormProps> = ({
  handleModalToggle,
  selectedItem,
}) => {
  const { toast } = useToast();

  const [deleteProduct, { isLoading }] = accountApi.useDeleteAccountMutation();

  async function handleDelete() {
    try {
      await deleteProduct({ productKey: selectedItem.code }).unwrap();
      toast({
        title: 'Success!',
        variant: 'success',
        description: `${selectedItem.name} is succesfully deleted!`,
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
        <span className="font-medium">{selectedItem.name}</span> and remove all data from our
        servers.
      </AlertDialogDescription>
      <div className="border-t flex justify-between w-full items-center pt-4">
        <AlertDialogCancel>Cancel</AlertDialogCancel>

        <Button onClick={handleDelete} disabled={isLoading} variant="destructive">
          Delete
        </Button>
      </div>
    </>
  );
};
