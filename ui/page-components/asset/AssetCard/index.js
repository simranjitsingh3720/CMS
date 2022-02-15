import {
  Card, Button, message, Modal, Form, Input,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import useAxios from 'axios-hooks';
import { useState } from 'react';
import Asset from '../Asset';

const { Meta } = Card;
const { confirm } = Modal;

function AssetCard({ data, refetch }) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [{ deleteError }, handleDelete] = useAxios(
    {
      method: 'DELETE',
      url: `/api/asset/${data.id}`,
    },
    { manual: true },
  );

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        await handleDelete();
        if (deleteError) {
          message.error('Item not deleted');
        } else {
          message.success('Item Deleted');
          await refetch();
        }
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
  const [{ error },
    executePatch,
  ] = useAxios(
    {
      url: `/api/asset/${data.id}`,
      method: 'PATCH',
    },
    { manual: true },
  );
  const SubmitDetails = async (values) => {
    setLoading(true);
    await executePatch({
      data: {
        name: values.name ? values.name : data.name,
        description: values.description ? values.description : data.description,
      },
    });
    if (error) { message.error('Asset Not Updated'); } else {
      setLoading(false);
      form.resetFields();
      setVisible(false);
      message.success('Asset Updated');
      refetch();
    }
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
          <div />,
        ]}
      >
        <Form form={form} name="validate_other" {...formItemLayout} onFinish={SubmitDetails} loading={loading} initialValues={{ 'input-number': 3 }}>
          <Form.Item name="name" label="name">
            <Input placeholder={data.name} />
          </Form.Item>
          <Form.Item name="description" label="description">
            <Input placeholder={data.description} />
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
