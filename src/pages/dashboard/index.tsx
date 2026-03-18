import { Card, Row, Col, Statistic, Table, Tag, Skeleton } from "antd";
import { MainLayout } from "@/components/layouts/main-layout";
import { useGetDashboardDataQuery } from "@/redux/api-service/dashboard-service";
import {
  BarChartOutlined,
  InboxOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function Dashboard() {
  const { data: dashboardData, isLoading, error } = useGetDashboardDataQuery();

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

  const total_items = dashboardData?.data.total_items || 0;
  const total_quantity = dashboardData?.data.total_quantity || 0;

  return (
    <MainLayout>
      <div style={{ padding: "24px" }}>
        <h1>Dashboard</h1>
        <Skeleton loading={isLoading}>
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
                  styles={{ content: { color: "#cda402" } }}
                  prefix={<WarningOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Out of Stock Items"
                  value={0}
                  styles={{ content: { color: "#f5222d" } }}
                  prefix={<ExclamationCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            {/* Items by Category - Pie Chart */}
            <Col xs={24} lg={12}>
              <Card title="Items by Category">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dashboardData?.data.item_count_by_category?.map(
                        (entry, index) => ({
                          ...entry,
                          fill: [
                            "#0088FE",
                            "#00C49F",
                            "#FFBB28",
                            "#FF8042",
                            "#8884d8",
                          ][index % 5],
                        }),
                      )}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) =>
                        `${props.category || ""}: ${props.value || 0}`
                      }
                      outerRadius={80}
                      dataKey="count"
                    />
                    <Tooltip />
                    <Legend
                      formatter={(_, entry: any) => entry.payload.category}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Warehouse Summary */}
            <Col xs={24} lg={12}>
              <Card title="Warehouse Summary">
                <Table
                  dataSource={dashboardData?.data.warehouse_summary}
                  columns={warehouseColumns}
                  pagination={false}
                  size="small"
                  scroll={{ x: true }}
                  rowKey="name"
                />
              </Card>
            </Col>
          </Row>
        </Skeleton>
      </div>
    </MainLayout>
  );
}
