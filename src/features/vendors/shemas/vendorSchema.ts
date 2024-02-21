
import { IVendor } from "@features/vendors";
import * as z from "zod";

export const VendorSchema: z.Schema<IVendor> = z.object({
    name: z.string().nonempty().max(255),
    code: z.string().nonempty().max(255),
    adress: z.string().nonempty().max(255),
    email: z.string().nonempty().max(255),
    phone: z.string().nonempty().max(255),
});


export type Vendor = z.infer<typeof VendorSchema>;