import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  Modal,
  Form,
  InputNumber,
  notification,
  Select,
  Input,
  Row,
  Col,
} from "antd";
import {
  useCreateTransactionMutation,
  useLazyTransactionQuery,
  useUpdateTransactionMutation,
} from "@/redux/api-service/transaction-service";
import { useInventoryListQuery } from "@/redux/api-service/inventory-service";
import { useGetWarehouseListQuery } from "@/redux/api-service/warehouse-service";

export interface TransactionFormRef {
  open: (id?: string) => void;
}

const TransactionForm = forwardRef<TransactionFormRef, unknown>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [hasId, setHasId] = useState<undefined | string>(undefined);

    const [_createTransaction, { isLoading: isCreating }] =
      useCreateTransactionMutation();
    const [_updateTransaction, { isLoading: isUpdating }] =
      useUpdateTransactionMutation();
    const [_getTransaction, { data: transactionData }] =
      useLazyTransactionQuery();

    // get inventory and warehouse lists
    const { data: inventoryList } = useInventoryListQuery({ page: 1 });
    const { data: warehouseList } = useGetWarehouseListQuery();

    useImperativeHandle(ref, () => ({
      open: (id?: string) => {
        setVisible(true);
        if (id) {
          setHasId(id);
          _getTransaction(id);
        }
      },
    }));

    const onClose = () => {
      setVisible(false);
      form.resetFields();
      setHasId(undefined);
    };

    const handleSubmit = () => {
      form.validateFields().then((values) => {
        if (hasId) {
          _updateTransaction({ id: parseInt(hasId), ...values })
            .unwrap()
            .then(() => {
              notification.success({
                message: "Success",
                description: "Transaction updated successfully",
              });
              onClose();
            })
            .catch((error) => {
              notification.error({
                message: "Update failed",
                description:
                  error?.data?.message || "Failed to update transaction",
              });
            });
        } else {
          _createTransaction(values)
            .unwrap()
            .then(() => {
              notification.success({
                message: "Success",
                description: "Transaction created successfully",
              });
              onClose();
            })
            .catch((error) => {
              notification.error({
                message: "Create failed",
                description:
                  error?.data?.message || "Failed to create transaction",
              });
            });
        }
      });
    };

    useEffect(() => {
      if (transactionData) {
        form.setFieldsValue(transactionData.transaction);
      }
    }, [transactionData, form]);

    return (
      <Modal
        title={hasId ? "Edit Transaction" : "Add Transaction"}
        open={visible}
        onCancel={onClose}
        width={600}
        onOk={handleSubmit}
        okButtonProps={{
          loading: isCreating || isUpdating,
        }}
      >
        <Form form={form} layout="vertical" name="transactionForm">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="inventory_id"
                label="Inventory"
                rules={[
                  { required: true, message: "Please select inventory!" },
                ]}
              >
                <Select
                  placeholder="Select inventory"
                  options={inventoryList?.results.inventory.map(
                    (inventory: { id: string; name: string; sku: string }) => ({
                      label: `${inventory.name} (${inventory.sku})`,
                      value: inventory.id,
                    }),
                  )}
                  showSearch={{
                    filterOption: (input, option) =>
                      String(option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase()),
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="transaction_type"
                label="Transaction Type"
                rules={[
                  {
                    required: true,
                    message: "Please select transaction type!",
                  },
                ]}
              >
                <Select
                  placeholder="Select transaction type"
                  options={[
                    {
                      label: "ADJUSTMENT",
                      value: "adjustment",
                    },
                    {
                      label: "SALE",
                      value: "sale",
                    },
                    {
                      label: "RESTOCK",
                      value: "restock",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                  { required: true, message: "Please input quantity!" },
                  {
                    type: "number",
                    min: 1,
                    message: "Quantity must be at least 1!",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter quantity"
                  min={1}
                  precision={0}
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
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="notes"
            label="Notes"
            rules={[
              { max: 500, message: "Notes cannot exceed 500 characters!" },
            ]}
          >
            <Input.TextArea
              placeholder="Enter notes (optional)"
              rows={3}
              maxLength={500}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  },
);

TransactionForm.displayName = "TransactionForm";

export default TransactionForm;
