import * as z from "zod";
import { TransactionDetailSchema, TransactionSchema } from "./transactionSchema";

export const PurchaseDetailSchema: z.Schema<IPurchaseDetail> = z.object({
    product_id: z.string(),
    net_price: z.coerce.number(),
    quantity: z.coerce.number(),
    sale_price: z.coerce.number(),
    purchase_amount: z.coerce.number()
});

export const PurchaseSchema: z.Schema<IPurchase> = z.object({
    date: z.string(),
    note: z.string().optional(),
    total_amount: z.coerce.number(),
});

export const PurchaseRecordSchema: z.Schema<IPurchaseRecord> = z.object({
    purchase: PurchaseSchema,
    purchaseDetails: z.array(PurchaseDetailSchema),
    transaction: TransactionSchema,
    transactionDetails: z.array(TransactionDetailSchema),
})
    .superRefine((data, ctx) => {
        if (data.purchase.total_amount !== data.transaction.total_amount) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["purchase.total_amount"],
                message: "must be balanced.",
            });

            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["transaction.total_amount"],
                message: "must be balanced.",
            });
            data.transactionDetails.forEach(({ transaction_amount, balance }, index) => {
                if (transaction_amount >= balance) {
                    ctx.addIssue({
                        type: "number",
                        code: z.ZodIssueCode.too_big,
                        maximum: balance,
                        inclusive: true,
                        message: 'exceeded balance',
                        path: ["transactionDetails", index, "transaction_amount"],
                    });
                }
            })
            data.purchaseDetails.forEach(({ net_price, sale_price }, index) => {
                if (net_price >= sale_price) {
                    ctx.addIssue({
                        type: "number",
                        code: z.ZodIssueCode.too_small,
                        minimum: net_price,
                        inclusive: true,
                        message: 'Lower than net price',
                        path: ["purchaseDetails", index, "sale_price"],
                    });
                }
            })
        }
    });


export type Purchase = z.infer<typeof PurchaseSchema>;
export type PurchaseDetail = z.infer<typeof PurchaseDetailSchema>;
export type PurchaseRecord = z.infer<typeof PurchaseRecordSchema>;