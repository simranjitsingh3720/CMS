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

  return (
    <Modal
      title="ADD NEW PAGE DETAILS"
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
      >
        <Form.Item
          label="Page Name"
          name="page"
          value={pageDetails.name}
          onChange={(e) => setPageDetails({ ...pageDetails, name: e.target.value })}
          rules={[{ required: true, message: 'Please enter Page Name!' }]}
        >
          <Input />
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
          ]}
        >
          <Input disabled={checked} />
        </Form.Item>

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
          <Space>
            <Button key="back" onClick={onFormClose}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft: '12px' }}>
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PageFormModal;
