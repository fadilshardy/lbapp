import { Vendor } from '@features/vendors';
import { PaginationResponse } from '@interfaces';
import * as reduxQuery from '@lib/reduxQuery';
import { generateGetAllEndpoint, generateGetEndpoint } from '@lib/reduxQuery';

import { appApi } from '@stores/appApi';

const BASE_VENDOR_URL = `/api/vendor`;


export const vendorApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getVendors: builder.query<PaginationResponse<Vendor>, any>(generateGetAllEndpoint({
            baseUrl: BASE_VENDOR_URL,
            tagType: 'vendors',
            itemId: 'code',
        })),
        getVendor: builder.query<Vendor, any>(generateGetEndpoint({
            baseUrl: BASE_VENDOR_URL,
            tagType: 'vendors',
            itemId: 'code',
        })),
        createVendor: builder.mutation<Vendor, any>({
            ...reduxQuery.generateCreateEndpoint({
                baseUrl: BASE_VENDOR_URL,
            }),
            invalidatesTags: ['vendors']
        }),
        updateVendor: builder.mutation<Vendor, any>({
            ...reduxQuery.generateUpdateEndpoint({
                baseUrl: BASE_VENDOR_URL,
            }),
            invalidatesTags: ['vendors'],
        }),
        deleteVendor: builder.mutation<Vendor, any>({
            ...reduxQuery.generateDeleteEndpoint({
                baseUrl: BASE_VENDOR_URL,
            }),
            invalidatesTags: ['vendors'],
        }),
        importVendor: builder.mutation<Vendor, any>({
            ...reduxQuery.generateImportEndpoint({
                baseUrl: BASE_VENDOR_URL,
            }),
            invalidatesTags: ['vendors'],
        }),
        getSelectVendors: builder.query<Vendor, any>({
            query: ({ searchQuery = '' }) => {
                const searchParam = searchQuery ? `search=${searchQuery}` : '';
                const queryParams = [searchParam].filter(param => param !== '').join('&');
                return {
                    url: `${BASE_VENDOR_URL}?${queryParams}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: any) =>
                response.data.map((item: any) => ({
                    name: `${item.name} (${item.code})`,
                    id: String(item.id),
                })),
            providesTags: (searchQuery) => {
                return searchQuery ? [{ type: 'vendors', searchQuery }] : ['vendors']
            }
        }),

    })
});


