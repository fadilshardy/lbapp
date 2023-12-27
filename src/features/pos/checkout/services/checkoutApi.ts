import { appApi } from '@stores/appApi';

const BASE_CHECKOUT_URL = `/api/sale`;

export const checkoutApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getCors: builder.query({
            query: () => {
                return {
                    url: `/sanctum/csrf-cookie`,
                    method: 'GET',
                };
            },
        }),
        createCheckout: builder.mutation<any, any>({
            query: ({ payload }) => {
                return ({
                    url: BASE_CHECKOUT_URL,
                    method: 'POST',
                    data: payload,
                })
            },
            transformResponse: (response: { data: any }, meta, arg) => response.data,
            transformErrorResponse: (
                response: { data: { errors: {} } },
                meta, arg
            ) => response.data,
            invalidatesTags: ['sales'],
        }),
    })
});