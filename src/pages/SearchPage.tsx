import React, { useReducer, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, Drawer } from 'antd';
import { SearchBox, SearchResultTable } from '~/components/page-components';
import { Box } from '~/components/common';

export function SearchPage() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Box component='flex' justify='end' className='w-full '>
        <Button type='primary' onClick={showDrawer}>
          Search
        </Button>
      </Box> */}
      <SearchBox />
      <SearchResultTable />
      {/* <Drawer title='Github Repository Search' placement='right' onClose={onClose} open={open}> */}
      {/* </Drawer> */}
    </>
  );
}
