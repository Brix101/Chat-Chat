import { api } from './api';

export interface User {
  email: string
  password: string
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string; user: User }, any>({
      query: (credentials: any) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
  }),
})

export const {
  useLoginMutation,
} = authApi

export const {
  endpoints:{login}
} = authApi
