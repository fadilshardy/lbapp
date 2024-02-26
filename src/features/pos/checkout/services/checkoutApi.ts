import { ISaleRecord } from '@features/sales';
import * as reduxQuery from '@lib/reduxQuery';
import { appApi } from '@stores/appApi';

const BASE_CHECKOUT_URL = `/api/sale`;

export const checkoutApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        createCheckout: builder.mutation<ISaleRecord, any>({
            ...reduxQuery.generateCreateEndpoint({
                baseUrl: BASE_CHECKOUT_URL,
            }),
            invalidatesTags: ['sales', 'productCatalogs']
        }),
    })
});