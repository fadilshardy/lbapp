import ModalForm from '@components/ModalForm';
import { Button } from '@components/ui/button';
import { CreateCheckoutForm } from '@features/pos/checkout/Components/Form/CreateCheckoutForm';
import { formatCurrency } from '@lib/format';
import { useAppSelector } from '@stores/hooks';
import * as React from 'react';

interface IConfirmationReceiptProps {
  isOpen: boolean;
  handleModalToggle(open: boolean): void;
  submitable: boolean;
}

const ConfirmationReceipt: React.FunctionComponent<IConfirmationReceiptProps> = ({
  isOpen,
  handleModalToggle,
  submitable,
}) => {
  const { totalPrice, cartItems } = useAppSelector((state) => state.cart);
  const { cash, change } = useAppSelector((state) => state.payment);
  return (
    <ModalForm
      isOpen={isOpen}
      handleModalToggle={handleModalToggle}
      title="Order Confirmation"
      modalToggleBtn={
        <Button className="bg-blue-600  rounded-full uppercase" size="lg" disabled={!submitable}>
          Process
        </Button>
      }
    >
      <div className="text-sm border border-dotted rounded">
        <div className="rounded-lg shadow-sm p-8 text-xs mt-4 mx-4 sm:mx-0">
          <div>
            <div className="flex items-center justify-between  gap-4">
              <div className="flex items-center  flex-col h-24">
                <img className="h-full " src="/lbapp/logo.png" alt="Logo" />
              </div>
              <div className="text-gray-700 w-44 text-end">
                <div className="font-bold text-xl mb-2">Receipt</div>
                <div className="text-sm text-gray-600">
                  Date: {new Date().toLocaleDateString('id-ID')}
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
              {cartItems.map((item) => {
                return (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2" key={item.purchaseDetailId}>
                    <div className="col-span-full sm:col-span-2">
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Item
                      </h5>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Price
                      </h5>
                      <p className="text-gray-800 dark:text-gray-200">
                        {formatCurrency(item.salePrice)}
                      </p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                      <p className="text-gray-800 dark:text-gray-200">{item.quantityToBuy}</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Total
                      </h5>
                      <p className="sm:text-right text-gray-800 dark:text-gray-200 font-medium">
                        {formatCurrency(item.salePrice * item.quantityToBuy)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <hr className="border-dotted" />
              <div className="mt-8 flex sm:justify-end">
                <div className="w-full max-w-lg sm:text-right space-y-2">
                  {/* Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Total :
                      </dt>
                      <dd className="col-span-2 text-gray-500">{formatCurrency(totalPrice)}</dd>
                    </dl>

                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Cash :
                      </dt>
                      <dd className="col-span-2 text-gray-500">{formatCurrency(cash)}</dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Change :
                      </dt>
                      <dd className="col-span-2 text-gray-500">{formatCurrency(change)}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-4">
            <CreateCheckoutForm handleModalToggle={handleModalToggle} />
          </div>
          <div className="flex">
            <span className="mt-5 text-sm text-gray-500">© 2023 Lbapp</span>
          </div>
        </div>
        {/* End Card */}
      </div>
    </ModalForm>
  );
};

export default ConfirmationReceipt;
