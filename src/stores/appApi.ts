import { API_URL } from '@config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const appApi = createApi({
    reducerPath: "apiApp",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ["products", "productCatalogs"],
    endpoints: (builder) => ({}),
});
