import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout className='site-layout'>
      <Header
        style={{
          padding: 0,
        }}
      >
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              label: 'Home',
              onClick: () => navigate('/'),
            },
            {
              key: '2',
              label: 'Details',
              onClick: () => navigate('/:id'),
            },
          ]}
        />
      </Header>
      <Content className='site-layout-background'>{children}</Content>
    </Layout>
  );
};
