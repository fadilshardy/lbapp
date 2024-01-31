import { Account } from '@features/accounts';
import { PaginationResponse } from '@interfaces';
import { generateGetAllEndpoint, generateGetEndpoint } from '@lib/reduxQuery';
import { appApi } from '@stores/appApi';

const BASE_API_URL = '/api/account';
const TAG_TYPE = 'accounts';
const ITEM_ID = 'code';

export const accountApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAccounts: builder.query<PaginationResponse<Account>, any>({
            ...generateGetAllEndpoint({
                baseUrl: BASE_API_URL,
                tagType: TAG_TYPE,
                itemId: ITEM_ID,
            })
        }),
        getAccount: builder.query<Account, any>({
            ...generateGetEndpoint({
                baseUrl: BASE_API_URL,
                tagType: TAG_TYPE,
                itemId: ITEM_ID,
            })
        }),
        createAccount: builder.mutation<any, any>({
            query: ({ payload }) => {
                return ({
                    url: BASE_API_URL,
                    method: 'POST',
                    data: payload,
                })
            },
            transformResponse: (response: { data: any }, meta, arg) => response.data,
            transformErrorResponse: (
                response: { data: { errors: {} } },
                meta, arg
            ) => response.data,
            invalidatesTags: [TAG_TYPE],
        }),
        updateAccount: builder.mutation<any, any>({
            query: ({ payload, productKey }) => {
                return ({
                    url: `${BASE_API_URL}/${productKey}`,
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
        deleteAccount: builder.mutation<any, any>({
            query: ({ payload, productKey }) => {
                return ({
                    url: `${BASE_API_URL}/${productKey}`,
                    method: 'DELETE',
                })
            },
            transformResponse: (response: { data: any }, meta, arg) => response.data,
            transformErrorResponse: (
                response: { data: { errors: {} } },
            ) => response.data,
            invalidatesTags: ['products'],
        }),
        importAccounts: builder.mutation<any, any>({
            query: ({ payload }) => {
                return ({
                    url: `${BASE_API_URL}/import`,
                    method: 'POST',
                    data: payload,
                })
            },
            transformErrorResponse: (
                response: { data: { errors: {} } },
            ) => response.data,
            invalidatesTags: ['products'],
        }),
        getSelectAccounts: builder.query<Account, any>(
            {
                ...generateGetAllEndpoint({
                    baseUrl: BASE_API_URL,
                    tagType: TAG_TYPE,
                    itemId: ITEM_ID,
                    queryParams: ['parent_id']
                }),
                transformResponse: (response: any) =>
                    response.data.map((item: any) => ({
                        name: `${item.code} - ${item.name}`,
                        id: String(item.id),
                        type: item.type
                    })),
                providesTags: (result: any) => {
                    if (!result) return [{ type: TAG_TYPE, id: 'LIST' }]
                    return [
                        ...result.map((item: any) => ({ type: TAG_TYPE, id: item[ITEM_ID] } as const)),
                        { type: TAG_TYPE, id: 'LIST' }
                    ];
                }
            }),
    })
});


