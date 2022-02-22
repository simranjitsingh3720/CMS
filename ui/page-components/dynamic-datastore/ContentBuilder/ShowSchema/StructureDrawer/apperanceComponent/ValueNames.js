import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function ValueNames({ fieldData }) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <div>
      <Form.List
        name="values"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 values'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fieldData.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Value' : ''}
                required={false}
                key={index}
              >
                <Form.Item

                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Please input values or delete this field.',
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="Value" style={{ width: '60%' }} defaultValue={(fieldData && fieldData[index]) || ''} />
                </Form.Item>
                {fieldData.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field[index])}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item
              wrapperCol={{
                offset: 7,
                span: 10,
              }}
            >
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '50%' }}
                icon={<PlusOutlined />}
              >
                Add Values
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default ValueNames;
