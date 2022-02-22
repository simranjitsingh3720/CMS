import {
  Form, Input, Button, message, Checkbox, Drawer,
} from 'antd';
import useAxios from 'axios-hooks';

function AssetEditForm({ onFormClose, visible, setVisible, data }) {
  const [{ error },
    executePatch,
  ] = useAxios(
    {
      url: `/api/asset/${data}`,
      method: 'PATCH',
    },
    { manual: true },
  );
  console.log(data);
  // const SubmitDetails = async (values) => {
  //   await executePatch({
  //     data: {
  //       name: values.name || data.name,
  //       description: values.description || data.description,
  //     },
  //   });
  //   if (error) {
  //     message.error('Asset Not Updated');
  //   } else {
  //     refetch();
  //     setVisible(false);
  //     message.success('Asset Updated');
  //   }
  // };
  return (
    <Drawer title="Create New Page" placement="right" onClose={onFormClose} visible={visible}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ name: data, slug: data }}
        autoComplete="off"
      >
        <Form.Item
          label="Page Name"
          name="name"
          rules={[{ required: true, message: 'Please enter Page Name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="index"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
          onChange={() => {

          }}
        >
          <Checkbox>Make this Page Home</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
export default AssetEditForm;
