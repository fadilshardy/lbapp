import { IProductCatalog } from '@features/pos-product-catalog';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductCatalogState {
    productCatalogs: IProductCatalog[];
    searchQuery: string;
}

const initialState: ProductCatalogState = {
    productCatalogs: [],
    searchQuery: '',
};

const productCatalogSlice = createSlice({
    name: 'productCatalog',
    initialState,
    reducers: {
        setProductCatalogs: (state, action: PayloadAction<IProductCatalog[]>) => {
            state.productCatalogs = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setProductCatalogs, setSearchQuery } = productCatalogSlice.actions;
export const productCatalogReducer = productCatalogSlice.reducer;
