import { ICartItem } from '@features/pos/cart';
import { } from '@features/purchases';
import { ISaleDetail, ISaleRecord } from '@features/sales';

export function transformCartData(cartItems: ICartItem[], totalPrice: number): ISaleRecord {
    const transformedData: ISaleRecord = {
        sale: {
            no_receipt: Math.floor(Math.random() * 10000000000).toString(),
            date: new Date().toISOString().split('T')[0],
            note: '',
            total_amount: totalPrice,
        },
        saleDetails: [],
        transaction: {
            type_id: 2,
            date: new Date().toISOString().split('T')[0],
            total_amount: totalPrice,
            transaction_type: 'asset'
        },
        transactionDetails: [
            {
                transaction_amount: totalPrice,
                account_id: 43, // Debit entry (asset) - This account represents cash or similar assets. It increases when a sale is made.
                transaction_type: "debit"
            },
            {
                transaction_amount: totalPrice,
                account_id: 1, // Credit entry (asset) - This account represents inventory or goods for sale. It decreases when items are sold.
                transaction_type: "credit"
            }
        ]
    };

    cartItems.forEach((item) => {
        const transformedItem: ISaleDetail = {
            purchase_detail_id: Number(item.purchaseDetailId),
            sale_quantity: Number(item.quantityToBuy),
            unit_price: Number(item.salePrice),
            total_price: item.quantityToBuy * Number(item.salePrice),
            discount: 0,
        };
        transformedData.saleDetails.push(transformedItem);
    });

    return transformedData;
}
