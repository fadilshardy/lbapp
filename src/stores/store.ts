import { cartReducer, paymentReducer } from '@features/pos-cart'
import { productCatalogReducer } from '@features/pos-product-catalog'
import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './mainSlice'
import styleReducer from './styleSlice'

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    productCatalog: productCatalogReducer,
    cart: cartReducer,
    payment: paymentReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
