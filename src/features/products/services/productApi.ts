import { API_URL } from '@config';
import { PaginationResponse } from '@interfaces';
import { appApi } from '@stores/appApi';
import { IProduct } from '../interfaces/product';

const BASE_PRODUCT_URL = `${API_URL}/api/product`;


export const productApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<PaginationResponse<IProduct>, any>({
            query: ({ searchQuery = '', page = 1, perPage = 10 }) => {
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
    }),
});


