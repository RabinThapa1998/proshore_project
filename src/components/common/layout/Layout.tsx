import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

export const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className='h-screen' hasSider={true}>
      <Sider trigger={null} collapsible={false} collapsed={collapsed} width={200}></Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '1.5rem 1rem',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
