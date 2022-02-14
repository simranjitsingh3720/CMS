import axios from 'axios';
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

function PageSignin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/auth/signin', { email, password })
      .then(() => {
        router.push('/admin');
      })
      .catch(() => message.error('Invalid Signin, Please try again'));
  };
  return (
    <Form
      name="signin"
      className={styles.signinForm}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h1 className={styles.header}>SignIn Here</h1>
      {}
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input type="email" prefix={<UserOutlined className={styles.siteForm} />} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input prefix={<LockOutlined className={styles.siteForm} />} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.signinFormButton} onClick={handleSubmit}>
          SIGN IN
        </Button>
        <a href="" className={styles.signinFormForgot}>
          Forgot your password or email ?
        </a>
        <br />
        <a href="/admin/users/signup">signup now!</a>
      </Form.Item>
    </Form>
  );
}

export default PageSignin;
