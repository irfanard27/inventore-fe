import { MainLayout } from "@/components/layouts/main-layout";
import { Button, Flex, Space } from "antd";
import CategoryTable from "./components/category-table";
import CategoryForm from "./components/category-form";
import { useRef } from "react";
import type { CategoryFormRef } from "./components/category-form";

export default function Category() {
  const categoryFormRef = useRef<CategoryFormRef>(null);

  const handleCreateCategory = (id?: string) => {
    categoryFormRef.current?.open(id);
  };

  return (
    <MainLayout>
      <Flex justify="center">
        <div style={{ width: 1000 }}>
          <Flex vertical gap={16}>
            <Flex justify="space-between" align="center">
              <h2>Category List</h2>

              <Space>
                <Button type="primary" onClick={() => handleCreateCategory()}>
                  Create Category
                </Button>
              </Space>
            </Flex>

            <CategoryTable onEdit={handleCreateCategory} />
          </Flex>
        </div>
      </Flex>

      <CategoryForm ref={categoryFormRef} />
    </MainLayout>
  );
}
