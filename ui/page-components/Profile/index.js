import { Card, Form, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import styles from './styles.module.scss';

function Profile() {
  const [form] = Form.useForm();
  const [dataForm] = Form.useForm();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [Passwordloading, setPasswordloading] = useState(false);
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 17,
    },
  };
  const [{ data: getdata }, handleGet] = useAxios({
    METHOD: 'GET',
    url: '/api/user/me',
  });

  const [{ data: getOneUser }, userGet] = useAxios(
    {
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    handleGet()
      .then((res) => {
        userGet({ url: `http://localhost:8000/api/user/${res.data.user.id}` })
          .then((response) => {
            setData(response.data.user);
            dataForm.setFieldsValue({
              firstName: response.data.user.firstName,
              lastName: response.data.user.lastName,
              email: response.data.user.email,
            });
          });
      });
  }, []);

  const [{ },
    executePatch,
  ] = useAxios(
    {
      method: 'PATCH',
    },
    { manual: true },
  );

  const SubmitDetails = (values) => {
    setLoading(true);
    executePatch({
      url: `/api/user/${data.id}`,
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
    })
      .then(() => {
        message.success('User Updated');
        userGet({ url: `http://localhost:8000/api/user/${data.id}` })
          .then((res) => {
            setData(res.data.user);
            setLoading(false);
          });
      })
      .catch(() => {
        message.error('User Not Updated');
        setLoading(false);
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
        url: '/api/user',
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
          name="validate_other"
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
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Edit
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
