import { Transaction, TransactionRecord } from '@features/transactions';
import { PaginationResponse } from '@interfaces';
import * as reduxQuery from '@lib/reduxQuery';
import { appApi } from '@stores/appApi';

const BASE_TRANSACTION_URL = `/api/transaction`;

export const transactionApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<PaginationResponse<Transaction>, any>(
      reduxQuery.generateGetAllEndpoint({
        baseUrl: BASE_TRANSACTION_URL,
        tagType: 'transactions',
        itemId: 'code',
      })
    ),
    getTransaction: builder.query<TransactionRecord, any>(
      reduxQuery.generateGetEndpoint({
        baseUrl: BASE_TRANSACTION_URL,
        tagType: 'transactions',
        itemId: 'code',
      })
    ),
    createTransaction: builder.mutation<TransactionRecord, any>({
      ...reduxQuery.generateCreateEndpoint({
        baseUrl: BASE_TRANSACTION_URL,
      }),
      invalidatesTags: ['transactions'],
    }),
  }),
});
