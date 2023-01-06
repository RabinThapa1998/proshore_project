import { Table } from 'antd';
import React, { useMemo } from 'react';
import { useSearchHandler } from '~/components/hooks';

import { useNavigate } from 'react-router-dom';

export function SearchResultTable() {
  const navigate = useNavigate();

  const { onQuerySubmit, isFetching, queryResult, error } = useSearchHandler();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Number of Stars',
      dataIndex: 'number_of_stars',
      key: 'number_of_stars',
    },
    {
      title: 'Watchers',
      dataIndex: 'watchers',
      key: 'watchers',
    },
    {
      title: 'Forks',
      dataIndex: 'forks',
      key: 'forks',
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

  if (!queryResult) return <></>;
  if (error) return <>{error}</>;
  return (
    <Table
      dataSource={formattedData}
      columns={columns}
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
      }}
      loading={isFetching}
    />
  );
}
