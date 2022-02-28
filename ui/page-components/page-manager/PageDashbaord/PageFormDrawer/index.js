import React, { useState } from 'react';
import {
  Button, Drawer, Form, Input,
  message, Checkbox,
} from 'antd';
import { useRouter } from 'next/router';
import { useRequest } from '../../../../helpers/request-helper';

function PageFormDrawer({ onFormClose, visible, setVisible }) {
  const [pageDetails, setPageDetails] = useState({ name: '', slug: '', isHome: 0 });
  const [checked, setChecked] = useState(false);
  const [slugRule, setSlugRule] = useState(true);

  const { push } = useRouter();

  const [{ data, loading, error }, refetch] = useRequest({
    url: '/page/',
    method: 'GET',
    params: {
      q: '',
    },
  });

  const [{}, executePost] = useRequest(
    {
      url: '/createPage',
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
      push('/admin/page-manager/builder');
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
        onFinish={handleCreatePage}
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
          rules={[{ required: slugRule, message: 'Please enter Page Slug!' }, {
            pattern: new RegExp('^[A-Za-z0-9]*$'),
            message: 'Only Letters and Numbers are accepted',
          }]}
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default PageFormDrawer;
