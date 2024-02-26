import { ITransaction, ITransactionDetail } from "@features/transactions";


export interface ISaleDetail {
    product_name?: string;
    purchase_detail_id: number;
    sale_quantity: number;
    unit_price: number;
    total_price: number;
    discount: number;
}

export interface ISale {
    no_receipt: string;
    date: string;
    note: string;
    total_amount: number;
}

export interface ISaleRecord {
    sale: ISale;
    saleDetails: ISaleDetail[];
    transaction: ITransaction;
    transactionDetails: ITransactionDetail[];
}