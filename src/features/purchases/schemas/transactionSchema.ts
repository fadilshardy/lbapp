import * as z from "zod";


export const TransactionSchema = z.object({
    type_id: z.number(),
    reference_id: z.number(),
    date: z.string(),
    // description: z.string(),
    total_amount: z.coerce.number()
});

export const TransactionDetailSchema = z.object({
    // transaction_id: z.coerce.number(),
    account_id: z.coerce.number(),
    balance: z.coerce.number(),
    transaction_amount: z.coerce.number(),
    transaction_type: z.string(),
});



export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionDetail = z.infer<typeof TransactionDetailSchema>;
