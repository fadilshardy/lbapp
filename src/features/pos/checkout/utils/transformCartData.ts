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
        total_amount: number;
        transaction_id: number;
    };
    saleDetails: TransformedItem[];
}

export function transformCartData(cartItems: ICartItem[], totalPrice: number): TransformedData {
    const transformedData: TransformedData = {
        sale: {
            no_receipt: Math.floor(Math.random() * 10000000000).toString(),
            date: new Date().toISOString().split('T')[0],
            note: '',
            total_amount: totalPrice,
            transaction_id: 1,
        },
        saleDetails: [],
    };

    cartItems.forEach((item) => {
        const transformedItem: TransformedItem = {
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
