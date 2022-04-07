/* eslint-disable no-empty-pattern */
import { Button, Form, Input, message, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import _ from 'lodash';
import { useRequest } from '../../../../helpers/request-helper';
import styles from './style.module.scss';

function ShowSettings({ schemaDetails }) {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(true);
  const { push } = useRouter();

  const [{}, updateDatatableDetails] = useRequest(
    {
      url: `/schema/${schemaDetails.slug}`,
      method: 'PATCH',
    },
    {
      manual: true,
    },
  );

  const onFinish = (values) => {
    updateDatatableDetails({
      data: {
        title: values.title,
        slug: values.slug,
        description: values.description,
      },
      params: {
        schemaId: schemaDetails.id,
      },
    }).then((res) => {
      const { slug } = JSON.parse(res.config.data);
      message.success('Table updated successfully !!!');
      push('/admin/datastore/content-builder/[schemaId]', `/admin/datastore/content-builder/${slug}`);
    })
      .catch((err) => {
        message.error(err.response.data.message || err.response.data.messages[0]);
      });
  };

  const handleValuesChange = (changedValues) => {
    if (changedValues.title !== '' && changedValues.title !== undefined) {
      form.setFieldsValue({ slug: _.snakeCase(changedValues.title) });
    }
    if (changedValues.title === '') {
      form.setFieldsValue({ slug: '' });
    }
    setDisable(false);
  };

  return (
    <div>
      { Object.keys(schemaDetails).length > 0
        ? (
          <Form
            name="basic"
            layout="vertical"
            form={form}
            initialValues={{
              title: schemaDetails.title,
              slug: schemaDetails.slug,
              description: schemaDetails.description,
            }}
            onFinish={onFinish}
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
                  pattern: /^[A-Za-z0-9]+(?: +[A-Za-z0-9]+)*$/,
                  message: 'No Trailing and leading space allowed',
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
                pattern: /^[A-Za-z0-9_]*$/,
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
                  <Button type="primary" htmlType="submit" disabled={disable}>
                    Submit
                  </Button>
                </Space>
              </div>
            </Form.Item>
          </Form>
        ) : '' }
    </div>
  );
}

export default ShowSettings;
