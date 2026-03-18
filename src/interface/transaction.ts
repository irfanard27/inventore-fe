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
  results: { transactions: Transaction[] };
  count: number;
}

export interface TransactionFilterParams {
  page?: number;
  page_size?: number;
  search?: string;
  transaction_type?: string;
  status?: string;
  inventory?: string;
  warehouse?: string;
  start_date?: string;
  end_date?: string;
}

export interface CreateTransactionRequest {
  inventory: number;
  transaction_type: string;
  quantity: number;
  notes?: string;
  warehouse?: number;
}

export interface UpdateTransactionRequest {
  id: number;
  inventory?: number;
  transaction_type?: string;
  quantity?: number;
  notes?: string;
  warehouse?: number;
}

export interface CreateAndUpdateTransactionResponse {
  id: number;
  message: string;
  transaction: Transaction;
}

export interface TransactionResponse {
  transaction: Transaction;
}

export interface DeleteTransactionResponse {
  message: string;
}

export interface CompleteTransactionResponse {
  message: string;
  transaction: Transaction;
}

export interface RejectTransactionRequest {
  rejection_reason: string;
}

export interface RejectTransactionResponse {
  message: string;
  transaction: Transaction;
}

export interface BulkImportResponse {
  message: string;
  summary: {
    total_rows: number;
    accepted_rows: number;
    rejected_rows: number;
    success_rate: string;
  };
  errors: Array<{
    row: number;
    field: string;
    message: string;
  }>;
}
