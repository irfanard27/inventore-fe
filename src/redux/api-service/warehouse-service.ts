import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./base";
import type { WarehouseList } from "@/interface/warehouse";

export const warehouseService = createApi({
  reducerPath: "warehouseService",
  baseQuery: baseApi,
  endpoints: (builder) => ({
    getWarehouseList: builder.query<WarehouseList, void>({
      query: () => "/api/warehouse/",
    }),
  }),
});

export const { useGetWarehouseListQuery } = warehouseService;
