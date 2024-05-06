import { accountApi } from '@features/accounts';
import { useDebouncedQuery, useSearchQuery } from '@hooks/useSearchQuery';
import { ISelectLabel } from '@interfaces';
import { useState } from 'react';

export function useCustomSelect(
    { customFilter }: { customFilter: string }) {
    const { query, handleQueryChange } = useSearchQuery();
    const searchDebouncedQuery = useDebouncedQuery(query);

    const [selectedAccount, setSelectedAccount] = useState<ISelectLabel>({
        id: null,
        name: null,
    });

    const handleSelectedChange = (value: ISelectLabel) => {
        setSelectedAccount(value);
    }

    const { data, isFetching: isAccountFetching } = accountApi.useGetSelectAccountsQuery({
        searchQuery: searchDebouncedQuery,
        customFilter: customFilter,
    });

    const accounts = data ?? [];

    return { selectedAccount, handleSelectedChange, handleQueryChange, accounts, isAccountFetching, query };
}