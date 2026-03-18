import { createBrowserRouter } from "react-router";
import { Login } from "@/pages/auth/login";

import Inventory from "@/pages/inventory";
import Warehouse from "@/pages/warehouse";
import Category from "@/pages/category";
import Transactions from "@/pages/transactions";
import Dashboard from "@/pages/dashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/auth/login",
    Component: Login,
  },

  {
    path: "/inventory",
    Component: Inventory,
  },
  {
    path: "/warehouse",
    Component: Warehouse,
  },
  {
    path: "/category",
    Component: Category,
  },
  {
    path: "/transactions",
    Component: Transactions,
  },
]);
