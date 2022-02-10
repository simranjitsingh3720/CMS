import Axios from 'axios';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Upload,
} from 'antd';

function AssetForm() {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const SubmitDetails = (values) => {
    Axios.post('http://localhost:8000/api/asset', {
      name: values.name, description: values.description, mimeType: values.upload[0].originFileObj.type, type: values.upload[0].originFileObj.type.split('/')[0],
    })
      .then((res) => {
        Axios.put(
          res.data.writeUrl,
          values.upload[0].originFileObj,
          { headers: { type: values.upload[0].originFileObj.type } },
        )
          .then(() => { });
      });
  };

  return (
    <Form name="validate_other" {...formItemLayout} onFinish={SubmitDetails} initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}>
      <Form.Item name="name" label="name" rules={[{ required: true, message: 'Please select your country!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="description" rules={[{ required: true, message: 'Please select your country!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="upload" label="Upload" valuePropName="fileList" rules={[{ required: true }]} extra="longgggggggggggggggggggggggggggggggggg">
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item name="dragger" valuePropName="fileList" noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AssetForm;
