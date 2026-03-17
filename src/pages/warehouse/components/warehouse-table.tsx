import type { Warehouse } from "@/interface/warehouse";
import { useGetWarehouseListQuery } from "@/redux/api-service/warehouse-service";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import type { ColumnType } from "antd/es/table";

export default function WarehouseTable() {
  const { data: warehouseData, isLoading } = useGetWarehouseListQuery();
  const warehouses = warehouseData?.warehouses || [];

  const [modal, modalContext] = Modal.useModal();

  const onDelete = (id: string) => {
    modal.confirm({
      title: "Delete Warehouse",
      content: "Are you sure you want to delete this warehouse?",
      onOk: () => {
        // TODO: Implement delete functionality
        console.log("Delete warehouse:", id);
      },
    });
  };

  const renderDeleteButton = (id: string) => {
    return (
      <Button key={id} icon={<DeleteOutlined />} onClick={() => onDelete(id)} />
    );
  };

  const columns: ColumnType<Warehouse>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <Space>{renderDeleteButton(record.id)}</Space>,
    },
  ];

  return (
    <>
      <Table
        dataSource={warehouses}
        loading={isLoading}
        rowKey="id"
        columns={columns}
      />
      {modalContext}
    </>
  );
}
