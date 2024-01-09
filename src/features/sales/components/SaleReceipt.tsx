import { SaleRecord } from '@features/sales';
import { formatCurrency } from '@lib/format';
import * as React from 'react';

interface ISaleReceiptProps {
    handleModalToggle(open: boolean): void;
    saleRecord?: SaleRecord
    isLoading: boolean;
}

const SaleReceipt: React.FunctionComponent<ISaleReceiptProps> = ({
    saleRecord,
    isLoading
}) => {

    if (isLoading) {
        return <div className='h-full w-full flex justify-center p-16'>
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>
    }

    return (
        <div className="text-sm border border-dotted rounded">
            <div className="rounded-lg shadow-sm p-8 text-xs mt-4 mx-4 sm:mx-0">
                <div>
                    <div className="flex items-center justify-between  gap-4">
                        <div className="flex items-center  flex-col h-24">
                            <img className="h-full " src="/lbapp/logo.png" alt="Logo" />
                        </div>
                        <div className="text-gray-700 w-44 text-end">
                            <div className="font-bold text-xl mb-2">Receipt</div>
                            <div className="font-bold text-xl mb-2">#{saleRecord?.sale.no_receipt}</div>
                            <div className="text-sm text-gray-600">
                                Date: {saleRecord ? new Date(saleRecord.sale.date).toLocaleDateString('id-ID') : 'N/A'}
                            </div>
                            <p>Cikalongwetan, West Bandung Regency, West Java Province, Indonesia</p>
                            <p />
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-xs">
                    <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700 border-dashed">
                        <div className="hidden sm:grid sm:grid-cols-5">
                            <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                                Item
                            </div>
                            <div className="text-left text-xs font-medium text-gray-500 uppercase">Price</div>
                            <div className="text-left text-xs font-medium text-gray-500 uppercase">Qty</div>
                            <div className="text-right text-xs font-medium text-gray-500 uppercase">Amount</div>
                        </div>
                        <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700" />
                        {saleRecord?.details.map((item, id) => {
                            return (
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2" key={id}>
                                    <div className="col-span-full sm:col-span-2">
                                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                            Item
                                        </h5>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{item.product_name}</p>
                                    </div>
                                    <div>
                                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                            Price
                                        </h5>
                                        <p className="text-gray-800 dark:text-gray-200">
                                            {formatCurrency(item.unit_price)}
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                                        <p className="text-gray-800 dark:text-gray-200">{item.sale_quantity}</p>
                                    </div>
                                    <div>
                                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                            Total
                                        </h5>
                                        <p className="sm:text-right text-gray-800 dark:text-gray-200 font-medium">
                                            {formatCurrency(item.total_price)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        <hr className="border-dotted" />
                        <div className="mt-8 flex sm:justify-end">
                            <div className="w-full max-w-lg sm:text-right space-y-2">
                                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                                    <dl className="grid sm:grid-cols-5 gap-x-3">
                                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                            Total :
                                        </dt>
                                        <dd className="col-span-2 text-gray-500">{formatCurrency(saleRecord?.sale.balance)}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex">
                    <span className="mt-5 text-sm text-gray-500">© 2023 Lbapp</span>
                </div>
            </div>

        </div>
    );
};

export default SaleReceipt;
