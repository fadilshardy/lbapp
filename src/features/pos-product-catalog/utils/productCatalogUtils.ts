import { IProductCatalog } from '@features/pos-product-catalog';
import apiClient from '@lib/apiClient';

export const fetchProductCatalogs = async (searchQuery) => {

    const response = await apiClient(`/api/inventory?search=${searchQuery}`);

    const productCatalog: IProductCatalog[] = response.data.map((item) => ({
        name: item.product_name,
        code: item.product_code,
        unit: item.product_unit,
        brand: item.product_brand,
        type: item.product_type,
        purchaseDetailId: item.purchase_detail_id,
        salePrice: item.sale_price,
        QuantityInStock: item.quantity,
        purchaseDate: item.purchase_date,
    }));

    return productCatalog;
};
