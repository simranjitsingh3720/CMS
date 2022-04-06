import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function ValueNames() {
  return (

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
          {fields.map((field, index) => (
            <Form.Item
              label={index === 0 ? 'Value' : ''}
              required={false}
              key={field.key}
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
                  { max: 100, message: 'Data cannot be longer than 200 characters' },

                ]}
                noStyle
              >
                <Input
                  placeholder="Value"
                  autoFocus
                  style={{ width: '60%' }}
                  maxLength={101}
                />
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(field.name)}
                  style={{ marginLeft: '5px', fontSize: '18px' }}
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
              style={{ width: '60%' }}
              icon={<PlusOutlined />}
            >
              Add Values
            </Button>

            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}

    </Form.List>

  );
}

export default ValueNames;
