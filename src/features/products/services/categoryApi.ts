import { PaginationResponse } from '@interfaces';
import { generateGetAllEndpoint } from '@lib/reduxQuery';
import { appApi } from '@stores/appApi';
import { ICategory } from '../interfaces/category';

const BASE_CATEGORY_URL = `/api/category`;


export const categoryApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<PaginationResponse<ICategory>, any>(generateGetAllEndpoint({
            baseUrl: BASE_CATEGORY_URL,
            tagType: 'categories',
            itemId: 'id',
        })),
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


