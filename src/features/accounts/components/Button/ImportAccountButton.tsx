import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { ImportAccountForm } from '@features/accounts';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiFileUploadOutline } from '@mdi/js';
import * as React from 'react';
interface IImportAccountButtonProps {
  customButton?: JSX.Element;
}

export const ImportProductButton: React.FC<IImportAccountButtonProps> = ({ customButton }) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);
  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title='Import account'
      modalToggleBtn={
        customButton || (
          <Button variant='outline'>
            <BaseIcon path={mdiFileUploadOutline} className='mr-2 h-4 w-4' />
            Import
          </Button>
        )
      }
    >
      <ImportAccountForm handleModalToggle={handleModalToggle} />
    </ModalForm>
  );
};
