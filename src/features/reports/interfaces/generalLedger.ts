import { IAccount } from "@features/accounts";
import { ITransaction, ITransactionDetail } from "@features/transactions";


export interface IGeneralLedger {
    account: IAccount;
    transactions: ITransaction[];
    transactionDetails: ITransactionDetail[];
}