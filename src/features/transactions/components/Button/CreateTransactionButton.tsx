import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { TransactionForm } from '@features/purchases';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiPlusBox } from '@mdi/js';

interface ICreateTransactionButtonProps {
  customButton?: JSX.Element;
}

export const CreateTransactionButton: React.FC<ICreateTransactionButtonProps> = ({
  customButton,
}) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);

  return (
    <ModalForm
      className='max-w-5xl'
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title='Create new Purchase'
      modalToggleBtn={
        customButton || (
          <Button size='default'>
            <BaseIcon path={mdiPlusBox} className='w-4 h-4 flex mr-2' />
            Transaction
          </Button>
        )
      }
    >
      tes
      <TransactionForm/>
      {/* <CreatePurchaseForm handleModalToggle={handleModalToggle} /> */}
    </ModalForm>
  );
};
