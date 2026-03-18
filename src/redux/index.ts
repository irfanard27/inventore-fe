import { configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { authService } from "./api-service/auth-service";
import { inventoryService } from "./api-service/inventory-service";
import { categoryService } from "./api-service/category-service";
import { warehouseService } from "./api-service/warehouse-service";
import { transactionService } from "./api-service/transaction-service";
import inventoryReducer from "./slices/inventory-slice";
import transactionReducer from "./slices/transaction-slice";
import { dashboardService } from "./api-service/dashboard-service";

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [inventoryService.reducerPath]: inventoryService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [warehouseService.reducerPath]: warehouseService.reducer,
    [transactionService.reducerPath]: transactionService.reducer,
    [dashboardService.reducerPath]: dashboardService.reducer,
    transactionState: transactionReducer,
    inventoryState: inventoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authService.middleware,
      inventoryService.middleware,
      categoryService.middleware,
      warehouseService.middleware,
      transactionService.middleware,
      dashboardService.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
