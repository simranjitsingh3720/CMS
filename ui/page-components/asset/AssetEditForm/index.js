import { Form, Input, Button, message, Space } from 'antd';
import { useState } from 'react';
import { useRequest } from '../../../helpers/request-helper';

function AssetEditForm({ refetch, data, closeModal }) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  form.setFieldsValue({
    name: data.name,
    description: data.description,
  });

  const [{ error },
    executePatch,
  ] = useRequest(
    {
      url: `/asset/${data.id}`,
      method: 'PATCH',
    },
    { manual: true },
  );
  const SubmitDetails = async (values) => {
    setLoading(true);
    await executePatch({
      data: {
        name: values.name || data.name,
        description: values.description || data.description,
      },
    });
    if (error) {
      message.error(error.response.data.message[0] || error.response.data.message);
    } else {
      setLoading(false);
      refetch();
      form.resetFields();
      closeModal();
      message.success('Asset updated successfully !!!!');
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      name="validate_other"
      onFinish={SubmitDetails}
      loading={loading}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter name!!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: loading ? 14 : 15,
        }}
        style={{ marginBottom: '0px' }}

      >
        <Space wrap>
          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
          <Button key="back" onClick={closeModal}>
            Cancel
          </Button>
        </Space>
      </Form.Item>

    </Form>
  );
}
export default AssetEditForm;
