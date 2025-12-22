import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
  createApi,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://newsbangla.test/api",
  // credentials: "include", // Removed to avoid CORS issues with wildcard origin
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.warn("Unauthorized — logging out");

    localStorage.removeItem("token");

    api.dispatch(logout());

    window.location.href = "/admin/v1/auth/login";

    return {
      error: {
        status: 401,
        data: "Unauthorized",
      },
    };
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
