import { Table } from 'antd';
import React, { useMemo } from 'react';
import { useSearchHandler } from '~/components/hooks';
import { IQueryResult } from '~/types';

export function SearchResultTable({ data }: { data: IQueryResult }) {
  const { items, incomplete_results, total_count } = data;
  const { onQuerySubmit, isFetching } = useSearchHandler();

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
    return items.map((item) => {
      return {
        key: item.id,
        name: item.name,
        author: item.owner.login,
        number_of_stars: item.stargazers_count,
        watchers: item.watchers_count,
        forks: item.forks_count,
      };
    });
  };
  const formattedData = useMemo(() => tableRowFormatter(), [items]);

  return (
    <Table
      dataSource={formattedData}
      columns={columns}
      pagination={{
        total: total_count,
        onChange: (page) => {
          onQuerySubmit({ page });
        },
      }}
      loading={isFetching}
    />
  );
}
