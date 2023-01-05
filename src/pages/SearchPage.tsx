import React, { useReducer, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, Drawer } from 'antd';
import { SearchBox, SearchResultTable } from '~/components/page-components';
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
        <SearchResultTable data={state} />
        <Drawer title='Github Repository Search' placement='right' onClose={onClose} open={open}>
          <SearchBox />
        </Drawer>
      </SearchResultContext.Provider>
    </>
  );
}
