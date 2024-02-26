export interface ITransaction {
    id?: number;
    type_id?: number;
    reference_id?: number;
    date?: string;
    description?: string;
    total_amount?: number;
}

export interface ITransactionDetail {
    id?: number;
    account_name?: string;
    transaction_id?: number;
    account_id?: number;
    transaction_amount: number;
    transaction_type: string;
    balance?: number;
}