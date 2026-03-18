import { MainLayout } from "@/components/layouts/main-layout";
import { Button, Flex, Space } from "antd";
import WarehouseTable from "./components/warehouse-table";
import WarehouseForm from "./components/warehouse-form";
import { useRef } from "react";
import type { WarehouseFormRef } from "./components/warehouse-form";

export default function Warehouse() {
  const warehouseFormRef = useRef<WarehouseFormRef>(null);

  const handleCreateWarehouse = (id?: string) => {
    warehouseFormRef.current?.open(id);
  };

  return (
    <MainLayout>
      <Flex justify="center">
        <div style={{ width: 1000 }}>
          <Flex vertical gap={16}>
            <Flex justify="space-between" align="center">
              <h2>Warehouse List</h2>

              <Space>
                <Button type="primary" onClick={() => handleCreateWarehouse()}>
                  Create Warehouse
                </Button>
              </Space>
            </Flex>

            <WarehouseTable onEdit={handleCreateWarehouse} />
          </Flex>
        </div>
      </Flex>

      <WarehouseForm ref={warehouseFormRef} />
    </MainLayout>
  );
}
