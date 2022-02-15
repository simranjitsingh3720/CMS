import useAxios from 'axios-hooks';
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

  // USEAXIOS FOR POSTING DATA , (EXCEPT IMAGE)
  // eslint-disable-next-line no-empty-pattern
  const [{ }, handlePost] = useAxios(
    {
      method: 'POST',
    },
    { manual: true },
  );

  // USEAXIOS FOR UPDATING DATA WITH ASSET/IMAGE LINK
  // eslint-disable-next-line no-empty-pattern
  const [{}, handlePut] = useAxios(
    {
      method: 'PUT',

    },
    { manual: true },
  );

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

    handlePost({
      url: '/api/asset/',
      data: {
        name: values.name,
        description: values.description,
        mimeType: values.upload[0].originFileObj.type,
        type: values.upload[0].originFileObj.type.split('/')[0],
      },
    }).then((res) => {
      const WRITEURL = res.data.writeUrl;
      const FILE = values.upload[0].originFileObj;
      handlePut({
        url: WRITEURL,
        data: FILE,
        headers: { type: values.upload[0].originFileObj.type },
      })
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
    }).catch(() => { message.error("Couldn't upload"); });
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
