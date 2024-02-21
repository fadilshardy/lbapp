

import { mutationResponseTransformers } from '@lib/apiHelpers';
import { AxiosBaseQueryArgs } from "@stores/axiosBaseQuery";

interface TagDescription<T> { type: T; searchQuery?: string };

interface GetAllEndpointProps<T extends string> {
    baseUrl: string;
    queryParams?: string[];
    tagType: T;
    itemId: string;
};

interface EndpointProps<T extends string> {
    baseUrl: string;
    itemId?: string;
    tagType: T;
};

interface createEndpointProps<T extends string> {
    baseUrl: string;
};

export const generateEndpoint = <T extends string>({
    baseUrl,
    method,
}: createEndpointProps<T> & { method: 'POST' | 'PUT' | 'DELETE' }) => {
    const queryFn = ({ payload, itemId }: { payload?: any; itemId: string }): AxiosBaseQueryArgs => {
        return {
            url: itemId ? `${baseUrl}/${itemId}` : baseUrl,
            method,
            data: payload,
        };
    };

    return {
        query: queryFn,
        ...mutationResponseTransformers(),
    };
};

export const generateGetEndpoint = <T extends string>({
    baseUrl,
    tagType
}: EndpointProps<T>) => {
    const queryFn = ({ itemId }: { itemId: string }): AxiosBaseQueryArgs => {
        return {
            url: `${baseUrl}/${itemId}`,
            method: 'GET',
        };
    };
    return {
        query: queryFn,
        providesTags: (id: any) => {
            return [{ type: tagType, id }]
        }
    };
};

export const generateCreateEndpoint = ({ baseUrl }: { baseUrl: string }) => generateEndpoint({ baseUrl: baseUrl, method: 'POST' });
export const generateUpdateEndpoint = ({ baseUrl }: { baseUrl: string }) => generateEndpoint({ baseUrl: baseUrl, method: 'PUT' });
export const generateDeleteEndpoint = ({ baseUrl }: { baseUrl: string }) => generateEndpoint({ baseUrl: baseUrl, method: 'DELETE' });
export const generateImportEndpoint = ({ baseUrl }: { baseUrl: string }) => generateEndpoint({ baseUrl: `${baseUrl}/import`, method: 'POST' });


const buildQueryParamsUrl = (
    baseUrl: string,
    searchQuery: string,
    page: number,
    perPage: number,
    queryParams?: string[],
    customFilter?: string
): string => {

    const params = [
        searchQuery ? `search=${searchQuery}` : null,
        page ? `page=${page}` : null,
        perPage ? `per_page=${perPage}` : null,
        customFilter ? customFilter : null,
        ...(queryParams && queryParams.length > 0 ? queryParams.filter(param => param !== '') : []),
    ];

    const queryParamsString = params.filter(param => param !== null).join('&');

    return `${baseUrl}/?${queryParamsString}`;
};

export const generateGetAllEndpoint = <T extends string>({
    baseUrl,
    queryParams,
    tagType,
    itemId,
}: GetAllEndpointProps<T>) => {
    const queryFn = ({ searchQuery = '', page = 1, perPage = 30, customFilter = '' }: {
        searchQuery?: string;
        page?: number;
        perPage?: number;
        customFilter?: string;
    }): AxiosBaseQueryArgs => {
        return {
            url: buildQueryParamsUrl(baseUrl, searchQuery, page, perPage, queryParams, customFilter),
            method: 'GET',
        };
    };

    return {
        query: queryFn,
        providesTags: (result: any) => {
            if (!result) return [{ type: tagType, id: 'LIST' }]

            return [
                ...result.data.map((item: any) => ({ type: tagType, id: item[itemId] } as const)),
                { type: tagType, id: 'LIST' }
            ];
        }
    };
};




