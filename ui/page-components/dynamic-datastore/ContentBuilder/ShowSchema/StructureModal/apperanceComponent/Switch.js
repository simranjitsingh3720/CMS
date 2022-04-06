import { Form, Input } from 'antd';

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
          { max: 100, message: 'Data cannot be longer than 200 characters' },

        ]}
      >
        <Input maxLength={101} />
      </Form.Item>

    </div>

  );
}
