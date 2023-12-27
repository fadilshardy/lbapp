import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { CreateAccountForm } from '@features/accounts';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiPlusBox } from '@mdi/js';
import * as React from 'react';

interface ICreateAccountButtonProps {
  customButton?: JSX.Element;
}

const DefaultButton = (
  <Button size="default">
    <BaseIcon path={mdiPlusBox} className="w-4 h-4 flex mr-2" />
    Account
  </Button>
);

export const CreateAccountButton: React.FC<ICreateAccountButtonProps> = ({ customButton }) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);

  const ModalButton = customButton || DefaultButton;

  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title="Create new account"
      modalToggleBtn={ModalButton}
    >
      <CreateAccountForm handleModalToggle={handleModalToggle} />
    </ModalForm>
  );
};
