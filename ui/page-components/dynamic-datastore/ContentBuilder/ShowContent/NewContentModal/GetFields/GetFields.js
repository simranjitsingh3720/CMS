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
      if (data.fieldId in editableData) {
        if (data.type === 'Date and Time') {
          if (editableData[data.fieldId] !== null) {
            values[[data.fieldId]] = moment(editableData[data.fieldId], 'YYYY/MM/DD HH:mm:ss') || '';
          } else {
            values[[data.fieldId]] = '';
          }
        } else {
          values[[data.fieldId]] = editableData[data.fieldId] || '';
        }

        if (data.appearanceType === 'Boolean radio') {
          if (editableData[data.fieldId] === true) {
            values[[data.fieldId]] = data.Truelabel;
            // values[[data.fieldId]] = data.trueLabel;
          } else if (editableData[data.fieldId] === false) {
            values[[data.fieldId]] = data.Falselabel;
          } else {
            values[[data.fieldId]] = '';
          }
        }
      } else {
        values[[data.fieldId]] = data.defaultValue || '';
      }
    });
  } else if (fields) {
    fields.forEach((field) => {
      values[field.fieldId] = field.defaultValue || '';
    });
  }
  return values;
};

function GetFields(appearenceType, field, isEditable) {
  const {
    name, isRequired, options, Truelabel, Falselabel, fieldId,
  } = field; // trueLabel

  let values = [];
  if (options) {
    values = options.values;
  }

  switch (appearenceType) {
    case 'Short':
      return (
        <Form.Item name={fieldId} label={name} rules={[{ required: isRequired }]}>
          <Input />
        </Form.Item>
      );

    case 'Long':
      return (
        <Form.Item name={fieldId} label={name} rules={[{ required: isRequired }]}>
          <TextArea rows={2} />
        </Form.Item>
      );

    case 'Number':
      return (
        <Form.Item name={fieldId} label={name} rules={[{ required: isRequired }]}>
          <InputNumber style={{
            width: '100%',
          }}
          />
        </Form.Item>
      );

    case 'Checkbox':
      return (
        <Form.Item
          name={fieldId}
          label={name}
          rules={[{ required: isRequired }]}
        >
          <Checkbox.Group options={values} />
        </Form.Item>
      );

    case 'Radio':
      return (
        <Form.Item
          name={fieldId}
          label={name}
          rules={[{ required: isRequired }]}
        >
          <Radio.Group>
            {values.map((radioValue) => <Radio value={radioValue}>{radioValue}</Radio>)}
          </Radio.Group>
        </Form.Item>
      );

    case 'Dropdown':
      return (
        <Form.Item
          name={fieldId}
          label={name}
          rules={[{ required: isRequired }]}
        >
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
        <Form.Item
          name={fieldId}
          label={name}
          rules={[{ required: isRequired }]}
        >
          <DatePicker
            name="Date"
            format="YYYY/MM/DD "
          />
        </Form.Item>
      );

    case 'Date and Time':
      return (
        <Form.Item
          name={fieldId}
          label={name}
          rules={[{ required: isRequired }]}
        >
          <DatePicker
            name="Date and Time"
            format="YYYY/MM/DD HH:mm:ss"
            showTime={{ format: 'HH:mm:ss' }}
          />
        </Form.Item>
      );

    case 'Switch':
      return (
        <Form.Item
          name={fieldId}
          label={name}
          rules={[{ required: isRequired }]}
          valuePropName="checked"
        >
          <Switch
            checkedChildren={Truelabel}
            // checkedChildren={trueLabel}
            unCheckedChildren={Falselabel}
            // checkedChildren={falseLabel}
            defaultChecked={false}
          />
        </Form.Item>
      );

    case 'Boolean radio':
      return (
        <Form.Item
          name={fieldId}
          label={name}
          rules={[{ required: isRequired }]}
        >
          <Radio.Group>
            <Radio value={Truelabel}>{Truelabel}</Radio>
            <Radio value={Falselabel}>{Falselabel}</Radio>
            {/* <Radio value={trueLabel}>{trueLabel}</Radio>
            <Radio value={falseLabel}>{falseLabel}</Radio> */}
          </Radio.Group>
        </Form.Item>
      );

    case 'FileUpload':
      return (
        <Form.Item
          name={fieldId}
          label={name}
          rules={[{ required: isEditable ? false : isRequired }]}
        >
          {isEditable ? (
            <div>
              <Upload disabled={!!isEditable} maxCount={options ? 10 : 1}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              <span style={{ color: 'red' }}>Asset cannot be updated.</span>
            </div>
          ) : (
            <Upload maxCount={options ? 10 : 1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          )}
        </Form.Item>
      );

    default:
      return <div>Type not supported</div>;
  }
}

export default GetFields;
