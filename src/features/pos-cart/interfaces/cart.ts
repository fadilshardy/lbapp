import { IProductCatalog } from "@features/pos-product-catalog";

export interface CartItem extends IProductCatalog {
    quantityToBuy: number;
}

