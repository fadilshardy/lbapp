import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { UpdateAccountForm } from '@features/accounts';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiSquareEditOutline } from '@mdi/js';
import * as React from 'react';
import { Product } from '../../schemas/accountSchema';

interface IUpdateProductButtonProps {
  customButton?: JSX.Element;
  currentProduct: Product;
}

const DefaultButton = (
  <Button
    className="border-e text-gray-700 hover:bg-gray-50 focus:relative"
    title="Edit Product"
    variant="ghost"
  >
    <BaseIcon path={mdiSquareEditOutline} className="h-4 w-4" />
  </Button>
);

export const UpdateProductButton: React.FC<IUpdateProductButtonProps> = ({
  customButton,
  currentProduct,
}) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);

  const ModalButton = customButton || DefaultButton;

  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title="Update product"
      modalToggleBtn={ModalButton}
    >
      <UpdateAccountForm handleModalToggle={handleModalToggle} currentProduct={currentProduct} />
    </ModalForm>
  );
};
