import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export type AxiosBaseQuery = {
    baseUrl: string;
    prepareHeaders?: (
        api: Pick<BaseQueryApi, | 'endpoint' | 'type' | 'forced'>
    ) => MaybePromise<AxiosRequestHeaders>;
};

export type AxiosBaseQueryArgs = {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
};

export const axiosBaseQuery = (
    { baseUrl, prepareHeaders }: AxiosBaseQuery = { baseUrl: '/' }
): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
    async ({ url, method, data, params }, api) => {

        let headers = {} as AxiosRequestHeaders
        if (prepareHeaders) {
            headers = await prepareHeaders(api as BaseQueryApi);
        }

        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
                headers: {
                    ...headers,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true
            });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                    message: err.cause
                },
            };
        }
    };
