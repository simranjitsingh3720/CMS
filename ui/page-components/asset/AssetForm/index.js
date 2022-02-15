import Axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
} from 'antd';
import { useState } from 'react';

function AssetForm({ CloseDrawer, refetch }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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

    return e && e.fileList;
  };

  const SubmitDetails = (values) => {
    setLoading(true);
    Axios.post('http://localhost:8000/api/asset', {
      name: values.name, description: values.description, mimeType: values.upload[0].originFileObj.type, type: values.upload[0].originFileObj.type.split('/')[0],
    })
      .then((res) => {
        Axios.put(
          res.data.writeUrl,
          values.upload[0].originFileObj,
          { headers: { type: values.upload[0].originFileObj.type } },
        )
          .then(() => {
            setLoading(false);
            form.resetFields();
            CloseDrawer();
            message.success('Asset Added');
            refetch();
          })
          .catch(() => {
            message.error('Asset Not Added');
            setLoading(false);
          });
      });
  };

  return (
    <Form form={form} name="validate_other" {...formItemLayout} onFinish={SubmitDetails} initialValues={{ 'input-number': 3 }}>
      <Form.Item name="name" label="name" rules={[{ required: true, message: 'Please enter name!!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="description" rules={[{ required: true, message: 'Please enter description!!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="upload" label="Upload" valuePropName="fileList" rules={[{ required: true }]} getValueFromEvent={normFile}>
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" loading={loading} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AssetForm;
