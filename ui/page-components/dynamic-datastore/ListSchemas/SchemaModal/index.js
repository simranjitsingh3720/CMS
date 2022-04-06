import {
  Alert,
  Button, Form, Input, message, Modal, Space,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import _ from 'lodash';
import styles from './style.module.scss';
import { useRequest } from '../../../../helpers/request-helper';

function SchemaModal({
  isModalVisible, setIsModalVisible,
  handleCancel, fetchAllSchema,
}) {
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    executePost({
      data: {
        title: values.title,
        slug: values.slug,
        description: values.description,
      },
    }).then((res) => {
      setLoading(false);
      message.success('Table created successfully !!!');
      setIsModalVisible(false);
      fetchAllSchema();
      push('/admin/datastore/content-builder/[schemaId]', `/admin/datastore/content-builder/${res.data.slug}`);
    })
      .catch((err) => {
        setLoading(false);

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
    <Modal
      title="Add new data table"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <div>
        <div className={styles.error}>
          {error
            ? <Alert message={error} type="error" closable onClose={() => { setError(''); }} /> : null}
        </div>
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
              {
                max: 30,
                message: 'Schema Name cannot be longer than 30 characters',
              },
            ]}
          >
            <Input autoFocus maxLength={31} />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{
              required: true,
              message: 'Please input your Slug!',
            },
            {
              max: 30,
              message: 'Slug cannot be longer than 30 characters',
            },
            {
              pattern: new RegExp('^[A-Za-z0-9_]*$'),
              message: 'Only Letters and Numbers are accepted',
            },
            ]}
          >
            <Input maxLength={31} />

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
            <TextArea rows={2} showCount maxLength={100} />

          </Form.Item>

          <Form.Item style={{ marginBottom: '0px' }}>
            <div className={styles.actionButton}>
              <Space wrap>
                <Button key="back" onClick={handleCancel}>
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
    </Modal>
  );
}

export default SchemaModal;
