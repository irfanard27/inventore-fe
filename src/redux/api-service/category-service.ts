import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./base";
import type {
  CategoryList,
  CreateCategoryRequest,
  CreateCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
  DeleteCategoryResponse,
} from "@/interface/category";

export const categoryService = createApi({
  reducerPath: "categoryService",
  baseQuery: baseApi,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategoryList: builder.query<CategoryList, void>({
      query: () => "/api/categories/",
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<
      CreateCategoryResponse,
      CreateCategoryRequest
    >({
      query: (category) => ({
        url: "/api/categories/create/",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      UpdateCategoryResponse,
      UpdateCategoryRequest
    >({
      query: (category) => ({
        url: `/api/categories/${category.id}/update/`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<DeleteCategoryResponse, string>({
      query: (id) => ({
        url: `/api/categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoryListQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryService;
