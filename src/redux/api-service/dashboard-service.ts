import { createApi } from "@reduxjs/toolkit/query/react";
import type { DashboardResponse } from "../../interface/dashboard";
import { baseApi } from "./base";

export const dashboardService = createApi({
  baseQuery: baseApi,
  reducerPath: "dashboardService",
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardResponse, void>({
      query: () => ({
        url: "/api/dashboard/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardService;
