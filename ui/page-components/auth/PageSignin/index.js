import axios from 'axios';
import React from 'react';
import {
  message, Form, Input, Button, Row, Col, Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from '../style.module.scss';

const { Title, Paragraph } = Typography;

function PageSignin() {
  const router = useRouter();
  const onFinish = async (values) => {
    await axios.post('http://localhost:8000/api/auth/signin', { email: values.email, password: values.password })
      .then(() => {
        router.push('/admin');
      })
      .catch(() => message.error('Invalid Signin, Please try again'));
  };

  const onSignUpClick = async () => {
    await router.push('/admin/signup');
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
            onClick={onSignUpClick}
            style={{ width: 160 }}
          >
            SIGN UP

          </Button>
        </Typography>
      </Col>
      <Col className={styles.form_container} span={12}>
        <Form
          name="normal_login"
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Title>Sign In</Title>
          <Form.Item
            className={styles.form_item}
            name="email"
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
          <Form.Item>
            <Button
              type="primary"
              shape="round"
              size="large"
              htmlType="submit"
              style={{ width: 200 }}
            >
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default PageSignin;
