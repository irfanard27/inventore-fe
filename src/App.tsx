import { RouterProvider } from "react-router";
import "./App.css";
import { routes } from "./config/routes";
import { ConfigProvider } from "antd";
import { theme } from "./config/theme";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

export default App;
