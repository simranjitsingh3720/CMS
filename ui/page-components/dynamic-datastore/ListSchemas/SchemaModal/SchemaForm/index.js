import { Button, Form, Input, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styles from './style.module.scss';

function SchemaFrom({ form, onFinish, onFinishFailed, handleValuesChange, handleCancel }) {
  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="Schema Name"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your Schema Name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[{
            required: true,
            message: 'Please input your Slug!',
          },
          {
            pattern: new RegExp('^[A-Za-z0-9_]*$'),
            message: 'Only Letters and Numbers are accepted',
          },
          ]}
        >
          <Input />

        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              message: 'Please input your Description!',
            },
          ]}
        >
          <TextArea rows={2} />

        </Form.Item>

        <Form.Item style={{ marginBottom: '0px' }}>
          <div className={styles.actionButton}>
            <Space wrap>
              <Button onClick={handleCancel} htmlType="cancel">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SchemaFrom;
