import { IVendor } from "@features/vendors";

interface ICategory {
    id: string;
    name: string;
}



export interface IProduct {
    name: string;
    code?: string;
    unit: string;
    brand: string;
    type: string;
    category_id: string;
    vendor_id: string;
    category?: ICategory;
    vendor?: IVendor;
}
