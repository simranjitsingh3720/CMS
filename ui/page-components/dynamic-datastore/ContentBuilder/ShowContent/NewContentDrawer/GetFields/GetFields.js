import { UploadOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Checkbox,
  TimePicker,
  Space,
  Upload,
  Button,
} from 'antd';

const { TextArea } = Input;

const handleCheckBoxChange = (values) => {};

const onDateChange = (value, dateString) => {
};

const onDateSelect = (value) => {
};

const onRadioValueChange = (radioValue) => {};

function GetFields(appearenceType, field) {
  const { name, required, names, Truelabel, Falselabel } = field;
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
      // const { values } = options.values;
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>
          <Checkbox.Group options={names} onChange={handleCheckBoxChange} />
        </Form.Item>
      );

    case 'radio':
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>
          <Radio.Group onChange={onRadioValueChange}>
            {names.map((radioValue) => <Radio value={radioValue}>{radioValue}</Radio>)}
          </Radio.Group>
        </Form.Item>
      );

    case 'dropdown':
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>
          <Select>
            {names.map((dropDownValue) => (
              <Select.Option
                value={dropDownValue}
              >
                {dropDownValue}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );

    case 'dateAndTime':
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>
          <Space direction="vertical" size={12}>
            <DatePicker showTime onChange={onDateChange} onOk={onDateSelect} />
          </Space>
        </Form.Item>
      );

    case 'switch':
      return (
        <Form.Item name={name} label={name} rules={[{ required }]} valuePropName="checked">
          <Switch
            checkedChildren={Truelabel}
            unCheckedChildren={Falselabel}
            defaultChecked={false}
          />
        </Form.Item>
      );

    case 'Boolean Radio':
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>
          <Radio.Group onChange={onRadioValueChange}>
            <Radio value={Truelabel}>{Truelabel}</Radio>
            <Radio value={Falselabel}>{Falselabel}</Radio>
          </Radio.Group>
        </Form.Item>
      );

    case 'fileUpload':
      return (
        <Form.Item name={name} label={name} rules={[{ required }]}>
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

      );

    default:
      return '';
  }
}

export default GetFields;
