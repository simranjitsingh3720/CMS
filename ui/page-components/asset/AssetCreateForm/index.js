import { UploadOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Space,
} from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from '../../../helpers/request-helper';
import styles from '../AssetModal/style.module.scss';

const { TextArea } = Input;

function AssetCreateForm({ closeModal, refetch }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [assetTitle, setAssetTitle] = useState('');
  const [disabled, setDisabled] = useState(false);

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
    setDisabled(true);
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
          headers: { type: values.upload[0].originFileObj.type, 'Content-Type': `${values.upload[0].originFileObj.type}` },
        })
          .then(() => {
            setLoading(false);
            // form.resetFields();
            closeModal();
            message.success('Asset Added Successfully !!!');
            refetch();
          })
          .catch((err) => {
            setLoading(false);
            closeModal();
            refetch();
            message.error(err.response.data.message || err.response.data.messages[0]);
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
        <Upload
          name="logo"
          action="/upload.do"
          listType="picture"
          maxCount={1}
          accept="image/*,video/*,audio/*,.pdf"
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter name!!' },
        ]}
      >
        <Input value={assetTitle} onChange={(e) => setAssetTitle(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <TextArea rows={2} maxLength={100} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 20,
          offset: loading ? 14 : 15,
        }}
        style={{ marginBottom: '0px' }}
      >
        <div className={styles.actionButton}>
          <Space wrap>
            <Button key="back" onClick={closeModal} disabled={disabled}>
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

export default AssetCreateForm;
