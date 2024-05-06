import * as reduxQuery from '@lib/reduxQuery';
import { appApi } from '@stores/appApi';
import { IGeneralLedger } from '../interfaces/generalLedger';

const BASE_REPORT_URL = `/api/report`;


export const reportApi = appApi.injectEndpoints({
    endpoints: (builder) => ({

        getLedgers: builder.query<IGeneralLedger, any>(reduxQuery.generateGetEndpoint({
            baseUrl: `${BASE_REPORT_URL}/ledgers`,
            tagType: 'reports',
            itemId: 'code',
        })),
        getLedger: builder.query<IGeneralLedger, any>(
            reduxQuery.generateGetEndpoint({
                baseUrl: `${BASE_REPORT_URL}/ledger`,
                tagType: 'reports',
                itemId: 'code',
            })
        ),
    })
});


