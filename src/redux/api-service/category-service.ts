import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./base";
import type { CategoryList } from "@/interface/category";

export const categoryService = createApi({
  reducerPath: "categoryService",
  baseQuery: baseApi,
  endpoints: (builder) => ({
    getCategoryList: builder.query<CategoryList, void>({
      query: () => "/api/categories/",
    }),
  }),
});

export const { useGetCategoryListQuery } = categoryService;
