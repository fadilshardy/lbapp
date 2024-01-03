import * as z from "zod";

export const DetailSchema: z.Schema<IDetail> = z.object({
    product_name: z.string(),
    purchase_detail_id: z.number().nonnegative(),
    sale_quantity: z.number().nonnegative(),
    unit_price: z.number().nonnegative(),
    total_price: z.number().nonnegative(),
    discount: z.number().nonnegative()
});

export const SaleSchema: z.Schema<ISale> = z.object({
    no_receipt: z.string().nonempty().max(255),
    date: z.string().nonempty().max(255),
    note: z.string().nonempty().max(255),
    balance: z.number().nonnegative(),
    transaction_id: z.number().nonnegative()
});

export const SaleRecordSchema: z.Schema<ISaleRecord> = z.object({
    sale: SaleSchema,
    details: z.array(DetailSchema)
});

export type Sale = z.infer<typeof SaleSchema>;
export type Detail = z.infer<typeof DetailSchema>;
export type SaleRecord = z.infer<typeof SaleRecordSchema>;