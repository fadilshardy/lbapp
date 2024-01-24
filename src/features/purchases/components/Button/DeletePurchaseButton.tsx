import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiTrashCanOutline } from '@mdi/js';
import * as React from 'react';
import { Product } from '../../schemas/productSchema';
import { DeleteProductForm } from '../Form/DeleteProductForm';

interface IDeletePurchaseButtonProps {
  customButton?: JSX.Element;
  currentProduct: Product;
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

export const DeletePurchaseButton: React.FC<IDeletePurchaseButtonProps> = ({
  customButton,
  currentProduct,
}) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);

  const ModalButton = customButton || DefaultButton;

  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title={`Delete ${currentProduct.name}?`}
      modalToggleBtn={ModalButton}
    >
      <DeleteProductForm handleModalToggle={handleModalToggle} currentProduct={currentProduct} />
    </ModalForm>
  );
};
