import { Product } from '@features/products';
import { PaginationResponse } from '@interfaces';
import * as reduxQuery from '@lib/reduxQuery';
import { generateGetAllEndpoint, generateGetEndpoint } from '@lib/reduxQuery';

import { appApi } from '@stores/appApi';

const BASE_PRODUCT_URL = `/api/product`;


export const productApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
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
        createProduct: builder.mutation<Product, any>({
            ...reduxQuery.generateCreateEndpoint({
                baseUrl: BASE_PRODUCT_URL,
            }),
            invalidatesTags: ['products']
        }),
        updateProduct: builder.mutation<Product, any>({
            ...reduxQuery.generateUpdateEndpoint({
                baseUrl: BASE_PRODUCT_URL,
            }),
            invalidatesTags: ['products'],
        }),
        deleteProduct: builder.mutation<Product, any>({
            ...reduxQuery.generateDeleteEndpoint({
                baseUrl: BASE_PRODUCT_URL,
            }),
            invalidatesTags: ['products'],
        }),
        importProducts: builder.mutation<Product, any>({
            ...reduxQuery.generateImportEndpoint({
                baseUrl: BASE_PRODUCT_URL,
            }),
            invalidatesTags: ['products'],
        }),
        getSelectProducts: builder.query<Product, any>({
            query: ({ searchQuery = '' }) => {
                const searchParam = searchQuery ? `search=${searchQuery}` : '';
                const queryParams = [searchParam].filter(param => param !== '').join('&');
                return {
                    url: `${BASE_PRODUCT_URL}?${queryParams}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: any) =>
                response.data.map((item: any) => ({
                    name: `${item.name} (${item.unit}) | ${item.brand}`,
                    id: String(item.id),
                    unit: item.unit,
                    brand: item.brand,
                    type: item.type
                })),
            providesTags: (searchQuery) => {
                return searchQuery ? [{ type: 'products', searchQuery }] : ['products']
            }
        }),

    })
});


