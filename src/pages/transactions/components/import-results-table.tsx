import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { BulkImportResponse } from "@/interface/transaction";

const { Title } = Typography;

interface ImportResultsTableProps {
  results: BulkImportResponse;
}

interface ErrorRecord {
  key: number;
  row: number;
  field: string;
  message: string;
}

const ImportResultsTable: React.FC<ImportResultsTableProps> = ({ results }) => {
  const errorColumns: ColumnsType<ErrorRecord> = [
    {
      title: "Row",
      dataIndex: "row",
      key: "row",
      width: 80,
    },
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
      width: 120,
    },
    {
      title: "Error Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true,
    },
  ];

  const errorData: ErrorRecord[] = results.errors.map((error, index) => ({
    key: index,
    row: error.row,
    field: error.field,
    message: error.message,
  }));

  return (
    <div style={{ marginTop: "20px" }}>
      {results.errors.length > 0 && (
        <>
          <Title level={5}>Errors:</Title>
          <Table
            columns={errorColumns}
            dataSource={errorData}
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} errors`,
            }}
            scroll={{ y: 300 }}
            size="small"
            bordered
          />
        </>
      )}
    </div>
  );
};

export default ImportResultsTable;
