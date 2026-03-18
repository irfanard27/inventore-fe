import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Modal, Form, Input, notification } from "antd";
import {
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
} from "@/redux/api-service/warehouse-service";

export interface WarehouseFormRef {
  open: (id?: string) => void;
}

const WarehouseForm = forwardRef<WarehouseFormRef, unknown>((_props, ref) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [hasId, setHasId] = useState<undefined | string>(undefined);
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null);

  const [_createWarehouse, { isLoading: isCreating }] =
    useCreateWarehouseMutation();
  const [_updateWarehouse, { isLoading: isUpdating }] =
    useUpdateWarehouseMutation();

  useImperativeHandle(ref, () => ({
    open: (id?: string) => {
      setVisible(true);
      if (id) {
        setHasId(id);
        // For now, we'll need to find the warehouse from the existing list
        // In a real implementation, you might want to add a get single warehouse endpoint
        // For demo purposes, we'll assume the warehouse data is passed or fetched
      }
    },
  }));

  const onClose = () => {
    setVisible(false);
    form.resetFields();
    setHasId(undefined);
    setEditingWarehouse(null);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (hasId) {
        _updateWarehouse({ id: hasId, ...values })
          .unwrap()
          .then(() => {
            notification.success({
              message: "Success",
              description: "Warehouse updated successfully",
            });
            onClose();
          })
          .catch((error) => {
            notification.error({
              message: "Update failed",
              description: error?.data?.message || "Failed to update warehouse",
            });
          });
      } else {
        _createWarehouse(values)
          .unwrap()
          .then(() => {
            notification.success({
              message: "Success",
              description: "Warehouse created successfully",
            });
            onClose();
          })
          .catch((error) => {
            notification.error({
              message: "Create failed",
              description: error?.data?.message || "Failed to create warehouse",
            });
          });
      }
    });
  };

  useEffect(() => {
    if (editingWarehouse) {
      form.setFieldsValue(editingWarehouse);
    }
  }, [editingWarehouse, form]);

  return (
    <Modal
      title={hasId ? "Edit Warehouse" : "Add Warehouse"}
      open={visible}
      onCancel={onClose}
      width={600}
      onOk={handleSubmit}
      okButtonProps={{
        loading: isCreating || isUpdating,
      }}
    >
      <Form form={form} layout="vertical" name="warehouseForm">
        <Form.Item
          name="name"
          label="Warehouse Name"
          rules={[
            { required: true, message: "Please input warehouse name!" },
            {
              max: 100,
              message: "Warehouse name cannot exceed 100 characters!",
            },
          ]}
        >
          <Input placeholder="Enter warehouse name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              max: 500,
              message: "Description cannot exceed 500 characters!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter warehouse description (optional)"
            rows={4}
            maxLength={500}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

WarehouseForm.displayName = "WarehouseForm";

export default WarehouseForm;
