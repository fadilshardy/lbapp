import { CartItem, removeFromCart, updateCartItemQuantity } from '@features/pos-cart';
import { formatCurrency } from '@lib/utils';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { ShoppingBag, Trash2 } from 'lucide-react';
interface ICartProps {}

export const Cart: React.FunctionComponent<ICartProps> = (props) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const handleRemoveCart = (cartId) => {
    dispatch(removeFromCart(cartId));
  };

  const handleCartQuantityChange = (cartItem: CartItem, newQuantity) => {
    if (cartItem.QuantityInStock >= newQuantity) {
      dispatch(
        updateCartItemQuantity({
          purchase_detail_id: cartItem.purchaseDetailId,
          quantityToBuy: newQuantity,
        })
      );
    } else {
      alert('Quantity not enough');
    }
  };

  return (
    <>
      <section>
        <div className="mx-auto max-w-3xl">
          <div className=" max-h-80 overflow-y-auto aside-scrollbars-light">
            <ul className="space-y-4 px-4">
              {cartItems.map((cartItem) => (
                <li className="flex items-center gap-4" key={cartItem.purchaseDetailId}>
                  <ShoppingBag className="h-9 w-9 rounded object-cover text-gray-600" />
                  <div>
                    <h3 className="text-sm text-gray-900">{cartItem.name}</h3>
                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">price:</dt>
                        <dd className="inline"> {formatCurrency(cartItem.salePrice)}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <label htmlFor={`Line${cartItem.purchaseDetailId}Qty`} className="sr-only">
                        {' '}
                        Quantity{' '}
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={cartItem.quantityToBuy}
                        max={cartItem.QuantityInStock}
                        onChange={(e) => handleCartQuantityChange(cartItem, e.target.value)}
                        id={`Line${cartItem.purchaseDetailId}Qty`}
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </form>
                    <button
                      className="text-gray-600 transition hover:text-red-600"
                      onClick={() => handleRemoveCart(cartItem.purchaseDetailId)}
                    >
                      <span className="sr-only">Remove item</span>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
