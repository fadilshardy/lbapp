import { Product } from '@features/products';
import { PaginationResponse } from '@interfaces';
import { appApi } from '@stores/appApi';
import { AxiosBaseQueryArgs } from '@stores/axiosBaseQuery';

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
        getProducts: builder.query<PaginationResponse<Product>, any>({
            query: ({ searchQuery = '', page = 1, perPage = 10 }): AxiosBaseQueryArgs => {
                const searchParam = searchQuery ? `search=${searchQuery}` : '';
                const pageParam = page ? `page=${page}` : '';
                const perPageParam = perPage ? `per_page=${perPage}` : '';
                const queryParams = [searchParam, pageParam, perPageParam].filter(param => param !== '').join('&');

                return {
                    url: `${BASE_PRODUCT_URL}?${queryParams}`,
                    method: 'GET',
                };
            },
            providesTags: (result, error, searchQuery) => {
                return searchQuery ? [{ type: 'products', searchQuery }] : ['products']
            }
        }),
        getProduct: builder.query<Product, any>({
            query: ({ product_code }): AxiosBaseQueryArgs => {
                return {
                    url: `${BASE_PRODUCT_URL}/${product_code}`,
                    method: 'GET',
                };
            }
        }),
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


