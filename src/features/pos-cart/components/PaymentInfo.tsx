import { addCash, calculateChange, updateCash } from '@features/pos-cart';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { useEffect, useState } from 'react';

interface IPaymentInfoProps {}

export const PaymentInfo: React.FunctionComponent<IPaymentInfoProps> = (props) => {
  const cash = useAppSelector((state) => state.payment.cash);
  const change = useAppSelector((state) => state.payment.change);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [submitable, setSubmitable] = useState(false);

  const dispatch = useAppDispatch();
  const moneys = [1000, 5000, 10000, 20000, 50000, 100000];

  const handleUpdateCash = (cash: number) => {
    dispatch(updateCash(cash));
  };

  const handleAddCash = (cash: number) => {
    dispatch(addCash(cash));
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

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  const priceFormat = (price: number): string => {
    const formattedPrice = formatter.format(price);
    return `${formattedPrice}`;
  };

  const submit = () => {};

  return (
    <div className="select-none h-auto w-full text-center pt-3 pb-4 px-4">
      <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
        <div>TOTAL</div>
        <div className="text-right w-full">{priceFormat(totalPrice)}</div>
      </div>
      <div className="mb-3 text-blue-gray-700 px-3 pt-2 pb-3 rounded-lg bg-blue-gray-50">
        <div className="flex text-lg font-semibold">
          <div className="flex-grow text-left">CASH</div>
          <div className="flex text-right">
            <div className="mr-2">Rp</div>
            <input
              value={cash.toLocaleString()}
              onChange={(e) => handleUpdateCash(Number(e.target.value.replace(/,/g, '')))}
              type="text"
              className="w-28 text-right bg-white shadow rounded-lg focus:bg-white focus:shadow-lg px-2 focus:outline-none"
            />
          </div>
        </div>
        <hr className="my-2" />
        <div className="hidden sm:grid md:grid-cols-3 gap-2 mt-2">
          {moneys.map((money, index) => (
            <button
              key={index}
              onClick={() => handleAddCash(money)}
              className="bg-white rounded-lg shadow hover:shadow-lg focus:outline-none inline-block px-2 py-1 text-sm"
            >
              +{priceFormat(money)}
            </button>
          ))}
        </div>
      </div>
      {change !== 0 && totalPrice !== 0 && cash !== 0 && (
        <div
          className={`flex mb-3 text-lg font-semibold bg-${
            change > 0 ? 'cyan-50' : 'pink-100'
          } text-blue-gray-700 rounded-lg py-2 px-3`}
        >
          <div className={`text-${change > 0 ? 'cyan-800' : 'pink-600'}`}>
            {change > 0 ? 'CHANGE' : `${priceFormat(change)} `}
          </div>
          <div className="text-right flex-grow text-cyan-600">{priceFormat(change)}</div>
        </div>
      )}

      <button
        className={`text-white rounded-2xl text-lg w-full py-3 focus:outline-none ${
          submitable ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-blue-gray-200'
        }`}
        disabled={!submitable}
        onClick={submit}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default PaymentInfo;
