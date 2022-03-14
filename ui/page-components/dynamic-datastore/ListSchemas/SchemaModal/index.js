import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './style.module.scss';
import { useRequest } from '../../../../helpers/request-helper';

function SchemaModal({
  isModalVisible, setIsModalVisible,
  confirmLoading, handleCancel, fetchAllSchema,
}) {
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
      setIsModalVisible(false);
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
    <Modal
      title="Create New Table"
      visible={isModalVisible}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <div>
        <div className={styles.error}>{error}</div>
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
              pattern: new RegExp('^[A-Za-z0-9]*$'),
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
            <TextArea />

          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 15,
              span: 16,
            }}
            style={{ marginBottom: '0px' }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button className={styles.cancelButton} onClick={handleCancel} htmlType="cancel">
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default SchemaModal;
