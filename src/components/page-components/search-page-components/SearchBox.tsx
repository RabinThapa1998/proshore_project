import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Form, Input, Button } from 'antd';
import { Box, Heading } from '~/components/common';
import { request } from '~/util/request';
import { SearchResultContext } from '~/components/context';
import { IQueryParams } from '~/types/IQueryParams';
import { search } from '~/services';
export function SearchBox() {
  const searchDispatch = useContext(SearchResultContext);

  const order = ['desc', 'asc'];
  const sort = ['', 'stars', 'forks', 'updated'];

  const [queries, setQueries] = useState<IQueryParams>({
    query: '',
    page: 1,
    per_page: 10,
    order: 'desc',
    sort: '',
  });
  const { data } = useQuery(
    ['search', queries],
    () =>
      search.getSearchQuery({
        ...queries,
      }),
    {
      enabled: queries.query !== '',
      onSuccess: (res) => {
        console.log('🚀 ~ file: SearchBox.tsx:41 ~ SearchBox ~ res', res);
        if (res)
          searchDispatch({
            payload: {
              incomplete_results: res.incomplete_results,
              items: res.items,
              total_count: res.total_count,
            },
          });
      },
    },
  );
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
    <>
      <Box direction='row' justify='start' align='center'>
        <Form
          name='basic'
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
    </>
  );
}
