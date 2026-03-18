import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "@/interface/transaction";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
  filters: {
    search: string;
    transaction_type: string;
    status: string;
    inventory: string;
    warehouse: string;
    start_date: string;
    end_date: string;
    page: number;
  };
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    pageSize: 10,
  },
  filters: {
    search: "",
    transaction_type: "",
    status: "",
    inventory: "",
    warehouse: "",
    start_date: "",
    end_date: "",
    page: 1,
  },
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      state.loading = false;
      state.error = null;
    },
    setTransactionPagination: (
      state,
      action: PayloadAction<{ total: number }>,
    ) => {
      state.pagination.total = action.payload.total;
    },
    setTransactionPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setTransactionPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
    },
    setTransactionFilters: (
      state,
      action: PayloadAction<Partial<TransactionState["filters"]>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetTransactionFilters: (state) => {
      state.filters = { ...initialState.filters };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id,
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    removeTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
    },
  },
});

export const {
  setTransactions,
  setTransactionPagination,
  setTransactionPage,
  setTransactionPageSize,
  setTransactionFilters,
  resetTransactionFilters,
  setLoading,
  setError,
  addTransaction,
  updateTransaction,
  removeTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
