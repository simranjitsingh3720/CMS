import { Card, Form, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import styles from './styles.module.scss';

function Profile() {
  const [form] = Form.useForm();
  const [dataForm] = Form.useForm();

  const [data, setData] = useState({});
  const [Passwordloading, setPasswordloading] = useState(false);
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 17,
    },
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

  const [{ loading },
    executePatch,
  ] = useAxios(
    {
      method: 'PATCH',
    },
    { manual: true },
  );

  const SubmitDetails = (values) => {
    executePatch({
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
    setPasswordloading(true);
    if (values.currentPassword === values.newPassword) {
      setPasswordloading(false);
      message.error('password should be different from previous password');
    } else if (values.confirmPassword !== values.newPassword) {
      setPasswordloading(false);
      message.error('confirm password should be match with new password');
    } else {
      executePatch({
        url: 'http://localhost:8000/api/user',
        data: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
      })
        .then(() => {
          form.resetFields();
          setPasswordloading(false);
          message.success('successfully updated');
        })
        .catch(() => {
          form.resetFields();
          setPasswordloading(false);
          message.error('Password is not updated');
        });
    }
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card title="Basic Information" className={styles.card_container} bordered={false}>
        <Form
          form={dataForm}
          name="validate"
          {...formItemLayout}
          onFinish={SubmitDetails}
        >
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
            loading={loading}
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
            rules={[{ required: true, message: 'Please enter New Password!!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[{ required: true, message: 'Please enter Confirm Password!!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={Passwordloading}
          >
            Change
          </Button>
        </Form>
      </Card>
    </div>
  );
}
export default Profile;
