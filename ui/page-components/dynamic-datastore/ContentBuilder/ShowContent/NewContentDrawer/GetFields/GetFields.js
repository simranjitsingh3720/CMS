import {
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Checkbox,
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const handleCheckBoxChange = (values) => {};

function GetFields(appearenceType, { name, required }) {
  switch (appearenceType) {
    case 'short':
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>
          <Input />
        </Form.Item>
      );

    case 'long':
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>
          <TextArea rows={4} />
        </Form.Item>
      );

    case 'number':
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>
          <InputNumber />
        </Form.Item>
      );

    case 'checkbox':
      const { values } = field.options;
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>

          <Checkbox.Group options={values} onChange={handleCheckBoxChange} />
        </Form.Item>
      );

    case 'radio':
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>
          <Radio.Group>
            <Radio.Item value="small">Small</Radio.Item>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
      );

    case 'dropdown':
      return (
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
      );

    case 'tags':
      return '';

    case 'dateAndTime':
      return (
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
      );

    case 'switch':
      return (
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
      );

    case 'boolean radio':
      return '';

    default:
      return '';
  }
}

export default GetFields;
