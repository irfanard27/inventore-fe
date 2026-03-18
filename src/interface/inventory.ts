export interface Inventory {
  id: string;
  sku: string;
  name: string;
  category: string;
  category_name: string;
  warehouse: string;
  warehouse_name: string;
  quantity_on_hand: number;
  reorder_threshold: number;
  stock_status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInventoryRequest extends Omit<
  Inventory,
  "stock_status" | "warehouse_name" | "category_name"
> {
  // Additional properties can be added here if needed
}

export interface UpdateInventoryRequest extends CreateInventoryRequest {
  id: string;
}

export interface CreateAndUpdateInventoryResponse {
  massage: string;
}

export interface InventoryListResponse {
  count: number;
  results: {
    inventory: Inventory[];
  };
}

export interface InventoryResponse {
  message: string;
  inventory: Inventory;
}

export interface InventoryFilterParams {
  page: number;
  search?: string;
  category_id?: string;
  warehouse_id?: string;
  stock_status?: string;
}
