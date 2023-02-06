import { api } from "./api";

export interface User {
  email: string;
  password: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<any, string>({
      query: () => "/users/me",
    }),
  }),
});

export const { useGetUserQuery } = userApi;

export const {
  endpoints: { getUser },
} = userApi;
