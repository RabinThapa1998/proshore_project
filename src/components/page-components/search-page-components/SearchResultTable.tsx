import { Tooltip, Form, Select, Table } from 'antd';
import React, { useMemo } from 'react';
import { useSearchHandler } from '~/components/hooks';
import { Tsort, Torder } from '~/types';
import { useNavigate } from 'react-router-dom';
import { Box, Body } from '~/components/common';
import { columns } from './TableColumns';

export function SearchResultTable() {
  const navigate = useNavigate();

  const { onQuerySubmit, isFetching, queryResult, error, queries } = useSearchHandler();

  const tableRowFormatter = () => {
    if (!queryResult?.items.length) return [];
    return queryResult.items.map((item) => {
      return {
        key: item.id,
        name: item.name,
        author: item.owner.login,
        number_of_stars: item.stargazers_count,
        watchers: item.watchers_count,
        forks: item.forks_count,
        full_name: item.full_name,
      };
    });
  };
  const formattedData = useMemo(() => tableRowFormatter(), [queryResult]);
  const handleSortChange = (value: Tsort) => {
    onQuerySubmit({ sort: value });
  };
  const handleOrderChange = (value: Torder) => {
    onQuerySubmit({ order: value });
  };

  if (!queryResult) return <Body className='text-gray-400'> No queries yet</Body>;
  if (error) return <Body className='text-red-500'>{error}</Body>;
  return (
    <>
      <Form layout='horizontal'>
        <Box component='flex' direction='row' className='mt-4 gap-x-4 justify-end'>
          <Form.Item label='Filter'>
            <Tooltip placement='top' title={!queries.sort ? 'You must change Sort' : ''}>
              <Select
                defaultValue='desc'
                style={{ width: 120 }}
                disabled={queries.sort === ''}
                onChange={handleOrderChange}
                options={[
                  {
                    value: 'asc',
                    label: 'ASC',
                  },
                  {
                    value: 'desc',
                    label: 'Desc',
                  },
                ]}
              />
            </Tooltip>
          </Form.Item>
          <Form.Item label='Sort'>
            <Select
              defaultValue=''
              style={{ width: 120 }}
              onChange={handleSortChange}
              options={[
                {
                  value: '',
                  label: 'Best Match',
                },
                {
                  value: 'stars',
                  label: 'Stars',
                },
                {
                  value: 'forks',
                  label: 'Forks',
                },
                {
                  value: 'updated',
                  label: 'Updated',
                },
              ]}
            />
          </Form.Item>
        </Box>
      </Form>

      <Table
        dataSource={formattedData}
        columns={columns}
        sticky
        summary={() => <Table.Summary fixed={'top'}></Table.Summary>}
        scroll={{ x: 1000 }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              console.log('open', record);
              navigate(`/${record.name}?owner=${record.author}`);
            },
          };
        }}
        pagination={{
          total: queryResult.total_count,
          onChange: (page) => {
            onQuerySubmit({ page });
          },
          onShowSizeChange(current, size) {
            onQuerySubmit({ per_page: size });
          },
          pageSizeOptions: ['10', '25', '50'],
        }}
        loading={isFetching}
      />
    </>
  );
}
