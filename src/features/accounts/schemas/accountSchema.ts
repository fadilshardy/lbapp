
import * as z from "zod";
import { IAccount } from "../interfaces/account";


export const AccountSchema: z.Schema<IAccount> = z.object({
    name: z.string({
    }).nonempty().max(255),
    code: z
        .string()
        .max(255)
        .optional(),
    isActive: z.boolean().optional(),
    type: z.string().nonempty().max(255),
    balance: z.number().max(255).optional(),
    openingBalance: z.number().max(255).optional(),
    closingBalance: z.number().max(255).optional(),
    description: z.string().nonempty().max(255).optional(),
    parent_id: z.string().max(255).optional(),
    is_parent: z.boolean(),
}).superRefine((data, ctx) => {
    if (data.is_parent && !data.code) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["code"],
            message: "The account code is required.",
        });
    }
    if (!data.is_parent && !data.parent_id) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["parent_id"],
            message: "The parent account is required.",
        });
    }
});




export type Account = z.infer<typeof AccountSchema>;