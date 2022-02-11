import React, { useState } from 'react';
import { Drawer, Button, Form, Input } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';

function SchemaDrawer({ closeDrawer, setIsDrawer }) {
  const [error, setError] = useState('');
  const { push } = useRouter();

  const onFinish = (values) => {
    axios.post('http://localhost:8000/api/schema', values).then((res) => {
      setIsDrawer(false);
      push('/admin/datastore/content-builder/[schemaId]', `/admin/datastore/content-builder/${res.data.id}`);
    }).catch((err) => {
      setError(err.message);
    });
  };

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo.message);
  };

  return (
    <Drawer title="Create New Schema" placement="right" onClose={() => closeDrawer()} visible>

      {error}

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
