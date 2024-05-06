import { ISaleRecord, Sale, SaleRecord } from '@features/sales';
import { PaginationResponse } from '@interfaces';
import * as reduxQuery from '@lib/reduxQuery';
import { appApi } from '@stores/appApi';

const BASE_SALE_URL = `/api/sale`;

export const saleApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getSales: builder.query<PaginationResponse<Sale>, any>(reduxQuery.generateGetAllEndpoint({
            baseUrl: BASE_SALE_URL,
            tagType: 'sales',
            itemId: 'no_reciept',
        })),
        getSale: builder.query<SaleRecord, any>(reduxQuery.generateGetEndpoint({
            baseUrl: BASE_SALE_URL,
            tagType: 'sales',
            itemId: 'no_reciept',
        })),
        createSale: builder.mutation<ISaleRecord, any>({
            ...reduxQuery.generateCreateEndpoint({
                baseUrl: BASE_SALE_URL,
            }),
            invalidatesTags: ['sales', 'productCatalogs', 'accounts', 'transactions']
        }),
    })
});