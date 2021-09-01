import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React, { Component, useEffect, useState } from "react";
import Table from "../components/table";
const { Header, Sider, Content } = Layout;
import router, { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";

const SiderDemo = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [collapsed, setCollased] = useState(false);
  const toggle = () => {
    setCollased(!collapsed);
  };

  const goToHome = () => {
    router.push("/");
  };
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);
  return (
    <Layout className="yo">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />} onClick={goToHome}>
            Home
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => signOut()}
            icon={<LogoutOutlined />}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {session && <h1>Welcome {session.user.name}! </h1>}
          <Table />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SiderDemo;
// ReactDOM.render(<SiderDemo />);
