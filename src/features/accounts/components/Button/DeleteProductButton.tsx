import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { Account } from '@features/accounts';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiTrashCanOutline } from '@mdi/js';
import * as React from 'react';
import { DeleteProductForm } from '../Form/DeleteProductForm';

interface IDeleteProductButtonProps {
  customButton?: JSX.Element;
  currentAccount: Account;
}

const DefaultButton = (
  <Button
    size="sm"
    variant="ghost"
    className="border-e text-gray-700 hover:bg-gray-50 focus:relative"
  >
    <BaseIcon path={mdiTrashCanOutline} className="h-4 w-4" />
  </Button>
);

export const DeleteProductButton: React.FC<IDeleteProductButtonProps> = ({
  customButton,
  currentAccount,
}) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);

  const ModalButton = customButton || DefaultButton;

  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title={`Delete ${currentAccount.name}?`}
      modalToggleBtn={ModalButton}
    >
      <DeleteProductForm handleModalToggle={handleModalToggle} selectedItem={currentAccount} />
    </ModalForm>
  );
};
