import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseApi = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  validateStatus: (response) => {
    if (response.status === 200 || response.status === 201) {
      return true;
    }

    if (response.status === 401) {
      localStorage.removeItem("token");
    }

    return false;
  },
});
