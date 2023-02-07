import { api } from "./api";

export interface User {
  email: string;
  name: string;
  _id: string;
}

export interface SignInUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: () => "/users/me",
    }),
    registerUser: build.mutation<any, SignInUser>({
      query: (body: SignInUser) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {
        try {
          await cacheDataLoaded;

          // socket.on("connect", () => {
          //   console.log("connected");
          // });
          //socket.on("allSpots", (spots) => {
          //updateCachedData((draft) => {
          // draft.splice(0, draft.length);
          // draft.push(...spots);
          // });
          // });
        } catch (error) {}

        await cacheEntryRemoved;
      },
    }),
  }),
});

export const { useGetUserQuery, useRegisterUserMutation } = userApi;

export const {
  endpoints: { getUser },
} = userApi;
