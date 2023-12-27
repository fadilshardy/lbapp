import { Product } from '@features/products';
import { PaginationResponse } from '@interfaces';
import { generateGetAllEndpoint, generateGetEndpoint } from '@lib/reduxQuery';
import { appApi } from '@stores/appApi';

const BASE_PRODUCT_URL = `/api/product`;


export const productApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getCors: builder.query({
            query: () => {
                return {
                    url: `/sanctum/csrf-cookie`,
                    method: 'GET',
                };
            },
        }),
        getProducts: builder.query<PaginationResponse<Product>, any>(generateGetAllEndpoint({
            baseUrl: BASE_PRODUCT_URL,
            tagType: 'products',
            itemId: 'code',
        })),
        getProduct: builder.query<Product, any>(generateGetEndpoint({
            baseUrl: BASE_PRODUCT_URL,
            tagType: 'products',
            itemId: 'code',
        })),
        createProduct: builder.mutation<any, any>({
            query: ({ payload }) => {
                return ({
                    url: BASE_PRODUCT_URL,
                    method: 'POST',
                    data: payload,
                })
            },
            transformResponse: (response: { data: any }, meta, arg) => response.data,
            transformErrorResponse: (
                response: { data: { errors: {} } },
                meta, arg
            ) => response.data,
            invalidatesTags: ['products'],
        }),
        updateProduct: builder.mutation<any, any>({
            query: ({ payload, productKey }) => {
                return ({
                    url: `${BASE_PRODUCT_URL}/${productKey}`,
                    method: 'PUT',
                    data: payload,
                })
            },
            transformResponse: (response: { data: any }, meta, arg) => response.data,
            transformErrorResponse: (
                response: { data: { errors: {} } },
            ) => response.data,
            invalidatesTags: ['products'],
        }),
        deleteProduct: builder.mutation<any, any>({
            query: ({ payload, productKey }) => {
                return ({
                    url: `${BASE_PRODUCT_URL}/${productKey}`,
                    method: 'DELETE',
                })
            },
            transformResponse: (response: { data: any }, meta, arg) => response.data,
            transformErrorResponse: (
                response: { data: { errors: {} } },
            ) => response.data,
            invalidatesTags: ['products'],
        }),
        importProducts: builder.mutation<any, any>({
            query: ({ payload }) => {
                return ({
                    url: `${BASE_PRODUCT_URL}/import`,
                    method: 'POST',
                    data: payload,
                })
            },

            transformResponse: (response: { data: any }, meta, arg) => response,
            transformErrorResponse: (
                response: { data: { errors: {} } },
            ) => response.data,
            invalidatesTags: ['products'],
        }),
    })
});


