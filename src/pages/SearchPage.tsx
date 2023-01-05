import React, { useReducer, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, Drawer } from 'antd';
import { SearchBox } from '~/components/page-components';
import { Box } from '~/components/common';
import { IQueryResult, IReducerAction } from '~/types';
import { SearchResultContext } from '~/components/context';

export function SearchPage() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  function queryResultReducer(state: IQueryResult, action: IReducerAction) {
    const { payload } = action;
    return {
      ...payload,
    };
  }
  const initialState: IQueryResult = {
    total_count: 0,
    incomplete_results: false,
    items: [],
  };

  const [state, dispatch] = useReducer(queryResultReducer, initialState);
  console.log('🚀 ~ file: SearchPage.tsx:65 ~ SearchPage ~ state', state);

  return (
    <>
      <SearchResultContext.Provider value={dispatch}>
        <Box component='flex' justify='end' className='w-full '>
          <Button type='primary' onClick={showDrawer}>
            Search
          </Button>
        </Box>
        <Table dataSource={dataSource} columns={columns} />
        <Drawer title='Github Repository Search' placement='right' onClose={onClose} open={open}>
          <SearchBox />
        </Drawer>
      </SearchResultContext.Provider>
    </>
  );
}
