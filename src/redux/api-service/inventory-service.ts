import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./base";
import type {
  CreateInventoryRequest,
  UpdateInventoryRequest,
  CreateAndUpdateInventoryResponse,
  InventoryListResponse,
  InventoryResponse,
  InventoryFilterParams,
} from "@/interface/inventory";
import { setInventories, setPagination } from "../slices/inventory-slice";

interface DeleteInventoryResponse {
  message: string;
}

export const inventoryService = createApi({
  baseQuery: baseApi,
  reducerPath: "inventoryService",
  tagTypes: ["Inventory"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    inventoryList: builder.query<InventoryListResponse, InventoryFilterParams>({
      query: (params) => {
        return {
          url: `/api/inventory/`,
          params,
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(setInventories(data.data.results.inventory));
          dispatch(
            setPagination({
              total: data.data.count,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.results.inventory.map(({ id }) => ({
                type: "Inventory" as const,
                id,
              })),
              { type: "Inventory", id: "LIST" },
            ]
          : [{ type: "Inventory", id: "LIST" }],
    }),
    inventory: builder.query<InventoryResponse, string>({
      query: (id) => `/api/inventory/${id}/`,
      providesTags: (_result, error, arg) =>
        error ? [] : [{ type: "Inventory", id: arg }],
    }),

    createInventory: builder.mutation<
      CreateAndUpdateInventoryResponse,
      CreateInventoryRequest
    >({
      query: (data) => ({
        url: `/api/inventory/create/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [{ type: "Inventory", id: "LIST" }],
    }),

    updateInventory: builder.mutation<
      CreateAndUpdateInventoryResponse,
      UpdateInventoryRequest
    >({
      query: (data) => ({
        url: `/api/inventory/${data.id}/update/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, error, arg) =>
        error
          ? []
          : [
              { type: "Inventory", id: "LIST" },
              { type: "Inventory", id: arg.id },
            ],
    }),

    deleteInventory: builder.mutation<DeleteInventoryResponse, string>({
      query: (id) => ({
        url: `/api/inventory/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, error, arg) =>
        error
          ? []
          : [
              { type: "Inventory", id: "LIST" },
              { type: "Inventory", id: arg },
            ],
    }),
  }),
});

export const {
  useInventoryListQuery,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
  useLazyInventoryQuery,
  useInventoryQuery,
} = inventoryService;
