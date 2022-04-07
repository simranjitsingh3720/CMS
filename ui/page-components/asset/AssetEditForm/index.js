import { Form, Input, Button, message, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import { useRequest } from '../../../helpers/request-helper';
import styles from '../AssetModal/style.module.scss';

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
        rules={[{ required: true, message: 'Please enter name!!' }, { max: 100 },
          {
            pattern: /^[A-Za-z0-9._@./#&+-/\\!\\=%^~`$*()"'<>:;?{}|]+(?: +[A-Za-z0-9._@./#&+-/\\!\\=%^~`$*()"'<>:;?{}|]+)*$/,
            message: 'Whitespace are not allowed at start and end of Schema Name',
          },
        ]}
      >
        <Input maxLength={101} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <TextArea rows={2} maxLength={200} showCount />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: loading ? 14 : 15,
        }}
        style={{ marginBottom: '0px' }}

      >
        <div className={styles.actionButton}>
          <Space wrap>
            <Button key="back" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="primary" loading={loading} htmlType="submit">
              Submit
            </Button>

          </Space>
        </div>
      </Form.Item>

    </Form>
  );
}
export default AssetEditForm;
