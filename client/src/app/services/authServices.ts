import { api } from "./api";

export interface User {
  email: string;
  password: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ accessToken: string }, User>({
      query: (credentials: User) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;

export const {
  endpoints: { login, logout },
} = authApi;
