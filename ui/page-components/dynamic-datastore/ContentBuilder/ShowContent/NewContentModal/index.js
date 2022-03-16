import { Button, Form, message, Modal, Space } from 'antd';
import { React } from 'react';
import moment from 'moment';
import { useRequest } from '../../../../../helpers/request-helper';
import GetFields, { getInitialValues } from './GetFields/GetFields';
import styles from './style.module.scss';

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
      if (field.type === 'Date and Time') {
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
      }).then(() => {
        closeContentModal();
        message.success('Added Successfully');
      }).then(() => {
        getContent();
      }).catch((err) => {
        message.error(err.response.data.message || err.response.data.messages[0]);
      });
    }
  };

  const handleUpdateContent = (contentData) => {
    const x = { ...contentData };

    schemaDetails.schema.forEach((field) => {
      if (field.type === 'Date and Time') {
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
      }).then(() => {
        closeContentModal();
        message.success('Updated Successfully');
      }).then(() => {
        getContent();
      }).catch((err) => {
        message.error(err.response.data.message || err.response.data.messages[0]);
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

  const onFinishFailed = () => {
    message.error('Fields are required');
  };

  return (
    <Modal
      title={isEditable ? 'Edit content' : 'Add new content'}
      visible={showContentModal}
      onCancel={closeContentModal}
      width={700}
      footer={null}
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
            style={{ marginBottom: '0px' }}
          >
            <div className={styles.actionButton}>
              <Space wrap>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
                <Button key="back" onClick={closeContentModal}>
                  Cancel
                </Button>
              </Space>
            </div>

          </Form.Item>
        ) : (
          <div>
            {schemaDetails.schema && schemaDetails.schema.length >= 1 ? (
              <Form.Item
                style={{ marginBottom: '0px' }}
              >
                <div className={styles.actionButton}>
                  <Space wrap>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button key="back" onClick={closeContentModal}>
                      Cancel
                    </Button>
                  </Space>
                </div>
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
