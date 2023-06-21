import useDebounce from '@hooks/useDebounce';
import { useState } from 'react';

interface SearchQueryHook {
    query: string;
    handleQueryChange: (query: string) => void;
}

export const useSearchQuery = (initialValue = ''): SearchQueryHook => {
    const [query, setQuery] = useState(initialValue);

    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    return {
        query,
        handleQueryChange,
    };
};

export const useDebouncedQuery = (query: string, delay: number = 200): string => {
    const debouncedQuery = useDebounce(query, delay);

    return debouncedQuery;
};
