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
import { useRouter } from 'next/router';
import { useRequest } from '../../../../helpers/request-helper';
import styles from '../style.module.scss';

function PageFormModal({ onFormClose, visible, setVisible }) {
  const [pageDetails, setPageDetails] = useState({
    name: '',
    slug: '',
    isHome: 0,
  });
  const [checked, setChecked] = useState(false);
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

  const handleCreatePage = () => {
    executePost({
      data: {
        ...pageDetails,
      },
    })
      .then(() => {
        setVisible(false);
        message.success('Page Created Successfully', 5);
        if (pageDetails.slug) {
          push(
            '/admin/page-manager/builder/[pageID]',
            `/admin/page-manager/builder/${pageDetails.slug}`,
          );
        }
        push('/admin/page-manager/builder');
      })
      .catch((err) => {
        message.info(err.response.data.message || err.response.data.messages[0]);
      });
  };
  const [slugName, setSlugName] = useState('');

  const handleValuesChange = (changedValues) => {
    if (changedValues.slug) {
      const suggestedID = (changedValues.slug || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      setSlugName(suggestedID);
    }
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
        onFinish={handleCreatePage}
        initialValues={{ remember: true }}
        autoComplete="off"
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="Page Name"
          name="page"
          value={pageDetails.name}
          onChange={(e) => setPageDetails({ ...pageDetails, name: e.target.value })}
          rules={[{ required: true, message: 'Please enter Page Name!' }]}
        >
          <Input autoFocus maxLength={30} />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          value={pageDetails.slug}
          onChange={(e) => setPageDetails({ ...pageDetails, slug: e.target.value })}
          rules={[
            { required: slugRule, message: 'Please enter Page Slug!' },
            {
              pattern: new RegExp('^[A-Za-z0-9]*$'),
              message: 'Only Letters and Numbers are accepted',
            },
            {
              pattern: new RegExp('^(?!.*admin).*$'),
              message: 'Cannot use admin as slug',
            },
          ]}
        >
          <Input disabled={checked} maxLength={30} />
        </Form.Item>

        { pageDetails.slug
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
          ) : ''}

        <Form.Item
          name="index"
          valuePropName="checked"
          onChange={() => {
            if (!checked) {
              setPageDetails({ ...pageDetails, slug: '', isHome: 1 });
            } else {
              setPageDetails({ ...pageDetails, isHome: 0 });
              form.resetFields();
            }
            setChecked(!checked);
            setSlugRule(!slugRule);
          }}
        >
          <Checkbox>Make this Page Home</Checkbox>
        </Form.Item>

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
