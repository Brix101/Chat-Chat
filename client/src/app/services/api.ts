import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resetAuthState, tokenReceived } from "../../features/auth/authSlice";
import { RootState } from "../store";

const hostname = window.location.hostname;

export const baseUrl = `http://${hostname}:5000/api`;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.data === "Unauthorized") {
    // try to get a new token
    const refreshResult = await baseQuery(
      "/auth/refreshToken",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as unknown as {
        accessToken: string;
      };
      // store the new token
      api.dispatch(tokenReceived(accessToken));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetAuthState());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
