interface IPurchaseDetail {
    purchase_id?: number;
    product_name?: string;
    product_id?: string;
    discount?: number;
    net_price: number;
    vendor_id?: number;
    initial_quantity?: number;
    quantity: number;
    sale_price: number;
    profit?: number;
    due_date?: string;
}

interface IPurchase {
    no_receipt?: string;
    date?: string;
    note?: string;
    balance?: number;
    transaction_id?: number;
}

interface IPurchaseRecord {
    purchase: IPurchase;
    details: IPurchaseDetail[];
}