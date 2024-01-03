import BaseIcon from '@components/BaseIcon';
import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { Sale, saleApi } from '@features/sales';
import { useModalToggle } from '@hooks/useModalToggle';
import { mdiDotsHorizontalCircleOutline } from '@mdi/js';
import * as React from 'react';
import SaleReceipt from '../SaleReceipt';

interface ICreateProductButtonProps {
    currentSale: Sale;
}

const ViewButton = (
    <Button
        size="sm"
        variant="ghost"
        className=" text-gray-700 hover:bg-gray-50 hover:text-gray-400  focus:relative "
    >
        <BaseIcon path={mdiDotsHorizontalCircleOutline} className="h-6 w-6" />
    </Button>
);

export const ViewSaleButton: React.FC<ICreateProductButtonProps> = ({ currentSale }) => {

    const { isOpen, handleModalToggle } = useModalToggle(false);

    const { data, isLoading, isError, isFetching } = saleApi.useGetSaleQuery(
        { itemId: currentSale.no_receipt },
        { skip: !isOpen });

    return (
        <ModalForm
            isOpen={isOpen}
            handleModalToggle={handleModalToggle}
            title="View Sale Detail"
            modalToggleBtn={ViewButton}
        >
            <SaleReceipt handleModalToggle={handleModalToggle} saleRecord={data} isLoading={isLoading} />
        </ModalForm>
    );
};
