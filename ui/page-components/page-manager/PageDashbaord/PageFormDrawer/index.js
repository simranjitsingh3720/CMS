import React, { useState } from 'react';
import {
  Button, Drawer, Form, Input,
  message,
} from 'antd';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';

function PageFormDrawer({ onFormClose, visible, setVisible }) {
  const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });

  const { push } = useRouter();

  const [{ data, loading, error }, executePost] = useAxios(
    {
      url: 'http://localhost:8000/api/createPage',
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  const handleCreatePage = () => {
    executePost({
      data: {
        pageDetails,
      },
    });
    setVisible(false);
    message.info('Page Created Successfully', 5);
    push('/admin/page-manager/builder/[pageID]', `/admin/page-manager/builder/${pageDetails.slug}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <Drawer title="Create New Page" placement="right" onClose={onFormClose} visible={visible}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Page Name"
          name="page"
          value={pageDetails.name}
          onChange={(e) => setPageDetails({ ...pageDetails, name: e.target.value })}
          rules={[{ required: true, message: 'Please enter Page Name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          value={pageDetails.slug}
          onChange={(e) => setPageDetails({ ...pageDetails, slug: e.target.value })}
          rules={[{ required: true, message: 'Please enter Page Slug!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleCreatePage}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default PageFormDrawer;
