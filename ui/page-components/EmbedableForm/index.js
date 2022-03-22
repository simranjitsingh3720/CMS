import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, message, Space } from 'antd';
import moment from 'moment';
import { useRequest } from '../../helpers/request-helper';
import styles from './style.module.scss';
import GetFields, { getInitialValues } from '../dynamic-datastore/ContentBuilder/ShowContent/NewContentModal/GetFields/GetFields';

export default function EmbedableForm() {
  const [formDetails, setFormDetails] = useState([]);

  const router = useRouter();
  const { formId } = router.query;

  const initialValues = getInitialValues(formDetails.schema);

  const [{ }, fetchFormData] = useRequest({
    method: 'GET',
  }, {
    manual: true,
  });

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
      }).then((res) => {
        setFormDetails(res.data);
      }).catch((err) => {
        console.log('error ', err);
      });
    }
  }, [formId]);

  const handleAddContent = (contentData) => {
    const x = { ...contentData };

    formDetails.schema.forEach((field) => {
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

      if (field.type === 'Boolean' && field.appearanceType === 'Switch') {
        if (x[field.id] !== true && x[field.id] !== false) {
          x[field.id] = false;
        }
      }
    });

    if (formDetails.slug) {
      addContent({
        url: `/content/${formDetails.slug}`,
        data: { data: x },
      }).then(() => {
        message.success('Added Successfully');
      }).then(() => {
        // getContent();
        // will show them message of successfully submitted- submit another response
      }).catch((err) => {
        message.error(err.response.data.message || err.response.data.messages[0]);
      });
    }
  };

  const onFinish = async (contentData) => {
    handleAddContent(contentData);
  };

  const onFinishFailed = () => {
    message.error('Fields are required');
  };

  return (
    <div className={styles.sharableForm}>
      <div
        className={styles.formFields}
      >
        <Form
          name="Add new Content form"
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {formDetails.schema && formDetails.schema.map((field) => (
            GetFields(field.appearanceType, field)
          ))}
          <div>
            {formDetails.schema && formDetails.schema.length >= 1 ? (
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
                Please add some fields in the form
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
