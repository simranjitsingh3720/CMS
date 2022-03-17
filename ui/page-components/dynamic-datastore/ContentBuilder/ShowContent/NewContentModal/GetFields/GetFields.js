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
import moment from 'moment';

const { TextArea } = Input;
export const getInitialValues = (fields, editableData, isEditable) => {
  const values = {};
  if (isEditable) {
    fields.forEach((data) => {
      if (editableData[data.id]) {
        if (data.type === 'Date and Time') {
          if (editableData[data.id] !== 'Invalid date') {
            values[[data.id]] = moment(editableData[data.id], 'YYYY/MM/DD HH:mm:ss') || '';
          } else {
            values[[data.id]] = '';
          }
        } else {
          values[[data.id]] = editableData[data.id] || '';
        }
      } else {
        values[[data.id]] = data.defaultValue || '';
      }
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
    case 'Short':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <Input />
        </Form.Item>
      );

    case 'Long':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <TextArea rows={2} />
        </Form.Item>
      );

    case 'Number':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <InputNumber style={{
            width: '100%',
          }}
          />
        </Form.Item>
      );

    case 'Checkbox':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <Checkbox.Group options={values} />
        </Form.Item>
      );

    case 'Radio':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <Radio.Group>
            {values.map((radioValue) => <Radio value={radioValue}>{radioValue}</Radio>)}
          </Radio.Group>
        </Form.Item>
      );

    case 'Dropdown':
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
    case 'Date':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <DatePicker
            name="Date"
            format="YYYY/MM/DD "
          />
        </Form.Item>
      );

    case 'Date and Time':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <DatePicker
            name="Date and Time"
            format="YYYY/MM/DD HH:mm:ss"
            showTime={{ format: 'HH:mm:ss' }}
          />
        </Form.Item>
      );

    case 'Switch':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]} valuePropName="checked">
          <Switch
            checkedChildren={Truelabel}
            unCheckedChildren={Falselabel}
            defaultChecked={false}
          />
        </Form.Item>
      );

    case 'Boolean radio':
      return (
        <Form.Item name={id} label={name} rules={[{ required }]}>
          <Radio.Group>
            <Radio value={Truelabel}>{Truelabel}</Radio>
            <Radio value={Falselabel}>{Falselabel}</Radio>
          </Radio.Group>
        </Form.Item>
      );

    case 'FileUpload':
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
