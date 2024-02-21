interface IDetail {
    product_name: string;
    purchase_detail_id: number;
    sale_quantity: number;
    unit_price: number;
    total_price: number;
    discount: number;
}

interface ISale {
    no_receipt: string;
    date: string;
    note: string;
    total_amount: number;
    transaction_id: number;
}

interface ISaleRecord {
    sale: ISale;
    details: IDetail[];
}