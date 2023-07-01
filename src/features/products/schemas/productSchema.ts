
import * as z from "zod";
import { IProduct } from "../interfaces/product";

export const ProductSchema: z.Schema<IProduct> = z.object({
    name: z.string({
    }).nonempty().max(255),
    unit: z.string().nonempty().max(255),
    brand: z.string().nonempty().max(255),
    type: z.string().nonempty().max(255),
    category_id: z.string().nonempty().max(255),
});

export type Product = z.infer<typeof ProductSchema>;