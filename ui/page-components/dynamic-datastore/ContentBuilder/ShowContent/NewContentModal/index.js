import { Button, Form, Modal } from 'antd';
import { React } from 'react';
import moment from 'moment';
import { useRequest } from '../../../../../helpers/request-helper';
import GetFields, { getInitialValues } from './GetFields/GetFields';

export default function NewContentModal({
  closeContentModal,
  schemaDetails, getContent, isEditable, editableData,
  showContentModal,
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
    const x = { ...contentData };

    schemaDetails.schema.forEach((field) => {
      if (field.type === 'dateAndTime') {
        const dateFormat = 'YYYY/MM/DD HH:mm';
        const testDateUtc = moment.utc(x[field.id]);
        const localDate = testDateUtc.local();
        x[field.id] = localDate.format(dateFormat);
      }
    });
    if (schemaSlug) {
      addContent({
        url: `/content/${schemaSlug}`,
        data: { data: x },
      }).then((res) => {
        closeContentModal();
      }).then((res) => {
        getContent();
      });
    }
  };

  const handleUpdateContent = (contentData) => {
    const x = { ...contentData };

    schemaDetails.schema.forEach((field) => {
      if (field.type === 'dateAndTime') {
        const dateFormat = 'YYYY/MM/DD HH:mm';
        const testDateUtc = moment.utc(x[field.id]);
        const localDate = testDateUtc.local();
        x[field.id] = localDate.format(dateFormat);
      }
    });
    if (schemaSlug) {
      updateContent({
        url: `/content/${schemaSlug}/${editableData.id}`,
        data: { data: x },
      }).then((res) => {
        closeContentModal();
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
    <Modal
      title={isEditable ? 'Edit content' : 'Add new Content'}
      visible={showContentModal}
      onCancel={closeContentModal}
      width={700}
      footer={[]}
    >
      <Form
        name="Add new Content form"
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {fields && fields.map((field) => (
          GetFields(field.appearanceType, field)
        ))}
        {isEditable ? (
          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 14,
            }}
            style={{ marginBottom: '0px' }}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        ) : (
          <div>
            {schemaDetails.schema && schemaDetails.schema.length >= 1 ? (
              <Form.Item
                wrapperCol={{
                  offset: 10,
                  span: 14,
                }}
                style={{ marginBottom: '0px' }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            ) : (
              <div>
                Please add some fields in the table
              </div>
            )}
          </div>
        )}

      </Form>
    </Modal>
  );
}
