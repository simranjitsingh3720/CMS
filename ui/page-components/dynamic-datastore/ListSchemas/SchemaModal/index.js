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
import SchemaFrom from './SchemaForm';

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
      title="Create new data table"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <div>
        <div className={styles.error}>
          {error
            ? <Alert message={error} type="error" closable onClose={() => { setError(''); }} /> : null}
        </div>
        <SchemaFrom
          handleCancel={handleCancel}
          onFinishFailed={onFinishFailed}
          handleValuesChange={handleValuesChange}
          onFinish={onFinish}
          form={form}
        />
      </div>
    </Modal>
  );
}

export default SchemaModal;
