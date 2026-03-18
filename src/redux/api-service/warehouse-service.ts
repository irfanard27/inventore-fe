import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./base";
import type {
  WarehouseList,
  CreateWarehouseRequest,
  CreateWarehouseResponse,
  UpdateWarehouseRequest,
  UpdateWarehouseResponse,
  DeleteWarehouseResponse,
} from "@/interface/warehouse";

export const warehouseService = createApi({
  reducerPath: "warehouseService",
  baseQuery: baseApi,
  tagTypes: ["Warehouse"],
  endpoints: (builder) => ({
    getWarehouseList: builder.query<WarehouseList, void>({
      query: () => "/api/warehouse/",
      providesTags: ["Warehouse"],
    }),
    createWarehouse: builder.mutation<
      CreateWarehouseResponse,
      CreateWarehouseRequest
    >({
      query: (warehouse) => ({
        url: "/api/warehouse/create/",
        method: "POST",
        body: warehouse,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    updateWarehouse: builder.mutation<
      UpdateWarehouseResponse,
      UpdateWarehouseRequest
    >({
      query: (warehouse) => ({
        url: `/api/warehouse/${warehouse.id}/update/`,
        method: "PUT",
        body: warehouse,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    deleteWarehouse: builder.mutation<DeleteWarehouseResponse, string>({
      query: (id) => ({
        url: `/api/warehouse/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Warehouse"],
    }),
  }),
});

export const {
  useGetWarehouseListQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehouseService;
