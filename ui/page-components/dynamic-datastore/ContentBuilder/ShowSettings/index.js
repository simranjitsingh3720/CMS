import { Button, Form, Input, message, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRequest } from '../../../../helpers/request-helper';
import styles from './style.module.scss';

function ShowSettings({ schema }) {
  const [form] = Form.useForm();

  form.setFieldsValue({
    title: schema.title,
    slug: schema.slug,
  });
  const [error, setError] = useState('');
  const { push } = useRouter();

  const [{}, executePatch] = useRequest(
    {
      url: `/schema/${schema.slug}`,
      method: 'PATCH',
    },
    {
      manual: true,
    },
  );

  const onFinish = (values) => {
    executePatch({
      data: {
        title: values.title,
        slug: values.slug,
        description: values.description,
      },
    }).then((res) => {
      const { slug } = JSON.parse(res.config.data);
      message.success('Table updated successfully !!!');
      push('/admin/datastore/content-builder/[schemaId]', `/admin/datastore/content-builder/${slug}`);
    })
      .catch((err) => {
        setError(err.response.data.message || err.response.data.messages[0]);
      });
  };

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo.message);
  };

  const handleValuesChange = (changedValues) => {
    setError('');

    if (changedValues.title !== '' && changedValues.title !== undefined) {
      form.setFieldsValue({ slug: _.snakeCase(changedValues.title) });
    }

    if (changedValues.title === '') {
      form.setFieldsValue({ slug: '' });
    }
  };
  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        form={form}
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
          rules={[{
            required: true,
            message: 'Please input your Slug!',
          },
          {
            pattern: new RegExp('^[A-Za-z0-9_]*$'),
            message: 'Only Letters and Numbers are accepted',
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
          <TextArea rows={2} />

        </Form.Item>

        <Form.Item style={{ marginBottom: '0px' }}>
          <div className={styles.actionButton}>
            <Space wrap>
              <Button htmlType="cancel">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ShowSettings;