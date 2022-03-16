import { Form, Input, Button, Checkbox } from 'antd';

import React from 'react';

export default function Switch() {
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
