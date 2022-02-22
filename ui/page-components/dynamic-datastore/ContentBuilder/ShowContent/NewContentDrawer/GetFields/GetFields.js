import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const handleCheckBoxChange = (values) => {};

function GetFields(appearenceType, field) {
  switch (appearenceType) {
    case 'short':
      return (
        <Form.Item name={field.name} label={field.name} rules={[{ required: field.required }]}>
          <Input />
        </Form.Item>
      );

    case 'long':

      return (
        <Form.Item name={field.name} label={field.name} rules={[{ required: field.required }]}>
          <TextArea rows={4} />
        </Form.Item>
      );

    case 'number':
      return (
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
      );

    case 'checkbox':
      if (1 > 2) {
        console.log(3);
      }
      const { values } = field.options;
      return (
        <Form.Item name={field.name} label={field.name} rules={[{ required: field.required }]}>

          <Checkbox.Group options={values} defaultValue={['Apple']} onChange={handleCheckBoxChange} />
        </Form.Item>
      );

    case 'radio':
      return (
        <Form.Item name={field.name} label={field.name} rules={[{ required: field.required }]}>
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
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
