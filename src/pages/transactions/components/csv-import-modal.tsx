import { useState } from "react";
import {
  Modal,
  Upload,
  Button,
  Typography,
  Alert,
  Flex,
  Statistic,
  Row,
  Col,
} from "antd";
import { InboxOutlined, ReloadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useImportTransactionMutation } from "@/redux/api-service/transaction-service";
import type { BulkImportResponse } from "@/interface/transaction";
import ImportResultsTable from "./import-results-table";

const { Dragger } = Upload;
const { Title, Text } = Typography;

interface CsvImportModalProps {
  visible: boolean;
  onClose: () => void;
}

const CsvImportModal: React.FC<CsvImportModalProps> = ({
  visible,
  onClose,
}) => {
  const [_uploadCsv, { isLoading }] = useImportTransactionMutation();
  const [importResult, setImportResult] = useState<BulkImportResponse | null>(
    null,
  );

  const handleFileUpload = (file: File) => {
    _uploadCsv({ file })
      .unwrap()
      .then((result: BulkImportResponse) => {
        setImportResult(result);
      })
      .catch((error) => {
        console.error("Import failed:", error);
      });
    return false;
  };

  const handleReset = () => {
    setImportResult(null);
  };

  const uploadProps: UploadProps = {
    accept: ".csv",
    beforeUpload: handleFileUpload,
    disabled: isLoading,
  };

  return (
    <Modal
      title="Import Transactions from CSV"
      open={visible}
      onCancel={onClose}
      width={700}
      footer={
        importResult ? (
          <Flex gap={8}>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              Upload Another File
            </Button>
            <Button onClick={onClose}>Close</Button>
          </Flex>
        ) : null
      }
    >
      <div style={{ padding: "20px 0" }}>
        {!importResult ? (
          <>
            <Title level={5}>CSV Format Requirements:</Title>
            <Text>Your CSV file should include the following columns:</Text>
            <ul style={{ textAlign: "left", display: "inline-block" }}>
              <li>
                <Text code>inventory_sku</Text> (required) - The SKU of the
                inventory item
              </li>
              <li>
                <Text code>transaction_type</Text> (required) - Must be:
                adjustment, sale, or restock
              </li>
              <li>
                <Text code>quantity</Text> (required) - Must be a positive
                number
              </li>
              <li>
                <Text code>warehouse</Text> (optional) - Warehouse name
              </li>
              <li>
                <Text code>notes</Text> (optional) - Transaction notes
              </li>
            </ul>

            <Dragger {...uploadProps} style={{ marginTop: "20px" }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag CSV file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for CSV file upload only
              </p>
            </Dragger>
          </>
        ) : (
          <Flex vertical gap={20}>
            <Alert
              title={importResult.message}
              type={
                importResult.summary.accepted_rows > 0 ? "success" : "error"
              }
              showIcon
            />

            <Row gutter={16}>
              <Col span={6}>
                <Statistic
                  title="Total Rows"
                  value={importResult.summary.total_rows}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Accepted"
                  value={importResult.summary.accepted_rows}
                  styles={{ content: { color: "#3f8600" } }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Rejected"
                  value={importResult.summary.rejected_rows}
                  styles={{ content: { color: "#cf1322" } }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Success Rate"
                  value={importResult.summary.success_rate}
                  styles={{ content: { color: "#1890ff" } }}
                />
              </Col>
            </Row>

            {importResult.errors.length > 0 && (
              <ImportResultsTable results={importResult} />
            )}
          </Flex>
        )}
      </div>
    </Modal>
  );
};

export default CsvImportModal;
