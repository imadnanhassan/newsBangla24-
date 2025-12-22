import { configureStore } from "@reduxjs/toolkit";
import { logout } from "./features/authSlice";
import { baseApi } from "./api/baseApi";
import { authApi } from "./api/authApi";
import authSlice from "./features/authSlice";

const authMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type.endsWith("/rejected") && action.payload?.status === 401) {
    store.dispatch(logout());
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      authApi.middleware,
      authMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
