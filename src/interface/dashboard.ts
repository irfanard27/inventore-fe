// Simple Dashboard Types

export interface DashboardResponse {
  message: string;
  data: DashboardData;
}

export interface DashboardData {
  item_count_by_category: CategoryItem[];
  quantity_distribution: CategoryItem[];
  stock_status_overview: StockStatus[];
  warehouse_summary: Warehouse[];
  top_items: Item[];
  total_items: number;
  total_quantity: number;
}

export interface CategoryItem {
  category: string;
  count: number;
  total_quantity: number;
  avg_quantity?: number;
}

export interface StockStatus {
  status: "in_stock" | "low_stock" | "out_of_stock";
  count: number;
}

export interface Warehouse {
  name: string;
  total_items: number;
  total_quantity: number;
  low_stock_count: number;
  out_of_stock_count: number;
}

export interface Item {
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  quantity: number;
  reorder_threshold: number;
}
