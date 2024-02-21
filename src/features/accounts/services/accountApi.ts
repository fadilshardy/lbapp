import { Account } from '@features/accounts';
import { PaginationResponse } from '@interfaces';
import * as reduxQuery from '@lib/reduxQuery';
import { appApi } from '@stores/appApi';

const BASE_API_URL = '/api/account';
const TAG_TYPE = 'accounts';
const ITEM_ID = 'code';

export const accountApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAccounts: builder.query<PaginationResponse<Account>, any>({
            ...reduxQuery.generateGetAllEndpoint({
                baseUrl: BASE_API_URL,
                tagType: TAG_TYPE,
                itemId: ITEM_ID,
            })
        }),
        getAccount: builder.query<Account, any>({
            ...reduxQuery.generateGetEndpoint({
                baseUrl: BASE_API_URL,
                tagType: TAG_TYPE,
                itemId: ITEM_ID,
            })
        }),
        createAccount: builder.mutation<Account, any>({
            ...reduxQuery.generateCreateEndpoint({
                baseUrl: BASE_API_URL,
            }),
            invalidatesTags: [TAG_TYPE]
        }),
        updateAccount: builder.mutation<Account, any>({
            ...reduxQuery.generateUpdateEndpoint({
                baseUrl: BASE_API_URL,
            }),
            invalidatesTags: [TAG_TYPE],
        }),
        deleteAccount: builder.mutation<Account, any>({
            ...reduxQuery.generateDeleteEndpoint({
                baseUrl: BASE_API_URL,
            }),
            invalidatesTags: [TAG_TYPE],
        }),
        importAccounts: builder.mutation<Account, any>({
            ...reduxQuery.generateImportEndpoint({
                baseUrl: BASE_API_URL,
            }),
            invalidatesTags: [TAG_TYPE],
        }),
        getSelectAccounts: builder.query<Account, any>(
            {
                ...reduxQuery.generateGetAllEndpoint({
                    baseUrl: BASE_API_URL,
                    tagType: TAG_TYPE,
                    itemId: ITEM_ID,
                }),
                transformResponse: (response: any) =>
                    response.data.map((item: any) => ({
                        name: `${item.code} - ${item.name}`,
                        id: String(item.id),
                        type: item.type,
                        balance: item.balance,
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


