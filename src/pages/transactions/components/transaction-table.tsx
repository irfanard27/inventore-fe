import type { Transaction } from "@/interface/transaction";
import { store, useAppSelector } from "@/redux";
import {
  useDeleteTransactionMutation,
  useTransactionListQuery,
  useCompleteTransactionMutation,
  useRejectTransactionMutation,
} from "@/redux/api-service/transaction-service";
import { setTransactionFilters } from "@/redux/slices/transaction-slice";
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Table, Tag, Input, message } from "antd";
import type { ColumnType } from "antd/es/table";
import { useState } from "react";
import dayjs from "dayjs";

interface TransactionTableProps {
  onEdit: (id: string) => void;
}

export default function TransactionTable({ onEdit }: TransactionTableProps) {
  const transactionState = useAppSelector((state) => state.transactionState);
  const data = transactionState.transactions;
  const [rejectionModalVisible, setRejectionModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(
    null,
  );
  const [rejectionReason, setRejectionReason] = useState("");

  const { isLoading } = useTransactionListQuery(transactionState.filters);

  const [modal, modalContext] = Modal.useModal();

  const [_deleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();

  const [_completeTransaction, { isLoading: isCompleting }] =
    useCompleteTransactionMutation();

  const [_rejectTransaction, { isLoading: isRejecting }] =
    useRejectTransactionMutation();

  const onDelete = (id: string) => {
    modal.confirm({
      title: "Delete Transaction",
      content: "Are you sure you want to delete this transaction?",
      onOk: () => {
        _deleteTransaction(id)
          .unwrap()
          .then(() => {
            message.success("Transaction deleted successfully");
          })
          .catch((error) => {
            message.error("Failed to delete transaction");
            console.error(error);
          });
      },
    });
  };

  const onComplete = (id: string) => {
    modal.confirm({
      title: "Complete Transaction",
      content: "Are you sure you want to complete this transaction?",
      onOk: () => {
        _completeTransaction(id)
          .unwrap()
          .then(() => {
            message.success("Transaction completed successfully");
          })
          .catch((error) => {
            message.error("Failed to complete transaction");
            console.error(error);
          });
      },
    });
  };

  const onReject = (id: string) => {
    setSelectedTransaction(id);
    setRejectionModalVisible(true);
  };

  const handleRejectConfirm = () => {
    if (!selectedTransaction || !rejectionReason.trim()) {
      message.error("Please provide a rejection reason");
      return;
    }

    _rejectTransaction({
      id: selectedTransaction,
      data: { rejection_reason: rejectionReason },
    })
      .unwrap()
      .then(() => {
        message.success("Transaction rejected successfully");
        setRejectionModalVisible(false);
        setRejectionReason("");
        setSelectedTransaction(null);
      })
      .catch((error) => {
        message.error("Failed to reject transaction");
        console.error(error);
      });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "green";
      case "pending":
        return "orange";
      case "rejected":
        return "red";
      case "cancelled":
        return "gray";
      default:
        return "blue";
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "in":
        return "green";
      case "out":
        return "red";
      case "transfer":
        return "blue";
      default:
        return "default";
    }
  };

  const columns: ColumnType<Transaction>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Inventory",
      dataIndex: "inventory_name",
      key: "inventory_name",
    },
    {
      title: "SKU",
      dataIndex: "inventory_sku",
      key: "inventory_sku",
      width: 120,
    },
    {
      title: "Warehouse",
      dataIndex: "warehouse_name",
      key: "warehouse_name",
    },
    {
      title: "Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
      width: 100,
      render: (type: string) => (
        <Tag color={getTransactionTypeColor(type)}>{type.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      render: (quantity: number, record: Transaction) => (
        <span
          style={{
            color: record.transaction_type === "OUT" ? "#ff4d4f" : "#52c41a",
          }}
        >
          {record.transaction_type === "OUT" ? "-" : "+"}
          {quantity}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "timestamp",
      key: "timestamp",
      width: 150,
      render: (timestamp: string) =>
        dayjs(timestamp).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space size="small">
          {record.is_editable && (
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit(record.id.toString())}
              size="small"
            />
          )}
          {record.can_be_completed && (
            <Button
              icon={<CheckOutlined />}
              onClick={() => onComplete(record.id.toString())}
              loading={isCompleting}
              size="small"
              type="primary"
            />
          )}
          {record.is_editable && (
            <Button
              icon={<CloseOutlined />}
              onClick={() => onReject(record.id.toString())}
              loading={isRejecting}
              size="small"
              danger
            />
          )}
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id.toString())}
            loading={isDeleting}
            size="small"
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={data || []}
        loading={isLoading}
        rowKey="id"
        columns={columns}
        pagination={{
          pageSize: 10,
          total: transactionState.pagination.total,
          current: transactionState.pagination.page,
          onChange: (page) => {
            store.dispatch(setTransactionFilters({ page }));
          },
        }}
      />

      <Modal
        title="Reject Transaction"
        open={rejectionModalVisible}
        onOk={handleRejectConfirm}
        onCancel={() => {
          setRejectionModalVisible(false);
          setRejectionReason("");
          setSelectedTransaction(null);
        }}
        confirmLoading={isRejecting}
      >
        <Input.TextArea
          placeholder="Please provide a reason for rejection..."
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          rows={4}
        />
      </Modal>

      {modalContext}
    </>
  );
}
