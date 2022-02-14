import {
  Card, Button, message, Modal, Form, Input,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useState } from 'react';
import Asset from '../Asset';

const { Meta } = Card;
const { confirm } = Modal;

function AssetCard({ data, refetch }) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.delete(`http://localhost:8000/api/asset/${data.id}`)
          .then(() => {
            message.success('Item Deleted');
            refetch();
          })
          .catch(() => message.error('Item Not Deleted'));
      },
      onCancel() {
      },
    });
  };
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 17,
    },
  };

  const showModal = () => {
    setVisible(true);
  };
  const SubmitDetails = (values) => {
    setLoading(true);
    axios.patch(`http://localhost:8000/api/asset/${data.id}`, {
      name: values.name, description: values.description,
    })
      .then(() => {
        setLoading(false);
        form.resetFields();
        setVisible(false);
        message.success('Asset Updated');
        refetch();
      })
      .catch(() => message.error('Asset Not Updated'));
  };
  const handleOk = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Card
        style={{ width: 280, padding: '0px 15px', paddingTop: '15px', borderRadius: '8px' }}
        className="Asset-card"
        cover={(<Asset data={data} />
    )}
        actions={[
          <Button onClick={showModal} style={{ border: '0px' }}><EditOutlined key="edit" /></Button>,
          <Button onClick={showConfirm} style={{ border: '0px' }}><DeleteOutlined key="delete" /></Button>,
        ]}
      >
        <Meta
          title={data.name}
          description={data.description}
          style={{ padding: '0px' }}
        />
      </Card>
      <Modal
        visible={visible}
        title="Update Asset"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      >
        <Form form={form} name="validate_other" {...formItemLayout} onFinish={SubmitDetails} loading={loading} initialValues={{ 'input-number': 3 }}>
          <Form.Item name="name" label="name">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="description">
            <Input />
          </Form.Item>
          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
}
export default AssetCard;
