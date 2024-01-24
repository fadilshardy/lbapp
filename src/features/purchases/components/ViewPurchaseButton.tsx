import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { Purchase, purchaseApi } from '@features/purchases';

import { useModalToggle } from '@hooks/useModalToggle';
import { mdiDotsHorizontalCircleOutline } from '@mdi/js';
import * as React from 'react';
import ViewPurchaseDetail from './ViewPurchaseDetail';

interface ICreateProductButtonProps {
  currentPurchase: Purchase;
}

const ViewButton = (
  <Button
    size='sm'
    variant='ghost'
    className=' text-gray-700 hover:bg-gray-50 hover:text-gray-400  focus:relative '
  >
    <BaseIcon path={mdiDotsHorizontalCircleOutline} className='h-6 w-6' />
  </Button>
);

export const ViewPurchaseButton: React.FC<ICreateProductButtonProps> = ({ currentPurchase }) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);

  const { data, isLoading, isError, isFetching } = purchaseApi.useGetPurchaseQuery(
    { itemId: currentPurchase.no_receipt },
    { skip: !isOpen }
  );

  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title='View Purchase Detail'
      modalToggleBtn={ViewButton}
      className='max-w-3xl'
    >
      <ViewPurchaseDetail
        purchaseRecord={data}
        isLoading={isLoading}
        handleModalToggle={handleModalToggle}
      />
    </ModalForm>
  );
};
