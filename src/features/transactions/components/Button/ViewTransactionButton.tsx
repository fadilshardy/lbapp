import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { Transaction, transactionApi } from '@features/transactions';

import { useModalToggle } from '@hooks/useModalToggle';
import { mdiDotsHorizontalCircleOutline } from '@mdi/js';
import * as React from 'react';
import ViewTransactionDetail from '../ViewTransactionDetail';

interface IViewTransactionButtonProps {
  currentTransaction: Transaction;
}

export const ViewTransactionButton: React.FC<IViewTransactionButtonProps> = ({
  currentTransaction,
}) => {
  const ViewButton = (
    <Button
      size='sm'
      variant='ghost'
      className=' text-gray-700 hover:bg-gray-50 hover:text-gray-400  focus:relative '
    >
      <BaseIcon path={mdiDotsHorizontalCircleOutline} className='h-6 w-6' />
    </Button>
  );

  const { isOpen, handleModalToggle } = useModalToggle(false);

  const { data, isLoading } = transactionApi.useGetTransactionQuery(
    { itemId: currentTransaction.code },
    { skip: !isOpen }
  );

  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title='View Transaction Detail'
      modalToggleBtn={ViewButton}
      className='max-w-3xl'
    >
      <ViewTransactionDetail
        transactionRecord={data}
        isLoading={isLoading}
        handleModalToggle={handleModalToggle}
      />
    </ModalForm>
  );
};
