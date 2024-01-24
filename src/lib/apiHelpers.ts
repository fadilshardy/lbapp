
export const transformApiResponse = (response: { data: any }) => response.data;

export const transformApiErrorResponse = (response: { data: { errors: {} } }) => response.data.errors || response.data;

/**
 Returns an object with common response transformation options for mutations.
 *
 *returns {Object} - An object with 'transformResponse' and 'transformErrorResponse' properties.
 */
export const mutationResponseTransformers = () => ({
    transformResponse: transformApiResponse,
    transformErrorResponse: transformApiErrorResponse,
});