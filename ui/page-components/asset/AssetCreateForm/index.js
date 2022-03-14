import { UploadOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
} from 'antd';
import { useState } from 'react';
import { useRequest } from '../../../helpers/request-helper';

function AssetCreateForm({ CloseModal, refetch }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [assetTitle, setAssetTitle] = useState('');

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 17,
    },
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    setAssetTitle(e.file.name);
    form.setFieldsValue({ name: assetTitle });
    return e && e.fileList;
  };

  // eslint-disable-next-line no-empty-pattern
  const [{}, executePost] = useRequest(
    {
      url: '/asset/',
      method: 'POST',
    },
    { manual: true },
  );
  // eslint-disable-next-line no-empty-pattern
  const [{}, executePut] = useRequest(
    {
      method: 'PUT',
    },
    { manual: true },
  );

  const SubmitDetails = (values) => {
    setLoading(true);
    executePost({
      data: {
        name: values.name,
        description: values.description,
        mimeType: values.upload[0].originFileObj.type,
        type: values.upload[0].originFileObj.type.split('/')[0],
      },
    })
      .then((res) => {
        const { writeUrl } = res.data;
        const file = values.upload[0].originFileObj;
        executePut({
          url: writeUrl,
          data: file,
          headers: { type: values.upload[0].originFileObj.type },
        })
          .then(() => {
            setLoading(false);
            form.resetFields();
            CloseModal();
            message.success('Asset Added');
            refetch();
          })
          .catch(() => {
            setLoading(false);
            CloseModal();
            refetch();
            message.error('Asset Not Added');
          });
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="validate_other"
      onFinish={SubmitDetails}
    >
      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        rules={[{ required: true }]}
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture" maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter name!!' }]}
      >
        <Input value={assetTitle} onChange={(e) => setAssetTitle(e.target.value)} />
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
          offset: 20,
        }}
      >
        <Button type="primary" loading={loading} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AssetCreateForm;
