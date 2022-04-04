import React, { useContext } from 'react';
import {
  message, Form, Input, Button, Row, Col, Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from '../style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import SessionContext from '../../../context/SessionContext';

const { Title, Paragraph } = Typography;

function PageSignup() {
  const router = useRouter();
  const { refetch } = useContext(SessionContext);
  const [{ loading }, executePost] = useRequest(
    {
      url: '/auth/signup',
      method: 'POST',
    },
    { manual: true },
  );

  const onFinish = (values) => {
    executePost({
      data: values,
    })
      .then(() => {
        router.push('/admin');
        message.success('Welcome to Cogoport CMS!!!!');
        refetch();
      })
      .catch((error) => {
        message.error(error.response.data.messages[0]);
      });
  };

  const onSignInClick = async () => {
    await router.push('/admin/signin');
  };
  return (
    <Row>
      <Col className={styles.overlay} span={12} style={{ backgroundColor: 'red', height: '100vh' }}>
        <Typography style={{ textAlign: 'center' }}>
          <Title style={{ color: 'white' }}>Welcome Back!</Title>
          <Paragraph style={{ color: 'white' }}>To keep connected with us please login with your personal info.</Paragraph>
          <Button
            ghost
            shape="round"
            onClick={onSignInClick}
            style={{ width: 160 }}
          >
            SIGN IN
          </Button>
        </Typography>
      </Col>
      <Col span={12} className={styles.form_container}>
        <Form
          name="normal_login"
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Title>Sign Up</Title>
          <Form.Item
            className={styles.form_item}
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input placeholder="First Name" prefix={<UserOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item
            className={styles.form_item}
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input placeholder="Last Name" prefix={<UserOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item
            className={styles.form_item}
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }, {
              type: 'email',
              message: 'Invalid email',
            }]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            className={styles.form_item}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              {
                pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/,
                message: 'password between 6 to 12 characters which contain at least one letter, one numeric digit, and one special character',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            className={styles.form_item}
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'This field cannot be empty!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              shape="round"
              size="large"
              htmlType="submit"
              style={{ width: 200 }}
              loading={loading}
            >
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default PageSignup;
