import { cartReducer, paymentReducer } from '@features/pos/cart'
import { configureStore } from '@reduxjs/toolkit'
import { appApi } from './appApi'
import mainReducer from './mainSlice'
import styleReducer from './styleSlice'

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    cart: cartReducer,
    payment: paymentReducer,

    apiApp: appApi.reducer
  }, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          // cookies: context.ctx?req
        }
      }
    }).concat([
      appApi.middleware
    ]),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


