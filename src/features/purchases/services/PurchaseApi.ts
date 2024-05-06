import { Purchase, PurchaseRecord } from '@features/purchases';
import { PaginationResponse } from '@interfaces';
import * as reduxQuery from '@lib/reduxQuery';
import { appApi } from '@stores/appApi';

const BASE_PURCHASE_URL = `/api/purchase`;


export const purchaseApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getPurchases: builder.query<PaginationResponse<Purchase>, any>(reduxQuery.generateGetAllEndpoint({
            baseUrl: BASE_PURCHASE_URL,
            tagType: 'purchases',
            itemId: 'no_reciept',
        })),
        getPurchase: builder.query<PurchaseRecord, any>(reduxQuery.generateGetEndpoint({
            baseUrl: BASE_PURCHASE_URL,
            tagType: 'purchases',
            itemId: 'code',
        })),
        createPurchase: builder.mutation<Purchase, any>({
            ...reduxQuery.generateCreateEndpoint({
                baseUrl: BASE_PURCHASE_URL,
            }),
            invalidatesTags: ['purchases', 'accounts', 'transactions']
        }),
        updatePurchase: builder.mutation<Purchase, any>({
            ...reduxQuery.generateUpdateEndpoint({
                baseUrl: BASE_PURCHASE_URL,
            }),
            invalidatesTags: ['purchases']
        }),
        deletePurchase: builder.mutation<Purchase, any>({
            ...reduxQuery.generateDeleteEndpoint({
                baseUrl: BASE_PURCHASE_URL,
            }),
            invalidatesTags: ['purchases']
        }),
    })
});


