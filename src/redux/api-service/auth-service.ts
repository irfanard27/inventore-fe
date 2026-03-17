import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../../interface/auth";
import { baseApi } from "./base";

export const authService = createApi({
  baseQuery: baseApi,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/api/auth/login/",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_queryArgument, { queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          if (data.data) {
            localStorage.setItem("token", data.data.access_token);
          }
        } catch {
          console.error("Login failed");
        }
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "/api/auth/register/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authService;
