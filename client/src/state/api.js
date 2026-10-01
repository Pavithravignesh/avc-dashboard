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
      query: () => `customerType/viewData`,
      providesTags: ["CustomerType"],
    }),
    getAccountIndustry: build.query({
      query: () => `accountIndustry/viewData`,
      providesTags: ["AccountIndustry"],
    }),
    getAcvRange: build.query({
      query: () => `acvRange/viewData`,
      providesTags: ["AcvRange"],
    }),
    getTeam: build.query({
      query: () => `team/viewData`,
      providesTags: ["Team"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetCustomerTypeQuery,
  useGetAccountIndustryQuery,
  useGetAcvRangeQuery,
  useGetTeamQuery,
} = api;
