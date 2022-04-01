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
  const isAsset = false;
  const multipleAssets = [];

  const [{ }, executePost] = useRequest({ method: 'POST' }, { manual: true });

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
    console.log(storeData);
    if (storeData !== null) {
      addContent({
        url: `/content/${schemaSlug}`,
        data: { ...storeData },
        params: {
          schemaId,
        },
      }).then((res) => {
        message.success('Added Successfully');
        getContent();
      }).catch((err) => {
        getContent();
      });
    }
  }, [storeData]);

  const handleAddContent = (contentData) => {
    const x = { ...contentData };
    let uploadData = [];
    let count = 0;
    const handleReadURLs = [];

    schemaDetails.list.forEach((field) => {
      if (field.type === 'Date and Time') {
        x[field.fieldId] = moment(x[field.fieldId]).toISOString(true);
      }
      if (field.type === 'Assets') {
        if (x[field.id]) {
          handleReadURLs.push({ [field.id]: x[field.id].fileList.length });
          x[field.id].fileList.forEach((singleFile) => {
            uploadData = [...uploadData, singleFile];
            const { name } = singleFile;
            const mimeType = singleFile.type;
            const type = singleFile.type.split('/')[0];

            multipleAssets = [...multipleAssets, { name, type, mimeType }];
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
    if (uploadData.length > 0) {
      executePost({
        url: '/asset/bulkUpload',
        data: multipleAssets,
      })
        .then((res) => {
          const { writeUrlList, assetIdList, readUrlArr } = res.data;

          let usedUrls = 0;
          handleReadURLs.forEach((obj, index) => {
            const id = Object.keys(obj)[0];
            const totalUrls = handleReadURLs[index][id];
            let urlList = [];
            for (let i = 0; i < totalUrls; i += 1) {
              urlList = [...urlList, {
                url: readUrlArr[usedUrls],
                name: multipleAssets[usedUrls].name,
              }];
              usedUrls += 1;
            }
            x[id] = urlList;
            console.log('kwrfgewiufbewfbewuiofg ', x);
          });

          writeUrlList.forEach((writeUrl, index) => {
            axios.put(
              writeUrl,
              uploadData[index].originFileObj,
              {
                headers: { type: uploadData[index].originFileObj.type, 'Content-Type': `${uploadData[index].originFileObj.type}` },
              },
            )
              .then((result) => {
                // console.log(result);
                count += 1;
                setLoading(false);
                setStoreData(x);
                closeContentModal();
              });
          });
        });
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
