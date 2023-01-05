import React, { useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { Box, Heading } from '~/components/common';
import { useSearchHandler } from '~/components/hooks';

export function SearchBox() {
  const { onQuerySubmit, isFetching } = useSearchHandler();
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Box direction='row' justify='start' align='center'>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onQuerySubmit}
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
        {isFetching ? <Heading>Loading...</Heading> : null}
      </Box>
    </>
  );
}
