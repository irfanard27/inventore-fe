import type { Category } from "@/interface/category";
import {
  useGetCategoryListQuery,
  useDeleteCategoryMutation,
} from "@/redux/api-service/category-service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import type { ColumnType } from "antd/es/table";

interface CategoryTableProps {
  onEdit: (id: string) => void;
}

export default function CategoryTable({ onEdit }: CategoryTableProps) {
  const { data: categoryData, isLoading } = useGetCategoryListQuery();
  const categories = categoryData?.categories || [];

  const [modal, modalContext] = Modal.useModal();

  const [_deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const onDelete = (id: string) => {
    modal.confirm({
      title: "Delete Category",
      content: "Are you sure you want to delete this category?",
      onOk: () => {
        _deleteCategory(id);
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

  const columns: ColumnType<Category>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => text || "-",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
        dataSource={categories}
        loading={isLoading}
        rowKey="id"
        columns={columns}
      />
      {modalContext}
    </>
  );
}
