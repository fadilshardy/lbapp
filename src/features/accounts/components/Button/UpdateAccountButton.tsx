import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { Account, UpdateAccountForm } from '@features/accounts';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiSquareEditOutline } from '@mdi/js';
import * as React from 'react';

interface IUpdateAccountButtonProps {
  customButton?: JSX.Element;
  currentAccount: Account;
}

export const UpdateAccountButton: React.FC<IUpdateAccountButtonProps> = ({
  customButton,
  currentAccount,
}) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);

  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title='Update product'
      modalToggleBtn={
        customButton || (
          <Button
            className='border-e text-gray-700 hover:bg-gray-50 focus:relative'
            title='Edit Product'
            variant='ghost'
          >
            <BaseIcon path={mdiSquareEditOutline} className='h-4 w-4' />
          </Button>
        )
      }
    >
      <UpdateAccountForm handleModalToggle={handleModalToggle} currentAccount={currentAccount} />
    </ModalForm>
  );
};
