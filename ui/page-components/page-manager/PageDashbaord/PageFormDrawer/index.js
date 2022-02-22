import React, { useState } from 'react';
import {
  Button, Drawer, Form, Input,
  message, Checkbox,
} from 'antd';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';

function PageFormDrawer({ onFormClose, visible, setVisible }) {
  const [pageDetails, setPageDetails] = useState({ name: '', slug: '', isHome: 0 });
  const [checked, setChecked] = useState(false);
  const [slugRule, setSlugRule] = useState(true);

  const { push } = useRouter();

  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:8000/api/page/',
    method: 'GET',
    params: {
      q: '',
    },
  });

  const [{}, executePost] = useAxios(
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
    }).then(() => {
      setVisible(false);
      message.success('Page Created Successfully', 5);
      if (pageDetails.slug) {
        push('/admin/page-manager/builder/[pageID]', `/admin/page-manager/builder/${pageDetails.slug}`);
      }
      push('/admin/page-manager/builder', '/admin/page-manager/builder');
    })
      .catch((err) => {
        (((data && data.list) || []).map((page) => (
          (page.slug === pageDetails.slug) ? message.info('Page with this Slug name already Exists') : console.log('Error => ', err)
        )));
      });
  };

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
          rules={[{ required: slugRule, message: 'Please enter Page Slug!' }]}
        >
          <Input disabled={checked} />
        </Form.Item>
        <Form.Item
          name="index"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
          onChange={() => {
            if (!checked) {
              setPageDetails({ ...pageDetails, slug: '', isHome: 1 });
            }
            setChecked(!checked);
            setSlugRule(!slugRule);
          }}
        >
          <Checkbox>Make this Page Home</Checkbox>
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
