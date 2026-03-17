import { createBrowserRouter } from "react-router";
import { Login } from "@/pages/auth/login";
import Home from "@/pages/home";
import Inventory from "@/pages/inventory";
import Warehouse from "@/pages/warehouse";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: Home,
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
]);
