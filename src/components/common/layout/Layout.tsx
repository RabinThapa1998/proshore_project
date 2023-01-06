import React, { useState } from 'react';
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
          padding: '0 1.25rem',
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
      <Content className='site-layout-background h-full'>{children}</Content>
    </Layout>
  );
};
