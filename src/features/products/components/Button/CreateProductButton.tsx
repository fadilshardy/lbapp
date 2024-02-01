import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiPlusBox } from '@mdi/js';
import * as React from 'react';
import { CreateProductForm } from '../Form/CreateProductForm';

interface ICreateProductButtonProps {
  customButton?: JSX.Element;
}

export const CreateProductButton: React.FC<ICreateProductButtonProps> = ({ customButton }) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);

  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title='Create new product'
      modalToggleBtn={
        customButton || (
          <Button size='default'>
            <BaseIcon path={mdiPlusBox} className='w-4 h-4 flex mr-2' />
            Product
          </Button>
        )
      }
    >
      <CreateProductForm handleModalToggle={handleModalToggle} />
    </ModalForm>
  );
};
