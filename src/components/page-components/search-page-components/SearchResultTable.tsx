import { Table } from 'antd';
import React, { useMemo } from 'react';
import { useSearchHandler } from '~/components/hooks';
import { IQueryResult } from '~/types';
import { useAppSelector, useAppDispatch } from '~/global-states/redux-hooks/reduxHooks';
import { selectQueryResultGlobalState } from '~/global-states/reducer/searchReducer';

export function SearchResultTable() {
  const queryResult = useAppSelector(selectQueryResultGlobalState);

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
    if (!queryResult) return [];
    return queryResult.items.map((item) => {
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
  const formattedData = useMemo(() => tableRowFormatter(), [queryResult]);

  if (!queryResult) return <>loading</>;
  return (
    <Table
      dataSource={formattedData}
      columns={columns}
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
