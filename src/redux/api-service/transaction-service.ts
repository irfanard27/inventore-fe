import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./base";
import type {
  TransactionListResponse,
  TransactionFilterParams,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  CreateAndUpdateTransactionResponse,
  TransactionResponse,
  DeleteTransactionResponse,
  CompleteTransactionResponse,
  RejectTransactionRequest,
  RejectTransactionResponse,
} from "@/interface/transaction";
import {
  setTransactionPagination,
  setTransactions,
} from "@/redux/slices/transaction-slice";

export const transactionService = createApi({
  baseQuery: baseApi,
  reducerPath: "transactionService",
  tagTypes: ["Transaction"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    transactionList: builder.query<
      TransactionListResponse,
      TransactionFilterParams
    >({
      query: (params) => {
        return {
          url: `/api/transactions/`,
          params,
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(setTransactions(data.data.results.transactions));
          dispatch(
            setTransactionPagination({
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
              ...result.results.transactions.map(({ id }) => ({
                type: "Transaction" as const,
                id,
              })),
              { type: "Transaction", id: "LIST" },
            ]
          : [{ type: "Transaction", id: "LIST" }],
    }),
    transaction: builder.query<TransactionResponse, string>({
      query: (id) => `/api/transactions/${id}/`,
      providesTags: (_result, error, arg) =>
        error ? [] : [{ type: "Transaction", id: arg }],
    }),

    createTransaction: builder.mutation<
      CreateAndUpdateTransactionResponse,
      CreateTransactionRequest
    >({
      query: (data) => ({
        url: `/api/transactions/create/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [{ type: "Transaction", id: "LIST" }],
    }),

    updateTransaction: builder.mutation<
      CreateAndUpdateTransactionResponse,
      UpdateTransactionRequest
    >({
      query: (data) => ({
        url: `/api/transactions/${data.id}/update/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, error, arg) =>
        error
          ? []
          : [
              { type: "Transaction", id: "LIST" },
              { type: "Transaction", id: arg.id },
            ],
    }),

    deleteTransaction: builder.mutation<DeleteTransactionResponse, string>({
      query: (id) => ({
        url: `/api/transactions/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, error, arg) =>
        error
          ? []
          : [
              { type: "Transaction", id: "LIST" },
              { type: "Transaction", id: arg },
            ],
    }),

    completeTransaction: builder.mutation<CompleteTransactionResponse, string>({
      query: (id) => ({
        url: `/api/transactions/${id}/complete/`,
        method: "POST",
      }),
      invalidatesTags: (_result, error, arg) =>
        error
          ? []
          : [
              { type: "Transaction", id: "LIST" },
              { type: "Transaction", id: arg },
            ],
    }),

    rejectTransaction: builder.mutation<
      RejectTransactionResponse,
      { id: string; data: RejectTransactionRequest }
    >({
      query: ({ id, data }) => ({
        url: `/api/transactions/${id}/reject/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, error, arg) =>
        error
          ? []
          : [
              { type: "Transaction", id: "LIST" },
              { type: "Transaction", id: arg.id },
            ],
    }),
    importTransaction: builder.mutation<any, { file: File }>({
      query: ({ file }) => {
        const formdata = new FormData();
        formdata.append("file", file);
        return {
          url: `/api/transactions/bulk-import/`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: (_result, error, _arg) =>
        error ? [] : [{ type: "Transaction", id: "LIST" }],
    }),
  }),
});

export const {
  useTransactionListQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useLazyTransactionQuery,
  useTransactionQuery,
  useCompleteTransactionMutation,
  useRejectTransactionMutation,
  useImportTransactionMutation,
} = transactionService;
