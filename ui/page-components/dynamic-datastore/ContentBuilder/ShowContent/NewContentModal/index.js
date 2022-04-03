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
  let multipleAssets = [];

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
    if (storeData !== null) {
      addContent({
        url: `/content/${schemaSlug}`,
        data: { ...storeData },
        params: {
          schemaId,
        },
      }).then(() => {
        message.success('Added Successfully');
        if (!isAsset) {
          setLoading(false);
          closeContentModal();
        }
        getContent();
      }).catch(() => {
        getContent();
      });
    }
  }, [storeData]);

  const handleAddContent = (contentData) => {
    console.log('CONTENTD ATATATAATAAT ', contentData);

    const x = { ...contentData };
    let uploadData = [];
    let count = 0;
    const handleReadURLs = [];

    schemaDetails.list.forEach((field) => {
      if (field.type === 'Date and Time') {
        x[field.fieldId] = moment(x[field.fieldId]).toISOString(true);
      }
      if (field.type === 'Assets') {
        if (x[field.fieldId]) {
          isAsset = true;
          handleReadURLs.push({ [field.fieldId]: x[field.fieldId].fileList.length });
          x[field.fieldId].fileList.forEach((singleFile) => {
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
            x[id] = JSON.stringify(urlList);
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
                console.log('kwrfgewiufbewfbewuiofg ', x);
                count += 1;
                setLoading(false);
                setStoreData(x);
                closeContentModal();
              });
          });
        });
    }

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
      console.log('UPDATED DATA ', x);

      updateContent({
        url: `/content/${schemaSlug}/${editableData.id}`,
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
