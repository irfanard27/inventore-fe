import { Menu } from "antd";

export default function HeaderTop() {
  return (
    <Menu
      theme="light"
      mode="horizontal"
      items={[
        {
          label: "Home",
          key: "home",
        },
        {
          label: "Inventory",
          key: "inventory",
          onClick: () => (window.location.href = "/inventory"),
        },
        {
          label: "Transactions",
          key: "transaction",
          onClick: () => (window.location.href = "/transactions"),
        },
        {
          label: "Warehouse",
          key: "warehouse",
          onClick: () => (window.location.href = "/warehouse"),
        },
        {
          label: "Category",
          key: "category",
          onClick: () => (window.location.href = "/category"),
        },
      ]}
    />
  );
}
