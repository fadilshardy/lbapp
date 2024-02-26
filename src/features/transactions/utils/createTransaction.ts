import { ITransactionDetail } from "@features/transactions";


export function createTransactionDetails({ account_id, transaction_type, transaction_amount }: ITransactionDetail) {
    return {
        account_id: account_id,
        transaction_amount: transaction_amount,
        transaction_type: transaction_type,
    };
}