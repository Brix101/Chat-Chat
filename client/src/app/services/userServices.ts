import { api } from "./api";

export interface User {
  email: string;
  name: string;
  _id: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: () => "/users/me",
    }),
  }),
});

export const { useGetUserQuery } = userApi;

export const {
  endpoints: { getUser },
} = userApi;
