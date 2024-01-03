import { Sale, SaleRecord } from '@features/sales';
import { PaginationResponse } from '@interfaces';
import { generateGetAllEndpoint, generateGetEndpoint } from '@lib/reduxQuery';
import { appApi } from '@stores/appApi';

const BASE_SALE_URL = `/api/sale`;

export const saleApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getSales: builder.query<PaginationResponse<Sale>, any>(generateGetAllEndpoint({
            baseUrl: BASE_SALE_URL,
            tagType: 'sales',
            itemId: 'no_reciept',
        })),
        getSale: builder.query<SaleRecord, any>(generateGetEndpoint({
            baseUrl: BASE_SALE_URL,
            tagType: 'sales',
            itemId: 'no_reciept',
        })),
    })
});