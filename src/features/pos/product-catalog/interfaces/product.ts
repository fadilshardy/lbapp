import { IProduct } from "@features/products";

export interface IProductCatalog extends IProduct {
    purchaseDetailId: number;
    salePrice: number;
    QuantityInStock: number;
    purchaseDate: string;
}



