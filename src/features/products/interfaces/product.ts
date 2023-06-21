interface ICategory {
    id: number;
    name: string;
}

export interface IProduct {
    name: string;
    code: string;
    unit: string;
    brand: string;
    type: string;
    category: ICategory;
}
