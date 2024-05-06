import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';

import { Account } from '@features/accounts';
import { ViewLedgerDetail, reportApi } from '@features/reports';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiNewspaperVariantMultiple } from '@mdi/js';

interface IViewLedgerButtonProps {
  currentAccount: Account;
}

export const ViewLedgerButton: React.FC<IViewLedgerButtonProps> = ({ currentAccount }) => {
  const { isOpen, handleModalToggle } = useModalToggle(false);
  const { data, isFetching } = reportApi.useGetLedgerQuery(
    { itemId: currentAccount.code },
    { skip: !isOpen }
  );

  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title='View Transaction Detail'
      modalToggleBtn={
        <Button
          size='sm'
          variant='ghost'
          className=' text-gray-700 hover:bg-gray-50 hover:text-gray-400  focus:relative '
        >
          <BaseIcon path={mdiNewspaperVariantMultiple} className='h-5 w-5' />
        </Button>
      }
      className='max-w-3xl'
    >
      <ViewLedgerDetail ledgerRecord={data} isLoading={isFetching} />
    </ModalForm>
  );
};
