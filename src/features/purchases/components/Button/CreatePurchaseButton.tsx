import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiPlusBox } from '@mdi/js';
import { CreatePurchaseForm } from '../Form/CreatePurchaseForm';

interface ICreatePurchaseButtonProps {
  customButton?: JSX.Element;
}

const DefaultButton = (
  <Button size="default">
    <BaseIcon path={mdiPlusBox} className="w-4 h-4 flex mr-2" />
    Purchase
  </Button>
);

export const CreatePurchaseButton: React.FC<ICreatePurchaseButtonProps> = ({ customButton }) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);

  const ModalButton = customButton || DefaultButton;

  return (
    <ModalForm
      className='max-w-3xl'
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title="Create new Purchase"
      modalToggleBtn={ModalButton}
    >
      <CreatePurchaseForm handleModalToggle={handleModalToggle} />
    </ModalForm>
  );
};
