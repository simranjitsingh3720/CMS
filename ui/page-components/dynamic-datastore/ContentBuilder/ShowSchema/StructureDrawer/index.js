import React, { useState } from 'react';
import {
  Drawer, Form, Input, Button, Checkbox, Select, Divider, Card, Space, message,
} from 'antd';
import { dataTypes, appearanceTypes } from '../../schemaDetails';
import ValueNames from './apperanceComponent/ValueNames';
import Switch from './apperanceComponent/Switch';
import { useRequest } from '../../../../../helpers/request-helper';

const { TextArea } = Input;

function StructureDrawer({
  fieldsId, closeSchemaDrawer, data = {}, fieldData, isEditable, setReFetchSchema,
}) {
  const [form] = Form.useForm();
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
    message.error('Failed');
  };

  const [{ error },
    executeFieldCreate,
  ] = useRequest(
    {
      url: `/schema/${data.slug}/field`,
      method: 'POST',

    },
    { manual: true },
  );

  const [{ },
    executeFieldUpdate,
  ] = useRequest(
    {
      url: `/schema/${data.slug}/field/${fieldsId}`,
      method: 'PATCH',

    },
    { manual: true },
  );

  const onFinish = async (values) => {
    const updatedValues = values;

    if (updatedValues.values) {
      if (updatedValues.options) {
        updatedValues.options.values = values.values;
      } else {
        updatedValues.options = {
          values: values.values,
        };
      }
    }

    if (updatedValues.isMultiple) {
      if (updatedValues.options) {
        updatedValues.options.isMultiple = values.isMultiple;
      } else {
        updatedValues.options = {
          isMultiple: values.isMultiple,
        };
      }
    }

    updatedValues.values = undefined;
    updatedValues.isMultiple = undefined;

    setLoading(true);

    if (!isEditable) {
      await executeFieldCreate({
        data: {
          schema: values,
          fieldId: values.id,
        },
      }).then((res) => {
        if (res.data.message) {
          message.error(res.data.message);
        } else {
          message.success('Field Added Successfully');
          setLoading(false);
          form.resetFields();
          closeSchemaDrawer();
          setReFetchSchema(true);
        }
      });

      if (error) {
        message.error('Field Not Added');
      }
    } else {
      await executeFieldUpdate({
        data: {
          schema: values,
        },
      }).then(() => {
        setReFetchSchema(true);
      });

      if (error) {
        message.error('Field Not Updated');
      } else {
        setLoading(false);

        form.resetFields();
        closeSchemaDrawer();
        message.success('Field Updated Successfully');
      }
    }
  };

  if (!isEditable) {
    const handleValuesChange = (changedValues) => {
      if (changedValues.name) {
        const suggestedID = (changedValues.name || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        form.setFieldsValue({ id: suggestedID });
      }
    };
  }
  return (
    <Drawer title={fieldData ? `Edit Field ${fieldData.name}` : 'Create a new Field'} placement="right" onClose={closeSchemaDrawer} size="large" visible>

      <Form
        name="basic"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          name: (fieldData && fieldData.name),
          id: (fieldData && fieldData.id),
          type: (fieldData && fieldData.type),
          appearanceType: (fieldData && fieldData.appearanceType),
          defaultValue: (fieldData && fieldData.defaultValue),
          required: (fieldData && fieldData.required),
          description: (fieldData && fieldData.description),

        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={handleValuesChange}
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

              <Input />
            </Form.Item>

            <Form.Item
              label="Field ID"
              name="id"
              rules={[{ required: true, message: 'Please input your field ID!' }]}
            >
              <Input disabled={!!isEditable} />

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

          <Card title="Appearance Details" style={{ width: 650 }}>
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
                      name="isMultiple"
                      valuePropName="checked"
                    >
                      <Checkbox style={{ marginLeft: '120px' }}>Multiple Files</Checkbox>

                    </Form.Item>
                  );

                case 'switch':
                  return <Switch />;
                case 'dropdown':
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
            offset: 19,
            span: 10,
          }}
        >
          {isEditable ? (
            <Button type="primary" htmlType="submit" style={{ marginTop: '15px' }}>
              Update
            </Button>
          )
            : (
              <Button type="primary" htmlType="submit" style={{ marginTop: '15px' }}>
                Submit
              </Button>
            )}
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default StructureDrawer;
