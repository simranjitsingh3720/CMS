import {
  Card, Form, Input, Button, message, Upload, Meta, Avatar,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import styles from './styles.module.scss';

function Profile() {
  const [form] = Form.useForm();
  const [dataForm] = Form.useForm();

  const [data, setData] = useState({});
  const [file, setFile] = useState(data.profilePicture);
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 17,
    },
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
    setFile(e.file.originFileObj);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [{ data: getdata }, handleGet, refetch] = useAxios({
    METHOD: 'GET',
    url: 'http://localhost:8000/api/user/me',
  });

  useEffect(() => {
    handleGet()
      .then((res) => {
        setData(res.data.user);
        dataForm.setFieldsValue({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
          phone: res.data.user.phone,
        });
      });
  }, []);

  const [{ DetailsLoading },
    detailPatch,
  ] = useAxios(
    {
      method: 'PATCH',
    },
    { manual: true },
  );
  const [{ PasswordLoading },
    passwordPatch,
  ] = useAxios(
    {
      method: 'PATCH',
    },
    { manual: true },
  );

  const SubmitDetails = (values) => {
    console.log(values);
    detailPatch({
      url: `http://localhost:8000/api/user/${data.id}`,
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,

      },
    })
      .then(() => {
        message.success('User Updated');
        refetch();
      })
      .catch(() => {
        message.error('User Not Updated');
      });
  };

  const changePassword = (values) => {
    passwordPatch({
      url: 'http://localhost:8000/api/user',
      data: {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
    })
      .then(() => {
        form.resetFields();
        message.success('successfully updated');
      })
      .catch(() => {
        form.resetFields();
        message.error('Password is not updated');
      });
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Basic Information"
        className={styles.card_container}
        bordered={false}
      >
        <Form
          form={dataForm}
          name="validate"
          {...formItemLayout}
          onFinish={SubmitDetails}
        >
          <Avatar
            // src="https://images.pexels.com/photos/2893685/pexels-photo-2893685.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
           // src={file}
            style={{ width: 100, height: 100, position: 'relative' }}
            className={styles.picture}
          >
            <Form.Item
              name="upload"
              valuePropName="fileList"
              rules={[{ required: true }]}
              getValueFromEvent={normFile}
            >
              <Upload name="logo">
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    borderRadius: '50%', position: 'absolute', bottom: 0,
                  }}
                />
              </Upload>
            </Form.Item>
          </Avatar>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name!!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter Last name!!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Mobile Number"
          >
            <Input />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={DetailsLoading}
          >
            Update
          </Button>
        </Form>
      </Card>

      <Card title="Change Password" className={styles.card_container1} bordered={false}>

        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={changePassword}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Please enter Current Password!!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: 'Please enter New Password!!' }, ({ getFieldValue }) => ({
              validator(_, value) {
                const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
                if (!value.match(paswd)) {
                  return Promise.reject(new Error('password between 6 to 12 characters which contain at least one letter, one numeric digit, and one special character'));
                }
                if (getFieldValue('currentPassword') === value) {
                  return Promise.reject(new Error('Password should be different from current passowrd'));
                }
                return Promise.resolve();
              },
            })]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[{ required: true, message: 'Please enter Confirm Password!!' }, ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            })]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={PasswordLoading}
          >
            Change
          </Button>
        </Form>
      </Card>
    </div>
  );
}
export default Profile;
