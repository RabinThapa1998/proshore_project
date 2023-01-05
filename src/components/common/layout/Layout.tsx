import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Heading } from '~/components/common/typography';
const { Header, Sider, Content } = Layout;

export const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Heading className='text-white text-center py-5 mt-5'>Github Search</Heading>
      </Sider>
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
          <p className='text-lg'>hello</p>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
