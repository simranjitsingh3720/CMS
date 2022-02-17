import React, { useState } from 'react';
import {
  Form, Input, Checkbox, Button, Select, Col,
} from 'antd';
import style from './style.module.scss';
import { dataTypes } from '../../../schemaDetails';

const { Option } = Select;

export default function FieldDetails({ handleOnDataTypeChange, appearanceType }) {
  const onFinish = (values) => {
    console.log(appearanceType);
    values.appearanceType = appearanceType;
    if (values.appearanceType === '') {
      console.log('EMPTY');
    }
    console.log('form data - >', values);
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
          <Col span={16}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input the Name!' }]}
            >
              <Input style={{ width: '200px' }} />
            </Form.Item>
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
              <Select
                size="large"
                style={{ width: 200 }}
                placeholder="Select type of field..."
                onChange={(value) => handleOnDataTypeChange(value)}
                allowClear
              >
                {
              dataTypes.map((dataType) => (
                <Option value={dataType} key={dataType}>
                  {dataType}
                </Option>
              ))
              }

              </Select>
            </Form.Item>
          </Col>

          <Form.Item
            label="Field ID"
            name="id"
            rules={[{ required: true, message: 'Please input the Field ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Default Value"
            name="DefaultValue"
            rules={[{ message: 'Please input the Default Value!' }]}
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
      {/* <div>
        <Select size="large" defaultValue={dataTypes[0]} onChange={(value) => handleOnDataTypeChange(value)} style={{ width: 200 }}>
          {
            dataTypes.map((dataType) => (
              <Option key={dataType}>
                {dataType}
              </Option>
            ))
          }
        </Select>
      </div> */}
    </div>
  );
}
