import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  notification,
  Select,
  Row,
  Col,
} from "antd";
import {
  useCreateInventoryMutation,
  useLazyInventoryQuery,
  useUpdateInventoryMutation,
} from "@/redux/api-service/inventory-service";
import { useGetCategoryListQuery } from "@/redux/api-service/category-service";
import { useGetWarehouseListQuery } from "@/redux/api-service/warehouse-service";

export interface InventoryFormRef {
  open: (id?: string) => void;
}

const InventoryForm = forwardRef<InventoryFormRef, unknown>((_props, ref) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [hasId, setHasId] = useState<undefined | string>(undefined);

  const [_createInventory, { isLoading: isCreating }] =
    useCreateInventoryMutation();
  const [_updateInventory, { isLoading: isUpdating }] =
    useUpdateInventoryMutation();
  const [_getInventory, { data: inventoryData }] = useLazyInventoryQuery();

  // get category list
  const { data: categoryList } = useGetCategoryListQuery();
  const { data: warehouseList } = useGetWarehouseListQuery();

  useImperativeHandle(ref, () => ({
    open: (id?: string) => {
      setVisible(true);
      if (id) {
        setHasId(id);
        _getInventory(id);
      }
    },
  }));

  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (hasId) {
        _updateInventory({ id: hasId, ...values })
          .unwrap()
          .then(() => {
            onClose();
          })
          .catch((error) => {
            notification.error({
              message: "Update failed",
              description: error?.data?.message || "Failed to update inventory",
            });
          });
        // TODO: Call update API
      } else {
        _createInventory(values)
          .unwrap()
          .then(() => {
            onClose();
          })
          .catch((error) => {
            notification.error({
              message: "Create failed",
              description: error?.data?.message || "Failed to create inventory",
            });
          });
        // TODO: Call create API
      }
    });
  };

  useEffect(() => {
    if (inventoryData) {
      form.setFieldsValue(inventoryData.inventory);
    }
  }, [inventoryData]);

  return (
    <Modal
      title={hasId ? "Edit Inventory" : "Add Inventory"}
      open={visible}
      onCancel={onClose}
      width={600}
      onOk={handleSubmit}
      okButtonProps={{
        loading: isCreating || isUpdating,
      }}
    >
      <Form form={form} layout="vertical" name="inventoryForm">
        <Form.Item
          name="sku"
          label="SKU"
          rules={[
            { required: true, message: "Please input SKU!" },
            { max: 50, message: "SKU cannot exceed 50 characters!" },
          ]}
        >
          <Input placeholder="Enter SKU" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please input product name!" },
            {
              max: 200,
              message: "Product name cannot exceed 200 characters!",
            },
          ]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="category" label="Category">
              <Select
                placeholder="Select category"
                options={categoryList?.categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="warehouse" label="Warehouse">
              <Select
                placeholder="Select warehouse"
                options={warehouseList?.warehouses.map((warehouse) => ({
                  label: warehouse.name,
                  value: warehouse.id,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="quantity_on_hand"
          label="Quantity on Hand"
          rules={[
            { required: true, message: "Please input quantity!" },
            {
              type: "number",
              min: 0,
              message: "Quantity must be non-negative!",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter quantity"
            min={0}
            precision={0}
          />
        </Form.Item>

        <Form.Item
          name="reorder_threshold"
          label="Reorder Threshold"
          rules={[
            { required: true, message: "Please input reorder threshold!" },
            {
              type: "number",
              min: 0,
              message: "Reorder threshold must be non-negative!",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter reorder threshold"
            min={0}
            precision={0}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

InventoryForm.displayName = "InventoryForm";

export default InventoryForm;
