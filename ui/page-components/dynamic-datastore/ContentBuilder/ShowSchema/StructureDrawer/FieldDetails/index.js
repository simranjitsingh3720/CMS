import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, Select } from 'antd';
import style from './style.module.scss';
import { dataTypes } from '../../../schemaDetails';

const { Option } = Select;

export default function FieldDetails({ handleOnDataTypeChange }) {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={style.fieldDetails_flex}>
      <div className={style.fieldDetails_fields}>
        <Form
          name="form details"
          // labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the Name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Field ID"
            name="id"
            rules={[{ required: true, message: 'Please input the Field ID!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the Description!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="required"
            valuePropName="checked"
          >
            <Checkbox>Required field</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Select size="large" defaultValue={dataTypes[0]} onChange={(value) => handleOnDataTypeChange(value)} style={{ width: 200 }}>
          {
            dataTypes.map((dataType) => (
              <Option key={dataType}>
                {dataType}
              </Option>
            ))
          }
        </Select>
      </div>
    </div>
  );
}
