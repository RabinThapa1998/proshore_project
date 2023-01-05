import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Heading, Box } from '~/components/common';
import { Button, Checkbox, Form, Input } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { request } from '~/util/request';

const { Header, Sider, Content } = Layout;

export const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const order = ['desc', 'asc'];
  const sort = ['', 'stars', 'forks', 'updated'];

  const [queries, setQueries] = useState({
    query: '',
    page: 1,
    per_page: 10,
    order: 'desc',
    sort: '',
  });
  const { data: searchData } = useQuery(
    ['search', queries],
    () =>
      request({
        url: `/search/repositories?q=${queries}&page=${queries.page}&per_page=${queries.per_page}&order=${queries.order}&sort=${queries.sort}`,
        method: 'GET',
      }),
    {
      enabled: queries.query !== '',
    },
  );
  console.log('🚀 ~ file: Layout.tsx:22 ~ LayoutComponent ~ searchData', searchData);
  const [collapsed, setCollapsed] = useState(false);
  const onFinish = (values: any) => {
    setQueries((prev) => ({
      ...prev,
      query: values.query,
    }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Layout className='h-screen'>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
        style={{
          background: 'white',
        }}
      >
        <Heading className=' text-center py-5 mt-5'>Github Search</Heading>
        <Box direction='row' justify='start' align='center'>
          <Heading component='h4'>Search</Heading>

          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            layout='vertical'
          >
            <Form.Item
              label='Repository name'
              name='query'
              rules={[{ required: true, message: 'Please enter!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' type='primary'>
                Search
              </Button>
            </Form.Item>
          </Form>
        </Box>
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
