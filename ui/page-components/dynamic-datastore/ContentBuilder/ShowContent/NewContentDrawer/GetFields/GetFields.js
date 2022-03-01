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
  Upload,
  Button,
} from 'antd';

const { TextArea } = Input;

export const getInitialValues = (fields, editableData, isEditable) => {
  const values = {};
  if (isEditable) {
    Object.keys(editableData).forEach((data) => {
      if (data !== 'id') { values[[data]] = editableData[data]; }
    });
  } else if (fields) {
    fields.forEach((field) => {
      values[field.id] = field.defaultValue || '';
    });
  }
  return values;
};

function GetFields(appearenceType, field) {
  const {
    name, required, options, Truelabel, Falselabel, id,
  } = field;

  let values = [];
  if (options) {
    values = options.values;
  }

  switch (appearenceType) {
    case 'short':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <Input />
        </Form.Item>
      );

    case 'long':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <TextArea rows={4} />
        </Form.Item>
      );

    case 'number':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <InputNumber />
        </Form.Item>
      );

    case 'checkbox':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <Checkbox.Group options={values} />
        </Form.Item>
      );

    case 'radio':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <Radio.Group>
            {values.map((radioValue) => <Radio value={radioValue}>{radioValue}</Radio>)}
          </Radio.Group>
        </Form.Item>
      );

    case 'dropdown':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <Select>
            {values.map((dropDownValue) => (
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
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <DatePicker showTime />
        </Form.Item>
      );

    case 'switch':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]} valuePropName="checked">
          <Switch
            checkedChildren={Truelabel}
            unCheckedChildren={Falselabel}
            defaultChecked={false}
          />
        </Form.Item>
      );

    case 'Boolean Radio':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <Radio.Group>
            <Radio value={Truelabel}>{Truelabel}</Radio>
            <Radio value={Falselabel}>{Falselabel}</Radio>
          </Radio.Group>
        </Form.Item>
      );

    case 'fileUpload':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

      );

    default:
      return <div>Type not supported</div>;
  }
}

export default GetFields;