import { IProductCatalog } from "@features/pos/product-catalog";

export interface ICartItem extends IProductCatalog {
    quantityToBuy: number;
}

