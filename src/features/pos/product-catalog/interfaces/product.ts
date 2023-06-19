export interface IProduct {
    name: string;
    code: string;
    unit: string;
    brand: string;
    type: string;
}

export interface IProductCatalog extends IProduct {
    purchaseDetailId: number;
    salePrice: number;
    QuantityInStock: number;
    purchaseDate: string;
}



