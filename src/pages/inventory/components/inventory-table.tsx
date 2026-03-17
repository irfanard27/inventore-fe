import type { Inventory } from "@/interface/inventory";
import { useAppSelector } from "@/redux";
import {
  useDeleteInventoryMutation,
  useInventoryListQuery,
} from "@/redux/api-service/inventory-service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import type { ColumnType } from "antd/es/table";

interface InventoryTableProps {
  onEdit: (id: string) => void;
}
export default function InventoryTable({ onEdit }: InventoryTableProps) {
  const inventoryState = useAppSelector((state) => state.inventoryState);
  const data = inventoryState.inventories;

  const { isLoading } = useInventoryListQuery(inventoryState.filter);

  const [modal, modalContext] = Modal.useModal();

  const [_deleteInventory, { isLoading: isDeleting }] =
    useDeleteInventoryMutation();

  const onDelete = (id: string) => {
    modal.confirm({
      title: "Delete Inventory",
      content: "Are you sure you want to delete this inventory?",
      onOk: () => {
        _deleteInventory(id);
      },
    });
  };

  const renderDeleteButton = (id: string) => {
    return (
      <Button
        key={id}
        icon={<DeleteOutlined />}
        onClick={() => onDelete(id)}
        loading={isDeleting}
      />
    );
  };

  const columns: ColumnType<Inventory>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Warehouse",
      dataIndex: "warehouse_name",
      key: "warehouse_name",
    },
    {
      title: "Status",
      dataIndex: "stock_status",
      key: "stock_status",
    },
    {
      title: "Qty on Hand",
      dataIndex: "quantity_on_hand",
      key: "quantity_on_hand",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record.id)} />
          {renderDeleteButton(record.id)}
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
      />
      {modalContext}
    </>
  );
}
