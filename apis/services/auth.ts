import api from "@/apis";
import { AuthTokenResponse, LoginBody, SignupBody, User } from "../@types/auth";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<User, void>({
      query: () => ({
        url: "/store-users/me/",
      }),
      providesTags: ["User"],
    }),

    login: build.mutation<AuthTokenResponse, LoginBody>({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body: { ...body, user_type: "store_user" },
      }),
      invalidatesTags: ["User"],
    }),

    signup: build.mutation<AuthTokenResponse, SignupBody>({
      query: (body) => ({
        url: "/store-users/me/",
        method: "POST",
        body,
      }),
    }),

    logout: build.mutation({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
    }),

    facebookLogin: build.mutation({
      query: (body) => ({
        url: "/users/facebook/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    googleLogin: build.mutation({
      query: (body) => ({
        url: "/users/gmail/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    appleLogin: build.mutation({
      query: (body) => ({
        url: "/users/apple/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useFacebookLoginMutation,
  useGoogleLoginMutation,
  useAppleLoginMutation,
} = authApi;
