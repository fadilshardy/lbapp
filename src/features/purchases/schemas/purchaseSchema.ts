import * as z from "zod";

// export const PurchaseDetailSchema: z.Schema<IPurchaseDetail> = z.object({
//     purchase_id: z.number(),
//     product_name: z.string(),
//     product_id: z.string(),
//     discount: z.number(),
//     net_price: z.coerce.number(),
//     vendor_id: z.number(),
//     initial_quantity: z.number(),
//     quantity: z.coerce.number(),
//     sale_price: z.coerce.number(),
//     profit: z.number(),
//     due_date: z.string(),
// });

export const PurchaseDetailSchema: z.Schema<IPurchaseDetail> = z.object({
    product_id: z.string(),
    net_price: z.coerce.number(),
    quantity: z.coerce.number(),
    sale_price: z.coerce.number(),
});

export const PurchaseSchema: z.Schema<IPurchase> = z.object({
    date: z.string(),
    note: z.string().optional(),
});

export const PurchaseRecordSchema: z.Schema<IPurchaseRecord> = z.object({
    purchase: PurchaseSchema,
    details: z.array(PurchaseDetailSchema),
});


export type Purchase = z.infer<typeof PurchaseSchema>;
export type PurchaseDetail = z.infer<typeof PurchaseDetailSchema>;
export type PurchaseRecord = z.infer<typeof PurchaseRecordSchema>;