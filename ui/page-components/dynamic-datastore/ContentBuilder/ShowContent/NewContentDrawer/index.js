import { Button, Card, Drawer, Form } from 'antd';
import React from 'react';
import { useRequest } from '../../../../../helpers/request-helper';
import GetFields, { getInitialValues } from './GetFields/GetFields';

export default function NewContentDrawer({
  closeContentDrawer,
  schemaDetails, getContent, isEditable, editableData,
}) {
  const fields = schemaDetails.schema || [];
  const initialValues = getInitialValues(schemaDetails.schema, editableData, isEditable);
  const schemaSlug = schemaDetails.slug;
  const [{}, addContent] = useRequest(
    {
      method: 'POST',
    },
    { manual: true },
  );

  const [{}, updateContent] = useRequest(
    {
      method: 'PATCH',
    },
    { manual: true },
  );

  const handleAddContent = (contentData) => {
    if (schemaSlug) {
      addContent({
        url: `/content/${schemaSlug}`,
        data: { data: contentData },
      }).then((res) => {
        closeContentDrawer();
      }).then((res) => {
        getContent();
      });
    }
  };

  const handleUpdateContent = (contentData) => {
    if (schemaSlug) {
      updateContent({
        url: `/content/${schemaSlug}/${editableData.id}`,
        data: { data: contentData },
      }).then((res) => {
        closeContentDrawer();
      }).then((res) => {
        getContent();
      });
    }
  };

  const onFinish = async (contentData) => {
    if (isEditable) {
      handleUpdateContent(contentData);
    } else {
      handleAddContent(contentData);
    }
  };

  const onFinishFailed = (errorInfo) => {
  };

  return (
    <Drawer title={isEditable ? 'Edit content' : 'Add new Content'} placement="right" onClose={closeContentDrawer} size="large" visible>
      <Form
        name="Add new Content form"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Card title="Field Contents" style={{ width: 650 }}>
          {fields && fields.map((field) => (
            GetFields(field.appearanceType, field)
          ))}
          {isEditable ? (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          ) : (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          )}
        </Card>

      </Form>
    </Drawer>
  );
}
