import React, { useState } from 'react';
import useAxios from 'axios-hooks';

import {
  message, Form, Input, Button, Row, Col, Typography, Checkbox, notification,
} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../style.module.scss';

const { Title, Paragraph } = Typography;

export default function PagePasswordRecovery() {
  const [displayMessage, setDisplayMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [{ loading }, executePost] = useAxios(
    {
      url: 'http://localhost:8000/api/auth/recoverPassword',
      method: 'POST',
    },
    { manual: true },
  );
  const router = useRouter();
  const onFinish = async (values) => {
    console.log('*******************', values);
    await executePost({
      data: values,
    })
      .then(() => {
        // message.success('Email sent. Please check');
        // const args = {
        //   // message: 'Email Sent',
        //   description:
        //     'Password recovery letter has been sent successfully',
        //   duration: 120,
        // };
        // notification.open(args);
        // router.push('resetPassword/edhecwvehkw');
        setSubmitted(true);
      })
      .catch(() => {
        console.log('================');
        // message.error('No such email');
        setDisplayMessage('Invalid email');
      });
  };
  return (
    <div>
      {
      submitted
        ? (<h1 style={{ textAlign: 'center', marginTop: '150px', fontWeight: 800, fontSize: '30px' }}>Password recovery letter has been sent successfully.</h1>)
        : (
          <div style={{ width: '600px', margin: 'auto', boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)' }}>
            <h1 style={{ textAlign: 'center' }}>Forgot Password?</h1>
            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              className={styles.form_forgot_password}
              onFinish={onFinish}
            >
              {/* <Title>Forget Password</Title> */}
              <Form.Item
                name="email"
                type="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <p style={{ width: '100%', color: 'red' }}>{displayMessage}</p>
              <Form.Item>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  htmlType="submit"
                  style={{ width: 200 }}
                  loading={loading}
                >
                  Recover
                </Button>
              </Form.Item>
            </Form>
          </div>
        )
    }
    </div>
  );
}
