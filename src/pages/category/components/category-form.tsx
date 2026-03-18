import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Modal, Form, Input, notification } from "antd";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/api-service/category-service";

export interface CategoryFormRef {
  open: (id?: string) => void;
}

const CategoryForm = forwardRef<CategoryFormRef, unknown>((_props, ref) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [hasId, setHasId] = useState<undefined | string>(undefined);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const [_createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [_updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  useImperativeHandle(ref, () => ({
    open: (id?: string) => {
      setVisible(true);
      if (id) {
        setHasId(id);
        // For now, we'll need to find the category from the existing list
        // In a real implementation, you might want to add a get single category endpoint
        // For demo purposes, we'll assume the category data is passed or fetched
      }
    },
  }));

  const onClose = () => {
    setVisible(false);
    form.resetFields();
    setHasId(undefined);
    setEditingCategory(null);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (hasId) {
        _updateCategory({ id: hasId, ...values })
          .unwrap()
          .then(() => {
            notification.success({
              message: "Success",
              description: "Category updated successfully",
            });
            onClose();
          })
          .catch((error) => {
            notification.error({
              message: "Update failed",
              description: error?.data?.message || "Failed to update category",
            });
          });
      } else {
        _createCategory(values)
          .unwrap()
          .then(() => {
            notification.success({
              message: "Success",
              description: "Category created successfully",
            });
            onClose();
          })
          .catch((error) => {
            notification.error({
              message: "Create failed",
              description: error?.data?.message || "Failed to create category",
            });
          });
      }
    });
  };

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue(editingCategory);
    }
  }, [editingCategory, form]);

  return (
    <Modal
      title={hasId ? "Edit Category" : "Add Category"}
      open={visible}
      onCancel={onClose}
      width={600}
      onOk={handleSubmit}
      okButtonProps={{
        loading: isCreating || isUpdating,
      }}
    >
      <Form form={form} layout="vertical" name="categoryForm">
        <Form.Item
          name="name"
          label="Category Name"
          rules={[
            { required: true, message: "Please input category name!" },
            {
              max: 100,
              message: "Category name cannot exceed 100 characters!",
            },
          ]}
        >
          <Input placeholder="Enter category name" />
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
            placeholder="Enter category description (optional)"
            rows={4}
            maxLength={500}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

CategoryForm.displayName = "CategoryForm";

export default CategoryForm;
