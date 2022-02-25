import React, { useEffect, useState } from 'react';
import {
  Drawer, Tabs, Form, Input, Button, Checkbox, Select, Divider, Card, Space, message,
} from 'antd';
import useAxios from 'axios-hooks';
import { dataTypes, appearanceTypes } from '../../schemaDetails';
import ValueNames from './apperanceComponent/ValueNames';
import Switch from './apperanceComponent/Switch';

const { TextArea } = Input;

function StructureDrawer({
  fieldsName, closeSchemaDrawer, data = {}, getSchema, fieldData, isEditable,
}) {
  const [form] = Form.useForm();

  const [dataType, setDataType] = useState('');
  const [appearanceType, setAppearanceType] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldId, setFieldId] = useState('');

  console.log(isEditable);
  console.log('dsdd ', data);
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
    executePatchCreate,
  ] = useAxios(
    {
      url: `http://localhost:8000/api/schema/${data.slug}/field`,
      method: 'POST',

    },
    { manual: true },
  );
  const [{ },
    executePatchUpdate,
  ] = useAxios(
    {
      url: `http://localhost:8000/api/schema/${data.slug}/field`,
      method: 'PATCH',

    },
    { manual: true },
  );
  const onFinish = async (values) => {
    setLoading(true);

    if (!isEditable) {
      let newSchema = data.schema || [];
      newSchema = [...newSchema, values];

      await executePatchCreate({
        data: {
          schema: newSchema,
        },
      }).then(() => {
        getSchema();
      });

      if (error) {
        message.error('Field Not Added');
      } else {
        setLoading(false);

        form.resetFields();
        closeSchemaDrawer();
        message.success('Field Added Successfully');
      }
    } else {
      let newSchema = data.schema || [];
      const filtered = newSchema.filter((el) => el.id !== fieldsName);
      console.log('Previous =>', newSchema);
      console.log('filtered => ', filtered);
      console.log('new val =>', values);

      newSchema = [...filtered, values];
      console.log('Final => ', newSchema);
      await executePatchUpdate({
        data: {
          schema: newSchema,
        },
      }).then(() => {
        getSchema();
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
  // const handleFieldID = (e) => {
  //   let val = e.target.value;

  //   val = val.replace(/ /g, '_');

  //   setFieldId(val);
  // };

  const handleValuesChange = (changedValues) => {
    if (changedValues.name) {
      const suggestedID = (changedValues.name || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      form.setFieldsValue({ id: suggestedID });
    }
  };

  return (
    <Drawer title="Create a new field" placement="right" onClose={closeSchemaDrawer} size="large" visible>

      <Form
        name="basic"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 10 }}
        initialValues={{}}
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

              <Input defaultValue={(fieldData && fieldData.name) || ''} />
            </Form.Item>

            <Form.Item
              label="Field ID"
              name="id"
              rules={[{ required: true, message: 'Please input your field ID!' }]}
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
