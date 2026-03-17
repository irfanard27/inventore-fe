import type { InventoryFilterParams } from "@/interface/inventory";
import { store } from "@/redux";
import { useGetCategoryListQuery } from "@/redux/api-service/category-service";
import { useGetWarehouseListQuery } from "@/redux/api-service/warehouse-service";
import { setFilter } from "@/redux/slices/inventory-slice";
import { Button, Form, Input, Select } from "antd";

export default function InventoryFilter() {
  const [form] = Form.useForm();

  // get category list
  const { data: categoryList } = useGetCategoryListQuery();
  const { data: warehouseList } = useGetWarehouseListQuery();

  const onFilter = (values: InventoryFilterParams) => {
    store.dispatch(setFilter(values));
  };

  return (
    <Form form={form} layout="inline" onFinish={onFilter}>
      <Form.Item name={"search"}>
        <Input placeholder="Search SKU, Name" />
      </Form.Item>
      <Form.Item name={"category_id"}>
        <Select
          placeholder="Category"
          options={categoryList?.categories?.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
      </Form.Item>
      <Form.Item name={"warehouse_id"}>
        <Select
          placeholder="Warehouse"
          options={warehouseList?.warehouses?.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Search</Button>
      </Form.Item>
    </Form>
  );
}
