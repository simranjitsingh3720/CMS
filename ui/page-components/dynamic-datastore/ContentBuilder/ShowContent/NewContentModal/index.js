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
  console.log('SCHEMA DETAILS ', schemaDetails);
  const fields = schemaDetails.list || [];
  const initialValues = getInitialValues(schemaDetails.list, editableData, isEditable);
  const schemaSlug = schemaDetails
  && schemaDetails.list && schemaDetails.list[0].schemaSlug; // need schema slug
  const schemaId = schemaDetails
  && schemaDetails.list && schemaDetails.list[0].id;
  const [loading, setLoading] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [disable, setDisable] = useState(false);
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
        data: { ...storeData },
        params: {
          schemaId,
        },
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
    console.log('CONTENT DATA ', { ...contentData }, x);

    const multiplePlaceholder = '';
    schemaDetails.list.forEach((field, index) => {
      if (field.type === 'Date and Time') {
        x[field.fieldId] = moment(x[field.fieldId]).toISOString(true);
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
        if (x[field.fieldId] === field.Truelabel) { // trueLabel
          x[field.fieldId] = true;
        } else if (x[field.fieldId] === field.Falselabel) {
          x[field.fieldId] = false;
        } else {
          x[field.fieldId] = '';
        }
      }

      if (field.type === 'Boolean' && field.appearanceType === 'Switch') {
        if (x[field.fieldId] !== true && x[field.fieldId] !== false) {
          x[field.fieldId] = false;
        }
      }
    });
    if (!isAsset) {
      setStoreData(x);
    }
  };

  const handleUpdateContent = (contentData) => {
    const x = { ...contentData };

    schemaDetails.list.forEach((field) => {
      if (field.type === 'Date and Time') {
        x[field.fieldId] = moment(x[field.fieldId]).toISOString(true);
      }

      if (field.type === 'Boolean' && field.appearanceType === 'Boolean radio') {
        if (x[field.fieldId] === field.Truelabel) { // trueLabel
          x[field.fieldId] = true;
        } else if (x[field.fieldId] === field.Falselabel) {
          x[field.fieldId] = false;
        } else {
          x[field.fieldId] = '';
        }
      }
    });
    if (schemaSlug) {
      updateContent({
        url: `/content/${schemaSlug}/${editableData.fieldId}`,
        data: { ...x },
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
    setDisable(false);
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
            {schemaDetails.list && schemaDetails.list.length >= 1 ? (
              <Form.Item
                style={{ marginBottom: '0px' }}
              >
                <div className={styles.actionButton}>
                  <Space wrap>
                    <Button key="back" onClick={closeContentModal} disabled={disable}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={() => { setDisable(true); setLoading(true); }}>
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
