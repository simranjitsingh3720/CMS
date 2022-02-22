import { Card, Form, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import styles from './styles.module.scss';

// const { Paragraph } = Typography;

function Profile() {
  const [form] = Form.useForm();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 17,
    },
  };

  // const [{ data }, refetch] = useAxios({
  //   method: 'GET',
  //   url: 'http://localhost:8000/api/user/me',
  // });

  const [{ data: getdata }, handleGet] = useAxios({
    METHOD: 'GET',
    url: '/api/user/me',
  });

  const [{ data: getOneUser }, UserGet] = useAxios(
    {
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    setLoading(true);
    handleGet()
      .then((res) => {
        UserGet({ url: `http://localhost:8000/api/user/${res.data.user.id}` })
          .then((response) => {
            setData(response.data.user);
            setLoading(false);
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
        UserGet({ url: `http://localhost:8000/api/user/${data.id}` })
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
    if (values.currentPassword === values.newPassword) {
      message.error('password should be different from previous password');
    } else if (values.confirmPassword !== values.newPassword) {
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
          message.success('successfully updated');
        })
        .catch(() => {
          form.resetFields();
          message.error('Password is not updated');
        });
    }
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card title="Basic Information" className={styles.card_container} bordered={false} loading={loading}>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={SubmitDetails}
          initialValues={{
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          }}
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
            loading={loading}
          >
            Change
          </Button>
        </Form>
      </Card>
    </div>
  );
}
export default Profile;
