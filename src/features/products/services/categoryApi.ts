import { PaginationResponse } from '@interfaces';
import { appApi } from '@stores/appApi';
import { ICategory } from '../interfaces/category';

const BASE_CATEGORY_URL = `/api/category`;


export const categoryApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<PaginationResponse<ICategory>, any>({
            query: ({ searchQuery = '', page = 1, perPage = 10 }) => {
                const searchParam = searchQuery ? `search=${searchQuery}` : '';
                const pageParam = page ? `page=${page}` : '';
                const perPageParam = perPage ? `per_page=${perPage}` : '';
                const queryParams = [searchParam, pageParam, perPageParam].filter(param => param !== '').join('&');

                return {
                    url: `${BASE_CATEGORY_URL}?${queryParams}`,
                    method: 'GET',
                };
            },
            providesTags: (result, error, searchQuery) => {
                return searchQuery ? [{ type: 'categories', searchQuery }] : ['categories']
            }
        }),
        getSelectCategories: builder.query<ICategory, any>({
            query: ({ searchQuery = '' }) => {
                const searchParam = searchQuery ? `search=${searchQuery}` : '';
                const queryParams = [searchParam].filter(param => param !== '').join('&');
                return {
                    url: `${BASE_CATEGORY_URL}?${queryParams}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: any) =>
                response.data.map((item: any) => ({
                    name: item.name,
                    id: String(item.id)
                })),
            providesTags: (result, error, searchQuery) => {
                return searchQuery ? [{ type: 'categories', searchQuery }] : ['categories']
            }
        }),
    }),
});


