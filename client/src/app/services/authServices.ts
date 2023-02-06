import { api } from "./api";

export interface LoginInput {
  email: string;
  password: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ accessToken: string }, LoginInput>({
      query: (credentials: LoginInput) => ({
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
