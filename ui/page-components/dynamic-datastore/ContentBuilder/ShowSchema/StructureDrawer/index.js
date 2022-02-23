import React, { useState } from 'react';
import {
  Drawer, Form, Input, Button, Checkbox, Select, Divider, Card, Space, message,
} from 'antd';
import { dataTypes, appearanceTypes } from '../../schemaDetails';
import ValueNames from './apperanceComponent/ValueNames';
import Switch from './apperanceComponent/Switch';
import { useRequest } from '../../../../../helpers/request-helper';

const { TextArea } = Input;

function StructureDrawer({ closeSchemaDrawer, data = {}, getSchema, fieldData }) {
  const [form] = Form.useForm();
  console.log(fieldData);

  const [dataType, setDataType] = useState('');
  const [appearanceType, setAppearanceType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnDataTypeChange = (value) => {
    setDataType(value);
  };

  const handleOnApperanceTypeChange = (value) => {
    setAppearanceType(value);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [{ error },
    executePatch,
  ] = useRequest(
    {
      url: `/schema/${data.slug}`,
      method: 'PATCH',

    },
    { manual: true },
  );

  const onFinish = async (values) => {
    setLoading(true);
    let newSchema = data.schema || [];
    newSchema = [...newSchema, values];

    await executePatch({

      data: {
        schema: newSchema,
      },
    })
      .then(() => {
        getSchema();
      });
    if (error) {
      message.error('Asset Not Updated');
    } else {
      setLoading(false);

      form.resetFields();
      closeSchemaDrawer();
      message.success('Field Added Successfully');
    }
  };
  return (
    <Drawer title="Create a new field" placement="right" onClose={closeSchemaDrawer} size="large" visible>

      <Form
        name="basic"
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
        <Space direction="vertical">
          <Card title="Field Details" style={{ width: 650 }}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your field name!',
                },
              ]}
            >

              <Input defaultValue={(fieldData && fieldData.name) || ''} />
            </Form.Item>
            <Form.Item
              label="Field ID"
              name="id"
              rules={[
                {
                  required: true,
                  message: 'Please input your field ID!',
                },
              ]}
            >

              <Input defaultValue={(fieldData && fieldData.id) || ''} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  message: 'Please input your description!',
                },
              ]}
            >

              <TextArea rows={4} defaultValue={(fieldData && fieldData.description) || ''} />

            </Form.Item>
            <Form.Item
              label="Default Value"
              name="defaultValue"
              rules={[
                {
                  message: 'Please input your default value!',
                },
              ]}
            >

              <Input defaultValue={(fieldData && fieldData.defaultValue) || ''} />
            </Form.Item>
            <Form.Item
              name="required"
              valuePropName="checked"
            >
              <Checkbox checked={(fieldData && fieldData.required) || false} style={{ marginLeft: '120px' }}>Required field</Checkbox>

            </Form.Item>
          </Card>
          <Divider />
          <Card title="Appearance Details">
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
              <Select
                defaultValue={(fieldData && fieldData.type)}
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
            <Form.Item name="appearanceType" label="Appearance Type" rules={[{ required: true }]}>
              <Select
                size="large"
                defaultValue={(fieldData && fieldData.appearanceType) || appearanceTypes[dataType]}
                placeholder="Select type of  appearance field..."
                onChange={handleOnApperanceTypeChange}
                style={{ width: 200 }}
              >
                {
            ((appearanceTypes && appearanceTypes[dataType])
            || (fieldData && appearanceTypes[fieldData.type]) || []).map((appearanceType) => (
              <Option key={appearanceType} value={appearanceType}>
                {appearanceType}
              </Option>
            ))
          }
              </Select>
            </Form.Item>

            {(() => {
              switch (appearanceType) {
                case 'checkbox':
                  return <ValueNames />;
                case 'fileUpload':
                  return (

                    <Form.Item
                      name="Multiple"
                      valuePropName="checked"
                    >
                      <Checkbox style={{ marginLeft: '120px' }}>Multiple Files</Checkbox>

                    </Form.Item>
                  );

                case 'switch':
                  return <Switch />;
                case 'select':
                  return <ValueNames />;
                case 'radio':
                  return <ValueNames />;
                case 'Boolean Radio':
                  return <Switch />;
                default:
                  return null;
              }
            })()}
          </Card>
        </Space>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 10,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ marginTop: '15px' }}>
            Submit
          </Button>
        </Form.Item>

      </Form>
    </Drawer>
  );
}

export default StructureDrawer;
