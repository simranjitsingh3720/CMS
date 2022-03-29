import { Button, Form, message, Modal, Space } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useRequest } from '../../../../../helpers/request-helper';
import GetFields, { getInitialValues } from './GetFields/GetFields';
import styles from './style.module.scss';

export default function NewContentModal({
  closeContentModal,
  schemaDetails, getContent, isEditable, editableData,
  isContentModal,
}) {
  const fields = schemaDetails.schema || [];
  const initialValues = getInitialValues(schemaDetails.schema, editableData, isEditable);
  const schemaSlug = schemaDetails.slug;
  const [loading, setLoading] = useState(false);
  const [storeData, setStoreData] = useState(null);

  let isAsset = false;

  // eslint-disable-next-line no-empty-pattern
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

  useEffect(() => {
    if (storeData !== null) {
      addContent({
        url: `/content/${schemaSlug}`,
        data: { data: storeData },
      }).then((res) => {
        message.success('Added Successfully');
        if (!isAsset) {
          setLoading(false);
          closeContentModal();
        }
        getContent();
      }).catch((err) => {
        getContent();
      });
    }
  }, [storeData]);

  const handleAddContent = (contentData) => {
    const x = { ...contentData };
    const multiplePlaceholder = '';
    schemaDetails.schema.forEach((field, index) => {
      if (field.type === 'Date and Time') {
        x[field.id] = moment(x[field.id]).toISOString(true);
      }
      if (field.type === 'Assets' && x[field.id]) {
        isAsset = true;
        if (x[field.id]) {
          // console.log('array: ', x[field.id].fileList);

          // console.log(x[field.id].fileList.length);
          x[field.id].fileList.forEach((xy) => {
            // const name = xy[field.id] && xy[field.id].file.name;
            console.log('full :', xy);
            const { name } = xy;
            console.log('name: ', name);
            const mimeType = xy.type;
            console.log('mimeType:', mimeType);

            // const type = xy[field.id] && xy[field.id].file.type.split('/')[0];
            const type = xy.type.split('/')[0];
            console.log('type:', type);

            console.log('field data: ', xy[field.id]);

            axios.post('/api/v1/asset', {
              name,
              type,
              mimeType,
            })
              .then((res) => {
                console.log('response : ', res);
                const { writeUrl, readUrl } = res.data;
                const FileData = xy.originFileObj;
                const headerType = xy.originFileObj.type;

                axios.put(
                  writeUrl,
                  FileData,
                  {
                    headers: { type: headerType, 'Content-Type': `${headerType}` },
                  },
                )
                  .then(() => {
                    setLoading(false);
                    setStoreData(x);
                    closeContentModal();
                  })
                  .catch((err) => console.log(err));
                x[field.id] = {
                  name,
                  readUrl,
                };
              })
              .catch((err) => console.log(err));
            // ======
          });
        }
      }
      if (field.type === 'Boolean' && field.appearanceType === 'Boolean radio') {
        if (x[field.id] === field.Truelabel) {
          x[field.id] = true;
        } else if (x[field.id] === field.Falselabel) {
          x[field.id] = false;
        } else {
          x[field.id] = '';
        }
      }

      if (field.type === 'Boolean' && field.appearanceType === 'Switch') {
        if (x[field.id] !== true && x[field.id] !== false) {
          x[field.id] = false;
        }
      }
    });
    if (!isAsset) {
      setStoreData(x);
    }
  };

  const handleUpdateContent = (contentData) => {
    const x = { ...contentData };

    schemaDetails.schema.forEach((field) => {
      if (field.type === 'Date and Time') {
        x[field.id] = moment(x[field.id]).toISOString(true);
      }

      if (field.type === 'Boolean' && field.appearanceType === 'Boolean radio') {
        if (x[field.id] === field.Truelabel) {
          x[field.id] = true;
        } else if (x[field.id] === field.Falselabel) {
          x[field.id] = false;
        } else {
          x[field.id] = '';
        }
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
    setLoading(false);
    message.error('Fields are required');
  };

  return (
    <Modal
      title={isEditable ? 'Edit content' : 'Add new content'}
      visible={isContentModal}
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
          GetFields(field.appearanceType, field, isEditable)
        ))}
        {isEditable ? (
          <Form.Item
            style={{ marginBottom: '0px' }}
          >
            <div className={styles.actionButton}>
              <Space wrap>
                <Button key="back" onClick={closeContentModal}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Update
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
                    <Button key="back" onClick={closeContentModal}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={() => setLoading(true)}>
                      Submit
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
