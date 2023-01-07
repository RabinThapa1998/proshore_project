import React, { useMemo } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { Table } from 'antd';
import { useRepoQueryHandler } from '~/components/hooks';

export function SearchDetailPage() {
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const ownerName = useMemo(() => searchParams.get('owner'), [searchParams]);

  const { data: repoDetails, isFetching: isSearchDetailsLoading } = useRepoQueryHandler({
    ownerName: ownerName || '',
    repoName: params?.id || '',
  });

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
      width: 100,
    },
    {
      title: 'Repository Name',
      dataIndex: 'repository_name',
      key: 'repository_name',
      render: (text: string) => (
        <a href={`https://github.com/${ownerName}/${params.id}`} target='_blank' rel='noreferrer'>
          {text}
        </a>
      ),
      width: 100,
    },
    {
      title: 'Number of Open Issues',
      dataIndex: 'number_of_issues',
      key: 'number_of_issues',
      width: 100,
    },
    {
      title: 'Default Branch',
      dataIndex: 'default_branch',
      key: 'default_branch',
      width: 100,
    },
  ];
  const tableRowFormatter = () => {
    if (!repoDetails?.length) return undefined;
    return [
      {
        key: repoDetails[0].id,
        owner_name: repoDetails[1]?.name || 'Not Available',
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
      scroll={{ x: 1000 }}
    />
  );
}
