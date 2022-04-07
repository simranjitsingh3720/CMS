import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  message,
  Checkbox,
  Modal,
  Space,
} from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useRequest } from '../../../../helpers/request-helper';
import styles from '../style.module.scss';

function PageFormModal({ onFormClose, visible, setVisible }) {
  // const [pageDetails, setPageDetails] = useState({
  //   name: '',
  //   slug: '',
  //   isHome: 0,
  // });
  const [checked, setChecked] = useState(false);
  const [slugName, setSlugName] = useState('');

  const [slugRule, setSlugRule] = useState(true);

  const [form] = Form.useForm();
  const { push } = useRouter();

  const [{}, executePost] = useRequest(
    {
      url: '/createPage',
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  const onFinish = (values) => {
    console.log(values);
    executePost({
      data: {
        ...values,
      },
    })
      .then(() => {
        setVisible(false);
        message.success('Page Created Successfully', 5);
        if (values.slug) {
          push(
            '/admin/page-manager/builder/[pageID]',
            `/admin/page-manager/builder/${values.slug}`,
          );
        }
        push('/admin/page-manager/builder');
      })
      .catch((err) => {
        message.info(err.response.data.message || err.response.data.messages[0]);
      });
  };

  const handleValuesChange = (changedValues) => {
    if (changedValues.slug) {
      // const suggestedID = (changedValues.slug || '').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
      // form.setFieldsValue({ slug: suggestedID });
      // setSlugName(_.snakeCase(changedValues.slug));
      setSlugName(changedValues.slug);
    } else {
      setSlugName('');
    }
    if (changedValues.name !== '' && changedValues.name !== undefined) {
      console.log('changedValues.name ');
      form.setFieldsValue({ slug: _.snakeCase(changedValues.name) });
    }

    if (changedValues.name === '') {
      form.setFieldsValue({ slug: '' });
    }
  };

  const manipulateSlugString = (title) => {
    // const manipulatedSlug = (title || '').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
    setSlugName(_.snakeCase(title));
  };

  return (
    <Modal
      title="Add new page"
      onCancel={onFormClose}
      visible={visible}
      footer={null}
    >
      <Form
        name="basic"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        autoComplete="off"
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="Page Name"
          name="name"
          onChange={(e) => manipulateSlugString(e.target.value)}
          rules={[
            { required: true, message: 'Please enter Page Name!' }, {
              max: 30,
              message: 'Page name cannot be longer than 30 characters',
            }]}
        >
          <Input autoFocus maxLength={31} />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[
            { required: slugRule, message: 'Please enter Page Slug!' },
            {
              pattern: new RegExp('^[A-Za-z0-9_]*$'),
              message: 'Only Letters, Numbers and underscore are accepted',
            },
            {
              pattern: new RegExp('^(?!.*admin).*$'),
              message: 'Cannot use admin as slug',
            },
            {
              max: 30,
              message: 'Slug cannot be longer than 30 characters',
            },
          ]}
        >
          <Input maxLength={31} />
        </Form.Item>

        {console.log(slugName)}
        { slugName !== ''
          ? (
            <p>
              This page will be hosted on
              {' '}
              <span style={{ fontWeight: 'bold' }}>
                {process.env.NEXT_PUBLIC_APP_LIVE_URL}
                /
                {slugName}
              </span>
            </p>
          ) : null}

        {/* <Form.Item
          name="isHome"
          valuePropName="checked"
          // onChange={() => {
          //   if (!checked) {
          //     setPageDetails({ ...pageDetails, slug: '', isHome: 1 });
          //   } else {
          //     setPageDetails({ ...pageDetails, isHome: 0 });
          //     form.resetFields();
          //   }
          //   setChecked(!checked);
          //   setSlugRule(!slugRule);
          // }}
        >
          <Checkbox>Make this Page Home</Checkbox>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{ offset: 15, span: 15 }}
          style={{ marginBottom: '0px' }}
        >
          <div className={styles.actionButton}>
            <Space wrap>
              <Button key="back" onClick={onFormClose}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PageFormModal;
