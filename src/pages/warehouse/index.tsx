import { MainLayout } from "@/components/layouts/main-layout";
import { Button, Flex, Space } from "antd";
import WarehouseTable from "./components/warehouse-table";

export default function Warehouse() {
  return (
    <MainLayout>
      <Flex justify="center">
        <div style={{ width: 1000 }}>
          <Flex vertical gap={16}>
            <Flex justify="space-between" align="center">
              <h2>Warehouse List</h2>

              <Space>
                <Button type="primary">
                  Create Warehouse
                </Button>
              </Space>
            </Flex>

            <WarehouseTable />
          </Flex>
        </div>
      </Flex>
    </MainLayout>
  );
}
