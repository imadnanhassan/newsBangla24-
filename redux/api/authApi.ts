import { createApi } from "@reduxjs/toolkit/query/react";
import { loginSuccess, logout } from "../features/authSlice";
import { baseQueryWithReauth } from "./baseApi";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}

interface LogoutResponse {
  success: boolean;
  message: string;
}

interface CheckResponse {
  status: number;
  message: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(loginSuccess({ user: null, token: data.token })); // No user in response, so pass null
          }
        } catch (error) {
          // Error handled in slice
        }
      },
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/v1/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          // Error handled in slice
        }
      },
    }),
    check: builder.query<CheckResponse, void>({
      query: () => ({
        url: "/v1/auth/check",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useCheckQuery } = authApi;
