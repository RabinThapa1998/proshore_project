import { Form, Input, Button, Spin } from 'antd';
import { Box, Heading } from '~/components/common';
import { useSearchHandler } from '~/components/hooks';

export function SearchBox() {
  const { onQuerySubmit, isFetching } = useSearchHandler();
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onQuerySubmit}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
      >
        <Box direction='row' component='flex' justify='between' align='end' className='gap-x-5'>
          <Form.Item
            label='Repository name'
            name='query'
            className='w-full'
            rules={[{ required: true, message: 'Please enter!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary'>
              Search
            </Button>
          </Form.Item>
        </Box>
      </Form>
      {isFetching ? (
        <Box component='flex' className='w-full '>
          <Spin size='small' />
        </Box>
      ) : null}
    </>
  );
}
