import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: user,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: user,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
      },
    }),
    getUser: builder.query({
      query: () => {
        return {
          url: "/auth/me",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
      },
    }),
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: "/auth/logout",
          method: "POST",
          body: {},
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
      },
    }),
    paymentStripe: builder.mutation({
      query: (data) => {
        return {
          url: "/payment/donations/stripe",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
      },
    }),
    getAllPayments: builder.query({
      query: () => {
        return {
          url: "/payment/get/all/payments",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
      },
    }),
  }),
});
export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useLogoutUserMutation,
  usePaymentStripeMutation,
  useGetAllPaymentsQuery,
} = authApi;
