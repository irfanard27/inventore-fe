import type { Inventory, InventoryFilterParams } from "@/interface/inventory";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  inventories: Inventory[];
  filter: InventoryFilterParams;
}

const initialState: InitialState = {
  inventories: [],
  filter: {
    page: 1,
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
  },
});

export const { setFilter, setInventories } = inventorySlice.actions;
export default inventorySlice.reducer;
