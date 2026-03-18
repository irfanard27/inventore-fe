import type { Inventory, InventoryFilterParams } from "@/interface/inventory";

import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  inventories: Inventory[];
  filter: InventoryFilterParams;
  pagination: {
    pageSize: number;
    total: number;
  };
}

const initialState: InitialState = {
  inventories: [],
  filter: {
    page: 1,
  },
  pagination: {
    pageSize: 10,
    total: 0,
  },
};
const inventorySlice = createSlice({
  name: "inventorySlice",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setInventories: (state, action) => {
      state.inventories = action.payload;
    },

    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
});

export const { setFilter, setInventories, setPagination } =
  inventorySlice.actions;
export default inventorySlice.reducer;
