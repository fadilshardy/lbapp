import { ICartItem } from '@features/pos/cart';


interface TransformedItem {
    purchase_detail_id: number;
    sale_quantity: number;
    unit_price: number;
    total_price?: number;
    discount?: number;
}


interface TransformedData {
    sale: {
        no_receipt: string;
        date: string;
        note: string;
        balance: number;
        transaction_id: number;
    };
    details: TransformedItem[];
}

export function transformCartData(cartItems: ICartItem[], totalPrice: number): TransformedData {
    const transformedData: TransformedData = {
        sale: {
            no_receipt: Math.floor(Math.random() * 10000000000).toString(),
            date: new Date().toISOString().split('T')[0],
            note: '',
            balance: totalPrice,
            transaction_id: 1,
        },
        details: [],
    };

    cartItems.forEach((item) => {
        const transformedItem: TransformedItem = {
            purchase_detail_id: Number(item.purchaseDetailId),
            sale_quantity: Number(item.quantityToBuy),
            unit_price: Number(item.salePrice),
            total_price: item.quantityToBuy * Number(item.salePrice),
            discount: 0,
        };
        transformedData.details.push(transformedItem);
    });

    return transformedData;
}
