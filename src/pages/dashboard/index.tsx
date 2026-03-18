import { Card, Row, Col, Statistic, Table, Tag, Progress } from "antd";
import { MainLayout } from "@/components/layouts/main-layout";
import { useGetDashboardDataQuery } from "@/redux/api-service/dashboard-service";
import {
  BarChartOutlined,
  InboxOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function Dashboard() {
  const { data: dashboardData, isLoading, error } = useGetDashboardDataQuery();

  const stockStatusColumns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap = {
          in_stock: "green",
          low_stock: "orange",
          out_of_stock: "red",
        };
        return (
          <Tag color={colorMap[status as keyof typeof colorMap]}>
            {status.replace("_", " ").toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
  ];

  const warehouseColumns = [
    {
      title: "Warehouse",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Items",
      dataIndex: "total_items",
      key: "total_items",
    },
    {
      title: "Total Quantity",
      dataIndex: "total_quantity",
      key: "total_quantity",
    },
    {
      title: "Low Stock",
      dataIndex: "low_stock_count",
      key: "low_stock_count",
      render: (count: number) => <Tag color="orange">{count}</Tag>,
    },
    {
      title: "Out of Stock",
      dataIndex: "out_of_stock_count",
      key: "out_of_stock_count",
      render: (count: number) => <Tag color="red">{count}</Tag>,
    },
  ];

  const itemColumns = [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Warehouse",
      dataIndex: "warehouse",
      key: "warehouse",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Status",
      key: "status",
      render: (record: any) => {
        if (record.quantity === 0) {
          return (
            <Tag color="red" icon={<ExclamationCircleOutlined />}>
              Out of Stock
            </Tag>
          );
        } else if (record.quantity <= record.reorder_threshold) {
          return (
            <Tag color="orange" icon={<WarningOutlined />}>
              Low Stock
            </Tag>
          );
        } else {
          return (
            <Tag color="green" icon={<InboxOutlined />}>
              In Stock
            </Tag>
          );
        }
      },
    },
  ];

  const total_items = dashboardData?.data.total_items || 0;
  const total_quantity = dashboardData?.data.total_quantity || 0;

  return (
    <MainLayout>
      <div style={{ padding: "24px" }}>
        <h1>Dashboard</h1>

        {/* Summary Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Items"
                value={total_items}
                prefix={<BarChartOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Quantity"
                value={total_quantity}
                prefix={<InboxOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Low Stock Items"
                value={0}
                valueStyle={{ color: "#faad14" }}
                prefix={<WarningOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Out of Stock Items"
                value={0}
                valueStyle={{ color: "#f5222d" }}
                prefix={<ExclamationCircleOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Charts and Tables */}
        <Row gutter={[16, 16]}>
          {/* Stock Status Overview */}
          <Col xs={24} lg={8}>
            <Card title="Stock Status Overview" style={{ height: "300px" }}>
              <Table
                dataSource={dashboardData?.stock_status_overview}
                columns={stockStatusColumns}
                pagination={false}
                size="small"
                rowKey="status"
              />
            </Card>
          </Col>

          {/* Top Items */}
          <Col xs={24} lg={16}>
            <Card title="Top Items" style={{ height: "300px" }}>
              <Table
                dataSource={dashboardData?.top_items}
                columns={itemColumns}
                pagination={false}
                size="small"
                scroll={{ x: true }}
                rowKey="sku"
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          {/* Item Count by Category */}
          <Col xs={24} lg={12}>
            <Card title="Items by Category">
              {dashboardData?.item_count_by_category?.map((category) => (
                <div key={category.category} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span>{category.category}</span>
                    <span>
                      {category.count} items ({category.total_quantity} total)
                    </span>
                  </div>
                  <Progress
                    percent={Math.round((category.count / 7) * 100)}
                    showInfo={false}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              ))}
            </Card>
          </Col>

          {/* Warehouse Summary */}
          <Col xs={24} lg={12}>
            <Card title="Warehouse Summary">
              <Table
                dataSource={dashboardData?.warehouse_summary}
                columns={warehouseColumns}
                pagination={false}
                size="small"
                scroll={{ x: true }}
                rowKey="name"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
