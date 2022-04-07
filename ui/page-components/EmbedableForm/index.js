import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, message, Space } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { useRequest } from '../../helpers/request-helper';
import styles from './style.module.scss';
import GetFields, { getInitialValues } from '../dynamic-datastore/ContentBuilder/ShowContent/NewContentModal/GetFields/GetFields';

export default function EmbedableForm() {
  const [formDetails, setFormDetails] = useState([]);
  const [formError, setFormError] = useState('');
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [disable, setDisable] = useState(false);

  const router = useRouter();
  const { formId, embed } = router.query;
  const initialValues = getInitialValues(formDetails);
  let isAsset = false;
  let multipleAssets = [];

  const [{ }, fetchFormData] = useRequest({
    method: 'GET',
  }, {
    manual: true,
  });
  const [{ }, executePost] = useRequest({ method: 'POST' }, { manual: true });

  const [{}, addContent] = useRequest(
    {
      method: 'POST',
    },
    { manual: true },
  );

  useEffect(() => {
    if (formId) {
      fetchFormData({
        url: `/form/${formId}`,
        params: {
          embed: !!embed,
        },
      }).then((res) => {
        setFormDetails(res.data);
      }).catch((err) => {
        setFormError(err.response.data.message || err.response.data.messages[0]);
      });
    }
  }, [formId]);

  useEffect(() => {
    if (storeData !== null) {
      addContent({
        url: `/form/content/${formDetails[0].schemaSlug}`,
        data: { ...storeData },
        params: {
          formId,
        },
      }).then(() => {
        if (!isAsset) {
          setLoading(false);
        }
        setFormSubmitSuccess(true);
        // getContent();
      }).catch((err) => {
        message.error(err.response.data.message || err.response.data.messages[0]);
      });
    }
  }, [storeData]);

  const handleAddContent = (contentData) => {
    const x = { ...contentData };
    let uploadData = [];
    const handleReadURLs = [];

    formDetails.forEach((field) => {
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

      if (field.type === 'Boolean' && field.appearanceType === 'Switch') {
        if (x[field.fieldId] !== true && x[field.fieldId] !== false) {
          x[field.fieldId] = false;
        }
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
    });

    // if (formDetails && formDetails[0].schemaSlug) {
    //   addContent({
    //     url: `/form/content/${formDetails[0].schemaSlug}`,
    //     data: { data: x },
    //   }).then(() => {
    //     setFormSubmitSuccess(true);
    //   }).catch((err) => {
    //     message.error(err.response.data.message || err.response.data.messages[0]);
    //   });
    // }

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
              .then(() => {
                setLoading(false);
                setStoreData(x);
              });
          });
        });
    }

    if (!isAsset) {
      setStoreData(x);
    }
  };

  const onFinish = async (contentData) => {
    handleAddContent(contentData);
  };

  const onFinishFailed = () => {
    setLoading(false);
    setDisable(false);
  };

  return (
    <div className={styles.sharableForm}>
      <div
        className={styles.formFields}
      >
        {Object.keys(initialValues).length > 0
          ? (
            <Form
              name="Add new Content form"
              layout="vertical"
              initialValues={initialValues}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >

              {formSubmitSuccess ? (
                <div className={styles.formError}>
                  <div>
                    <h2>
                      Form Submitted successfully
                    </h2>
                    <div>
                      <a
                        href={window.location.href}
                        style={{ cursor: 'pointer' }}
                      >
                        Submit another response
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {formError !== '' ? (
                    <div className={styles.formError}>
                      <h2>{formError}</h2>
                    </div>
                  ) : (
                    <>
                      { formDetails.map((field) => (
                        GetFields(field.appearanceType, field)
                      ))}
                      <div>
                        {formDetails.length >= 1 ? (
                          <Form.Item
                            style={{ marginBottom: '0px' }}
                          >
                            <div className={styles.actionButton}>
                              <Space wrap>
                                <Button type="primary" htmlType="submit">
                                  Submit
                                </Button>
                              </Space>
                            </div>
                          </Form.Item>
                        ) : (
                          <div>
                            No fields Found in the form.
                            Please add some fields in the form
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

            </Form>
          ) : ''}
      </div>
    </div>
  );
}
