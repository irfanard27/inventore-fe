export interface Warehouse {
  id: string;
  name: string;
}

export interface WarehouseList {
  warehouses: Warehouse[];
  message: string;
}
