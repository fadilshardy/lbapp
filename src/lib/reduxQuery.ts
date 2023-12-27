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
    itemId: string;
    tagType: T;

};
const buildQueryParamsUrl = (
    baseUrl: string,
    searchQuery: string,
    page: number,
    perPage: number,
    queryParams?: string[]
): string => {

    const params = [
        searchQuery ? `search=${searchQuery}` : null,
        page ? `page=${page}` : null,
        perPage ? `per_page=${perPage}` : null,
        ...(queryParams && queryParams.length > 0 ? queryParams.filter(param => param !== '') : []),
    ];

    const queryParamsString = params.filter(param => param !== null).join('&');

    return `${baseUrl}/?${queryParamsString}`;
};

export const generateGetAllEndpoint = <T extends string>({
    baseUrl,
    queryParams,
    tagType,
    itemId
}: GetAllEndpointProps<T>) => {
    const queryFn = ({ searchQuery = '', page = 1, perPage = 30 }: {
        searchQuery?: string;
        page?: number;
        perPage?: number;
    }): AxiosBaseQueryArgs => {
        return {
            url: buildQueryParamsUrl(baseUrl, searchQuery, page, perPage, queryParams),
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
        providesTags: (result: any, error: any, id: any) => {
            return [{ type: tagType, id }]
        }
    };
};

export const generateCreateEndpoint = <T extends string>({
    baseUrl,
    tagType
}: EndpointProps<T>) => {
    const queryFn = ({ payload }: { payload: any }): AxiosBaseQueryArgs => {
        return {
            url: baseUrl,
            method: 'POST',
            data: payload
        };
    };
    return {
        query: queryFn,
        transformResponse: (response: { data: any }, meta: any, arg: any) => response.data,
        transformErrorResponse: (
            response: { data: { errors: {} } },
            meta: any, arg: any
        ) => response.data,
        invalidatesTags: tagType,
    };
};


