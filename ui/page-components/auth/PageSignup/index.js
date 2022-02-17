import axios from 'axios';
import React from 'react';
import {
  message, Form, Input, Button, Row, Col, Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from '../style.module.scss';

const { Title, Paragraph } = Typography;

function PageSignup() {
  const router = useRouter();
  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!!!');
    } else {
      await axios.post('http://localhost:8000/api/auth/signup', values)
        .then(() => {
          router.push('/admin');
        })
        .catch(() => message.error('Invalid Signup, Please try again'));
    }
  };

  const onSignInClick = async () => {
    await router.push('/admin/signin');
  };
  return (
    <Row>
      <Col className={styles.overlay} span={12} style={{ backgroundColor: 'red', height: '100vh' }}>
        <Typography style={{ textAlign: 'center' }}>
          <Title style={{ color: 'white' }}>Hello Machas!!</Title>
          <Paragraph style={{ color: 'white' }}>Enter Your Details and start Exploring</Paragraph>
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
            type="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            className={styles.form_item}
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            className={styles.form_item}
            name="confirmPassword"
            rules={[{ required: true, message: 'This field cannot be empty!' }]}
          >
            <Input
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
