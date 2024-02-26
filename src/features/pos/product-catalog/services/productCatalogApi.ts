import { IProductCatalog } from '@features/pos';
import { appApi } from '@stores/appApi';

const BASE_INVENTORY_URL = `/api/inventory?available`;

export const productCatalogsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductCatalogs: builder.query<IProductCatalog[], string>({
            query: (searchQuery) => ({
                url: searchQuery ? `${BASE_INVENTORY_URL}&search=${searchQuery}` : BASE_INVENTORY_URL,
                method: 'GET',
            }),
            transformResponse: (response: any) =>
                response.data.map((item: any) => ({
                    name: item.product_name,
                    code: item.product_code,
                    unit: item.product_unit,
                    brand: item.product_brand,
                    type: item.product_type,
                    purchaseDetailId: item.purchase_detail_id,
                    salePrice: item.sale_price,
                    QuantityInStock: item.quantity,
                    purchaseDate: item.purchase_date,
                })),
            providesTags: (result, error, searchQuery) => {
                // return searchQuery ? [{ type: 'productCatalogs', searchQuery }] : ['productCatalogs']
                return ['productCatalogs']
            }
        }),
    }),
});


