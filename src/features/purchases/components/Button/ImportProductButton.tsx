import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiFileUploadOutline } from '@mdi/js';
import * as React from 'react';
import { ImportProductForm } from '../Form/ImportProductForm';
interface IUpdatePurchaseButtonProps {
  customButton?: JSX.Element;
}

const DefaultButton = (
  <Button variant="outline">
    <BaseIcon path={mdiFileUploadOutline} className="mr-2 h-4 w-4" />
    Import
  </Button>
);

export const ImportPurchaseButton: React.FC<IUpdatePurchaseButtonProps> = ({ customButton }) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);

  const ModalButton = customButton || DefaultButton;

  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title="Import Purchase"
      modalToggleBtn={ModalButton}
    >
      <ImportProductForm handleModalToggle={handleModalToggle} />
    </ModalForm>
  );
};
