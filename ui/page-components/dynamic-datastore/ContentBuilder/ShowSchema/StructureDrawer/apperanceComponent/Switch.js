import { Form, Input, Button, Checkbox } from 'antd';

import React from 'react';

export default function Switch() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form.Item
        label="True Label"
        name="Truelabel"
        rules={[
          {
            required: true,
            message: 'Please input your True Label!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="False Label"
        name="Falselabel"
        rules={[
          {
            required: true,
            message: 'Please input your False Label!',
          },
        ]}
      >
        <Input />
      </Form.Item>

    </div>

  );
}
