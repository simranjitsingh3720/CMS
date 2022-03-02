import React, { useState } from 'react';
import { Drawer, Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import TextArea from 'antd/lib/input/TextArea';
import style from './style.module.scss';
import { useRequest } from '../../../../helpers/request-helper';

function SchemaDrawer({ closeDrawer, setIsDrawer, fetchAllSchema }) {
  const [error, setError] = useState('');
  const { push } = useRouter();
  const [form] = Form.useForm();

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
      fetchAllSchema();
      push('/admin/datastore/content-builder/[schemaId]', `/admin/datastore/content-builder/${res.data.slug}`);
    })
      .catch((err) => {
        setError(err.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo.message);
  };

  const handleValuesChange = (changedValues) => {
    if (changedValues.title) {
      const suggestedID = (changedValues.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      form.setFieldsValue({ slug: suggestedID });
    }
  };

  return (
    <Drawer title="Create New Schema" placement="right" onClose={() => closeDrawer()} visible>

      <div className={style.error}>{error}</div>
      <Form
        name="basic"
        form={form}
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
        onValuesChange={handleValuesChange}

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
              message: 'Please input your Description!',
            },
          ]}
        >
          <TextArea />

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
