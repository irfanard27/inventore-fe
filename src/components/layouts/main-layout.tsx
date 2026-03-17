import { Layout } from "antd";
import { useEffect } from "react";
import HeaderTop from "./header-top";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const checkToken = () => {
    const token = localStorage.getItem("access_token");
    if (token === undefined) {
      window.location.href = "/auth/login";
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header style={{ background: "#fff" }} className="shadow">
        <HeaderTop />
      </Layout.Header>
      <Layout.Content style={{ padding: "24px" }}>{children}</Layout.Content>
    </Layout>
  );
};
