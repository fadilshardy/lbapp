import { API_URL } from '@config';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export const appApi = createApi({
    reducerPath: "apiApp",
    baseQuery: axiosBaseQuery({
        baseUrl: API_URL,
    }),
    tagTypes: ["products", "productCatalogs", "categories"],
    endpoints: (builder) => ({}),
});
