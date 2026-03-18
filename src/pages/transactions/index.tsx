import { useRef, useState } from "react";
import { Button, Card, Space } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TransactionTable from "./components/transaction-table";
import TransactionForm, {
  type TransactionFormRef,
} from "./components/transaction-form";
import CsvImportModal from "./components/csv-import-modal";
import { MainLayout } from "@/components/layouts/main-layout";

export default function Transactions() {
  const transactionFormRef = useRef<TransactionFormRef>(null);
  const [csvImportVisible, setCsvImportVisible] = useState(false);

  const handleAddTransaction = () => {
    transactionFormRef.current?.open();
  };

  const handleEditTransaction = (id: string) => {
    transactionFormRef.current?.open(id);
  };

  const handleCsvImport = () => {
    setCsvImportVisible(true);
  };

  const handleCloseCsvImport = () => {
    setCsvImportVisible(false);
  };

  return (
    <MainLayout>
      <Card
        title="Transactions"
        extra={
          <Space>
            <Button icon={<UploadOutlined />} onClick={handleCsvImport}>
              Import CSV
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddTransaction}
            >
              Add Transaction
            </Button>
          </Space>
        }
      >
        <TransactionTable onEdit={handleEditTransaction} />
      </Card>

      <TransactionForm ref={transactionFormRef} />
      <CsvImportModal
        visible={csvImportVisible}
        onClose={handleCloseCsvImport}
      />
    </MainLayout>
  );
}
