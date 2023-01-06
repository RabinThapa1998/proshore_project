import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { request } from '~/util/request';
import { Table } from 'antd';
import { Item, IUsers } from '~/types';

export function SearchDetailPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const ownerName = useMemo(() => searchParams.get('owner'), [searchParams]);

  const { data: repoDetails, isLoading: isSearchDetailsLoading } = useQuery(
    ['SearchDetailRepoAPI', location.pathname],
    (): Promise<[Item, IUsers]> => {
      return Promise.all([
        request({
          url: `/repos/${ownerName}${location.pathname}`,
          method: 'GET',
        }),
        request({
          url: `/users/${ownerName}`,
          method: 'GET',
        }),
      ]);
    },
  );
  console.log('🚀 ~ file: SearchDetailPage.tsx:14 ~ SearchDetailPage ~ repoDetails', repoDetails);

  const columns = [
    {
      title: 'Owner Name',
      dataIndex: 'owner_name',
      key: 'owner_name',
      render: (text: string) => (
        <a href={`https://github.com/${ownerName}`} target='_blank' rel='noreferrer'>
          {text}
        </a>
      ),
    },
    {
      title: 'Repository Name',
      dataIndex: 'repository_name',
      key: 'repository_name',
      render: (text: string) => (
        <a
          href={`https://github.com/${ownerName}${location.pathname}`}
          target='_blank'
          rel='noreferrer'
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Number of Open Issues',
      dataIndex: 'number_of_issues',
      key: 'number_of_issues',
    },
    {
      title: 'Default Branch',
      dataIndex: 'default_branch',
      key: 'default_branch',
    },
  ];
  const tableRowFormatter = () => {
    if (!repoDetails?.length) return undefined;
    return [
      {
        key: repoDetails[0].id,
        owner_name: repoDetails[1]?.name,
        repository_name: repoDetails[0].name,
        number_of_issues: repoDetails[0].open_issues_count,
        default_branch: repoDetails[0].default_branch,
      },
    ];
  };
  const formattedData = useMemo(() => tableRowFormatter(), [repoDetails]);

  return (
    <Table
      dataSource={formattedData}
      columns={columns}
      loading={isSearchDetailsLoading}
      pagination={false}
    />
  );
}
