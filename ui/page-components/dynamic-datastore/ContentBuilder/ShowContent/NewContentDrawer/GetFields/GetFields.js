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
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const handleCheckBoxChange = (values) => {};

const onDateChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onDateSelect = (value) => {
  console.log('onOk: ', value);
};

const onRadioValueChange = (radioValue) => {};

const onTimeChange = (time) => {};

function GetFields(appearenceType, field) {
  const { name, required, names } = field;
  console.log('dddd ', names);
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
            {/* <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio> */}
            {names.map((radioValue) => <Radio value={radioValue}>{radioValue}</Radio>)}
          </Radio.Group>
        </Form.Item>
      );

    case 'dropdown':
      return (
        <Form.Item label="Select">
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
            <TimePicker use12Hours onChange={onTimeChange} />
          </Space>
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

    case 'tags':
      return '';

    default:
      return '';
  }
}

export default GetFields;
