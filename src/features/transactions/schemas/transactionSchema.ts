import { ITransaction, ITransactionDetail, ITransactionRecord } from "@features/transactions";
import * as z from "zod";


export const TransactionSchema: z.Schema<ITransaction> = z.object({
    type_id: z.number(),
    reference_id: z.number(),
    date: z.string(),
    note: z.string().optional(),
    total_amount: z.coerce.number()
});

export const TransactionDetailSchema: z.Schema<ITransactionDetail> = z.object({
    account_id: z.coerce.number(),
    balance: z.coerce.number(),
    transaction_amount: z.coerce.number(),
    transaction_type: z.string(),
});

export const TransactionRecordSchema: z.Schema<ITransactionRecord> = z.object({
    transaction: TransactionSchema,
    transactionDetails: z.array(TransactionDetailSchema),
});




export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionDetail = z.infer<typeof TransactionDetailSchema>;
export type TransactionRecord = z.infer<typeof TransactionRecordSchema>;
