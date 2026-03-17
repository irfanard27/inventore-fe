import { MainLayout } from "@/components/layouts/main-layout";
import { Button, Flex, Space } from "antd";
import InventoryTable from "./components/inventory-table";
import InventoryForm from "./components/inventory-form";
import { useRef } from "react";
import type { InventoryFormRef } from "./components/inventory-form";
import InventoryFilter from "./components/inventory-filter";

export default function Inventory() {
  const inventoryFormRef = useRef<InventoryFormRef>(null);

  const handleCreateInventory = (id?: string) => {
    inventoryFormRef.current?.open(id);
  };

  return (
    <MainLayout>
      <Flex justify="center">
        <div style={{ width: 1000 }}>
          <Flex vertical gap={16}>
            <Flex justify="space-between" align="center">
              <h2>Inventory List</h2>

              <Space>
                <Button type="primary" onClick={() => handleCreateInventory()}>
                  Create Inventory
                </Button>
              </Space>
            </Flex>

            <InventoryFilter />

            <InventoryTable onEdit={handleCreateInventory} />
          </Flex>
        </div>
      </Flex>

      <InventoryForm ref={inventoryFormRef} />
    </MainLayout>
  );
}
