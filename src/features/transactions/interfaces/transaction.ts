export interface ITransaction {
    id?: number;
    type_id?: number;
    reference_id?: number;
    date?: string;
    note?: string;
    total_amount?: number;
    code?: string;
    is_balanced?: boolean;
    transaction_type: string;
    running_balance?: number;
}

export interface ITransactionDetail {
    id?: number;
    account_name?: string;
    transaction_id?: number;
    account_id?: number;
    account_code?: string;
    transaction_amount: number;
    transaction_type: string;
    balance?: number;
}


export interface ITransactionRecord {
    transaction: ITransaction,
    transactionDetails: ITransactionDetail[]
}