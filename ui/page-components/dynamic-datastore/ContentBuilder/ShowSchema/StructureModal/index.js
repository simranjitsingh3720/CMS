import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, Checkbox, Select, Card, Space, message, Modal,
} from 'antd';
import _ from 'lodash';
import { dataTypes, appearanceTypes } from '../../schemaDetails';
import ValueNames from './apperanceComponent/ValueNames';
import Switch from './apperanceComponent/Switch';
import { useRequest } from '../../../../../helpers/request-helper';
import styles from './style.module.scss';

const { TextArea } = Input;

function StructureModal({
  showSchemaModal, fieldsId, closeSchemaModal, data = {},
  fieldData, isEditable, setReFetchSchema, schemaSlug,
}) {
  const [form] = Form.useForm();
  const [dataType, setDataType] = useState('');
  const [appearanceType, setAppearanceType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditable) {
      setAppearanceType((fieldData && fieldData.appearanceType) || '');
      if (dataType) {
        setAppearanceType(appearanceTypes[dataType][0]);
        form.setFieldsValue({ appearanceType: appearanceTypes[dataType][0] });
      }
    } else if (dataType) {
      setAppearanceType(appearanceTypes[dataType][0]);
      form.setFieldsValue({ appearanceType: appearanceTypes[dataType][0] });
    }
  }, [fieldData, dataType]);

  const handleOnDataTypeChange = (value) => {
    setDataType(value);
  };

  const handleOnApperanceTypeChange = (value) => {
    setAppearanceType(value);
  };

  const onFinishFailed = () => {
    console.log('fields required');
  };

  const [{ error },
    executeFieldCreate,
  ] = useRequest(
    {
      url: `/schema/${schemaSlug}/field`,
      method: 'POST',

    },
    { manual: true },
  );

  // const [{ },
  //   executeFieldCreate,
  // ] = useRequest(
  //   {
  //     url: `/schema/${data.slug}`,
  //     method: 'POST',

  //   },
  //   { manual: true },
  // );

  const [{ },
    executeFieldUpdate,
  ] = useRequest(
    {
      url: `/schema/${schemaSlug}/field/${fieldsId}`,
      method: 'PATCH',
    },
    { manual: true },
  );

  // const [{ },
  //   executeFieldUpdate,
  // ] = useRequest(
  //   {
  //     url: `/schema/${data.slug}/field/${fieldsId}`,
  //     method: 'PATCH',

  //   },
  //   { manual: true },
  // );

  // const onFinish = async (values) => {
  //   const updatedValues = values;

  //   if (updatedValues.values) {
  //     if (updatedValues.options) {
  //       updatedValues.options.values = values.values;
  //     } else {
  //       updatedValues.options = {
  //         values: values.values,
  //       };
  //     }
  //   }

  //   if (updatedValues.isMultiple) {
  //     if (updatedValues.options) {
  //       updatedValues.options.isMultiple = values.isMultiple;
  //     } else {
  //       updatedValues.options = {
  //         isMultiple: values.isMultiple,
  //       };
  //     }
  //   }
  //   updatedValues.values = undefined;
  //   updatedValues.isMultiple = undefined;

  //   setLoading(true);
  //   if (!isEditable) {
  //     await executeFieldCreate({
  //       data: {
  //         schema: values,
  //         fieldId: values.id,
  //       },
  //     }).then(() => {
  //       message.success('Field Added Successfully');
  //       setLoading(false);
  //       form.resetFields();
  //       closeSchemaModal();
  //       setReFetchSchema(true);
  //     }).catch((err) => {
  //       message.error(err.response.data.message || err.response.data.messages[0]);
  //     });
  //   } else {
  //     await executeFieldUpdate({
  //       data: {
  //         schema: values,
  //       },
  //     }).then(() => {
  //       setReFetchSchema(true);
  //     }).catch((err) => {
  //       message.error(err.response.data.message || err.response.data.messages[0]);
  //     });

  //     if (!error) {
  //       setLoading(false);

  //       form.resetFields();
  //       closeSchemaModal();
  //       message.success('Field Updated Successfully');
  //     }
  //   }
  // };

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
          ...values,
        },
        params: {
          schemaId: data.id,
        },
      }).then(() => {
        message.success('Field Added Successfully');
        setLoading(false);
        form.resetFields();
        closeSchemaModal();
        setReFetchSchema(true);
      }).catch((err) => {
        message.error(err.response.data.message || err.response.data.messages[0]);
      });
    } else {
      await executeFieldUpdate({
        data: {
          ...values,
        },
      }).then(() => {
        setReFetchSchema(true);
      }).catch((err) => {
        message.error(err.response.data.message || err.response.data.messages[0]);
      });

      if (!error) {
        setLoading(false);

        form.resetFields();
        closeSchemaModal();
        message.success('Field Updated Successfully');
      }
    }
  };

  if (!isEditable) {
    const handleValuesChange = (changedValues) => {
      if (changedValues.name !== '' && changedValues.name !== undefined) {
        form.setFieldsValue({ fieldId: _.snakeCase(changedValues.name) });
      }

      if (changedValues.name === '') {
        form.setFieldsValue({ fieldId: '' });
      }
    };
  }

  return (

    <Modal
      title={fieldData ? `Edit ${fieldData.name} field` : 'Create a new field'}
      visible={showSchemaModal}
      confirmLoading={loading}
      onCancel={closeSchemaModal}
      width={1100}
      footer={null}

    >
      <Form
        name="basic"
        form={form}
        layout="vertical"
        initialValues={{
          name: (fieldData && fieldData.name),
          fieldId: (fieldData && fieldData.fieldId),
          type: (fieldData && fieldData.type),
          appearanceType: (fieldData && fieldData.appearanceType),
          defaultValue: (fieldData && fieldData.defaultValue),
          required: (fieldData && fieldData.required),
          description: (fieldData && fieldData.description),
          values: ((fieldData && fieldData.options && fieldData.options.values) || ''),
          Truelabel: (fieldData && fieldData.Truelabel),
          Falselabel: (fieldData && fieldData.Falselabel),
          // trueLabel: (fieldData && fieldData.trueLabel),
          // falseLabel: (fieldData && fieldData.falseLabel),
          isMultiple: ((fieldData && fieldData.options && fieldData.options.isMultiple) || ''),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={handleValuesChange}
      >
        <Space direction="vertical" className={styles.structureModal}>
          <Card title="Field Details" style={{ width: 500 }}>
            <Form.Item style={{ marginBottom: '0' }}>
              <Form.Item
                label="Name"
                name="name"
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
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
                name="fieldId"
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                rules={[{ required: true, message: 'Please input your field ID!' }]}
              >
                <Input disabled={!!isEditable} />

              </Form.Item>
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
              <TextArea rows={2} defaultValue={(fieldData && fieldData.description) || ''} />
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
              name="isRequired"
              valuePropName="checked"
            >
              <Checkbox
                checked={(fieldData && fieldData.required) || false}
              >
                Required field

              </Checkbox>

            </Form.Item>
          </Card>

          <Card title="Appearance Details" style={{ width: 500 }}>
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
              <Select
                defaultValue={(fieldData && fieldData.type)}
                size="medium"
                // style={{ width: 200 }}
                placeholder="Select type of field..."
                onChange={(value) => handleOnDataTypeChange(value)}
                allowClear
              >
                {
              dataTypes.map((type) => (
                <Option value={type} key={type}>
                  {type}
                </Option>
              ))
              }
              </Select>
            </Form.Item>
            <Form.Item name="appearanceType" label="Appearance Type" rules={[{ required: true }]}>
              <Select
                size="medium"
                placeholder="Select type of  appearance field..."
                onChange={handleOnApperanceTypeChange}
              >
                {
            ((appearanceTypes && appearanceTypes[dataType])
            || (fieldData && appearanceTypes[fieldData.type]) || []).map((appType) => (
              <Option key={appType} value={appType}>
                {appType}
              </Option>
            ))
          }
              </Select>
            </Form.Item>
            {(() => {
              switch (appearanceType) {
                case 'Checkbox':
                  return (
                    <ValueNames fieldData={fieldData} />
                  );
                case 'FileUpload':
                  return (
                    <Form.Item
                      name="isMultiple"
                      valuePropName="checked"
                    >
                      <Checkbox>Multiple Files</Checkbox>
                    </Form.Item>
                  );

                case 'Switch':
                  return <Switch />;
                case 'Dropdown':
                  return <ValueNames />;
                case 'Radio':
                  return <ValueNames />;
                case 'Boolean radio':
                  return <Switch />;
                default:
                  return null;
              }
            })()}
          </Card>
        </Space>

        <Form.Item
          style={{ marginBottom: '0px' }}
        >
          {isEditable ? (
            <div className={styles.actionButton}>
              <Space wrap>
                <Button key="back" onClick={closeSchemaModal} htmlType="cancel">
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Space>
            </div>
          )
            : (
              <div className={styles.actionButton}>
                <Space wrap>

                  <Button key="back" htmlType="cancel" onClick={closeSchemaModal}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Space>
              </div>
            )}
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default StructureModal;
