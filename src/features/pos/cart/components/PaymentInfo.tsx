import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { addCash, calculateChange, clearCart, updateCash } from '@features/pos/cart';
import { useModalToggle } from '@hooks/useModalToggle';
import { formatCurrency } from '@lib/utils';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { useEffect, useState } from 'react';
import ConfirmationReceipt from './ConfirmationReciept';

interface IPaymentInfoProps {}

export const PaymentInfo: React.FunctionComponent<IPaymentInfoProps> = (props) => {
  const { cash, change } = useAppSelector((state) => state.payment);
  const { totalPrice, cartItems } = useAppSelector((state) => state.cart);
  const [submitable, setSubmitable] = useState(false);

  const { isOpen, handleModalToggle } = useModalToggle(false);

  const dispatch = useAppDispatch();
  const moneys = [1000, 5000, 10000, 20000, 50000, 100000];

  const handleUpdateCash = (cash: number) => {
    dispatch(updateCash(cash));
  };

  const handleAddCash = (cash: number) => {
    dispatch(addCash(cash));
  };

  const handleClearCash = () => {
    dispatch(updateCash(0));
  };

  const handleClearCart = () => {
    handleClearCash();
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(calculateChange(totalPrice));

    if (totalPrice !== 0) {
      setSubmitable(cash >= totalPrice);
    }
    if (cartItems.length <= 0) {
      setSubmitable(false);
    }
  }, [totalPrice, cash, cartItems]);

  const submit = () => {
    handleModalToggle(!isOpen);
  };

  return (
    <div className="select-none h-auto w-full text-center  mt-8 border-t border-gray-100 pt-8">
      <div className="flex w-full  justify-between items-baseline">
        <span className="text-lg font-semibold leading-none tracking-tight">Cash</span>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="0"
            className="w-28 text-right shadow rounded-lg px-2 focus:outline-none"
            value={cash.toLocaleString()}
            onChange={(e) => handleUpdateCash(Number(e.target.value.replace(/,/g, '')))}
          />
          <Button variant="outline" onClick={() => handleClearCash()} className="text-gray-600">
            x
          </Button>
        </div>
      </div>
      <div className="hidden sm:grid md:grid-cols-3 gap-2 mt-2">
        {moneys.map((money, index) => (
          <Button
            key={index}
            onClick={() => handleAddCash(money)}
            size="sm"
            variant="outline"
            className="text-gray-600"
          >
            {formatCurrency(money)}
          </Button>
        ))}
      </div>
      <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
        <div className="w-screen max-w-lg space-y-4">
          <dl className="space-y-0.5 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatCurrency(totalPrice)}</dd>
            </div>

            <div className="flex justify-between">
              <dt>Discount</dt>
              <dd>{formatCurrency(0)}</dd>
            </div>

            <div className="flex justify-between !text-base font-medium">
              <dt>Total</dt>
              <dd>{formatCurrency(totalPrice)}</dd>
            </div>
            <div className="flex justify-between !text-base font-medium pb-2">
              <dt>Cash</dt>
              <dd>{formatCurrency(cash)}</dd>
            </div>

            <div className="flex justify-between !text-base font-medium  pt-6 border-t border-gray-200">
              <dt>Change</dt>
              <dd className={`text-${change >= 0 ? 'yellow-800' : 'red-600'}`}>
                {formatCurrency(change)}
              </dd>
            </div>
          </dl>

          <div className="flex justify-between">
            <Button
              onClick={handleClearCart}
              size="lg"
              variant="outline"
              className="hover:bg-red-500 hover:text-white rounded-full uppercase"
            >
              clear
            </Button>
            {/* <Button
              disabled={!submitable}
              onClick={submit}
              className="bg-blue-600  rounded-full"
              size="lg"
            >
            </Button> */}
            <ConfirmationReceipt
              isOpen={isOpen}
              handleModalToggle={handleModalToggle}
              submitable={submitable}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
