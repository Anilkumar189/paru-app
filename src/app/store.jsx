import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../features/login/LoginSlice'
import { postsApi } from "../services/PostsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loansApi } from "../services/LoansApi";
import { intrestApi } from "../services/InterestApi";
export const store = configureStore({
    reducer:{
    loginReducer,
    [postsApi.reducerPath]:postsApi.reducer,
    [loansApi.reducerPath]:loansApi.reducer,
    [intrestApi.reducerPath]:intrestApi.reducer
    },
  middleware:(getdeafultMiddleware)=>getdeafultMiddleware().concat(postsApi.middleware,loansApi.middleware,intrestApi.middleware)
})
setupListeners(store.dispatch)