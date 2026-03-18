export interface Warehouse {
  id: string;
  name: string;
  description?: string;
}

export interface WarehouseList {
  warehouses: Warehouse[];
  message: string;
}

export interface CreateWarehouseRequest {
  name: string;
  description?: string;
}

export interface CreateWarehouseResponse {
  message: string;
  warehouse: Warehouse;
}

export interface UpdateWarehouseRequest extends CreateWarehouseRequest {
  id: string;
}

export interface UpdateWarehouseResponse {
  message: string;
  warehouse: Warehouse;
}

export interface DeleteWarehouseResponse {
  message: string;
}
