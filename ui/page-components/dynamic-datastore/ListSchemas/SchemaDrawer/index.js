import React, { useState } from 'react';
import { Drawer, Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import style from './style.module.scss';
import { useRequest } from '../../../../helpers/request-helper';

function SchemaDrawer({ closeDrawer, setIsDrawer }) {
  const [error, setError] = useState('');
  const { push } = useRouter();

  const [{}, executePost] = useRequest(
    {
      url: '/schema',
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  const onFinish = (values) => {
    executePost({
      data: {
        title: values.title,
        slug: values.slug,
        description: values.description,
      },
    }).then((res) => {
      setIsDrawer(false);
      push('/admin/datastore/content-builder/[schemaId]', `/admin/datastore/content-builder/${res.data.slug}`);
    })
      .catch((err) => {
        setError(err.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo.message);
  };

  return (
    <Drawer title="Create New Schema" placement="right" onClose={() => closeDrawer()} visible>

      <div className={style.error}>{error}</div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Schema Name"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your Schema Name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[
            {
              required: true,
              message: 'Please input your Slug!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your Description!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
export default SchemaDrawer;
