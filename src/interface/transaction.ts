export interface Transaction {
  id: number;
  inventory: number;
  inventory_sku: string;
  inventory_name: string;
  warehouse_name: string;
  transaction_type: string;
  quantity: number;
  timestamp: string;
  notes: string;
  status: string;
  rejection_reason: string | null;
  is_editable: boolean;
  can_be_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TransactionListResponse {
  results: Transaction[];
  count: number;
}
