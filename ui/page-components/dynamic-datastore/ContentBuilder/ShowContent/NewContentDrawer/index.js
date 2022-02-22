import { Card, Drawer, Form, Input } from 'antd';
import React from 'react';
import GetFields from './GetFields/GetFields';

export default function NewContentDrawer({ closeContentDrawer, schemaDetails }) {
  const fields = schemaDetails.schema;

  const onFinish = async (contentData) => { };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Drawer title="Add a new Content" placement="right" onClose={closeContentDrawer} size="large" visible>
      {/* {JSON.stringify(schemaDetails.schema)} */}
      <Form
        name="Add new Content form"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Card title="Field Contents" style={{ width: 650 }}>
          {fields.map((field) => (
            GetFields(field.appearanceType, field)
          ))}

        </Card>

      </Form>
    </Drawer>
  );
}
