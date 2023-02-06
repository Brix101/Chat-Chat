import { api } from "./api";

export interface User {
  email: string;
  name: string;
  _id: string;
}

export interface SignInUser{
   name: string;
   email: string;
   password:string;
   confirmPassword:string ;
}


export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: () => "/users/me",
    }),
    registerUser: build.mutation<any,SignInUser>({
        query:(body:SignInUser)=>({
            url:"/users/register",
            method:"POST",
            body
        })
    })
  }),
});

export const { useGetUserQuery,useRegisterUserMutation } = userApi;

export const {
  endpoints: { getUser },
} = userApi;
