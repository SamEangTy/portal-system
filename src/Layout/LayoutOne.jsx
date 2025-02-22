import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import {useNavigate} from "react-router-dom";
const { Header, Sider, Content } = Layout;
const LayoutOne = (props) => {

  const [collapsed, setCollapsed] = useState(false);
  const Navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  

  const HandleMenu = (menu) => {
    Navigate(menu.key);
  }

  const menu = 
    [
        {
          key: '/',
          icon: <UserOutlined />,
          label: 'Dashboard',
        },
        {
          key: '/item',
          icon: <VideoCameraOutlined />,
          label: 'Item',
        },
        {
          key: '/vendor',
          icon: <UploadOutlined />,
          label: 'Vendor',
        },
        {
          key: '/customer',
          icon: <UserOutlined />,
          label: 'Customer',
        }
    ]
  
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        
        <Menu
          onClick={HandleMenu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={menu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 630,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutOne;