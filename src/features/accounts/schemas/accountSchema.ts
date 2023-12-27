
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
    parentId: z.string().max(255).optional(),
    isParent: z.boolean().optional(),
}).superRefine((data, ctx) => {
    if (data.isParent && !data.code) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["code"],
            message: "The account code is required.",
        });
    }
    if (!data.isParent && !data.parentId) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["parentId"],
            message: "The parent account is required.",
        });
    }
});




export type Account = z.infer<typeof AccountSchema>;