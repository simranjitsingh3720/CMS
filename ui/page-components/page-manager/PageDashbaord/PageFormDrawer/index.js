import {
  Button, Drawer, Form, Input,
} from 'antd';

function PageFormDrawer(props) {
  const pageFormDetails = props.pageDetails;
  return (
    <Drawer title="Create New Page" placement="right" onClose={props.onFormClose} visible={props.visible}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Page Name"
          name="page"
          value={props.pageDetails.name}
          onChange={(e) => props.setPageDetails({ ...pageFormDetails, name: e.target.value })}
          rules={[{ required: true, message: 'Please enter Page Name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          value={props.pageDetails.slug}
          onChange={(e) => props.setPageDetails({ ...pageFormDetails, slug: e.target.value })}
          rules={[{ required: true, message: 'Please enter Page Slug!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={props.handleCreatePage}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default PageFormDrawer;
