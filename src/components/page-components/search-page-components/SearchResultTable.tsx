import { Button, Form, Select, Table } from 'antd';
import React, { useMemo } from 'react';
import { useSearchHandler } from '~/components/hooks';
import { Tsort, Torder } from '~/types';
import { useNavigate } from 'react-router-dom';

export function SearchResultTable() {
  const navigate = useNavigate();

  const { onQuerySubmit, isFetching, queryResult, error } = useSearchHandler();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 100,
    },
    {
      title: 'Number of Stars',
      dataIndex: 'number_of_stars',
      key: 'number_of_stars',
      width: 100,
    },
    {
      title: 'Watchers',
      dataIndex: 'watchers',
      key: 'watchers',
      width: 100,
    },
    {
      title: 'Forks',
      dataIndex: 'forks',
      key: 'forks',
      width: 100,
    },
  ];
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

  if (!queryResult) return <></>;
  if (error) return <>{error}</>;
  return (
    <>
      <Select
        defaultValue='desc'
        style={{ width: 120 }}
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
