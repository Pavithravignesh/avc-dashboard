import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "CustomerType", "AccountIndustry", "AcvRange", "Team"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `user/viewData/${id}`,
      providesTags: ["User"],
    }),
    getCustomerType: build.query({
      query: (id) => `customerType/viewData`,
      providesTags: ["CustomerType"],
    }),
    getAccountIndustry: build.query({
      query: (id) => `accountIndustry/viewData`,
      providesTags: ["AccountIndustry"],
    }),
    getAcvRange: build.query({
      query: (id) => `acvRange/viewData`,
      providesTags: ["AcvRange"],
    }),
    getTeam: build.query({
      query: (id) => `team/viewData`,
      providesTags: ["Team"],
    }),
    getTransaction: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: `client/transaction`,
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetCustomerTypeQuery,
  useGetAccountIndustryQuery,
  useGetAcvRangeQuery,
  useGetTeamQuery,
  useGetTransactionQuery,
} = api;
