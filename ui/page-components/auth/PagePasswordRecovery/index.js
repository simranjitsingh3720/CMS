import React, { useState } from 'react';
import useAxios from 'axios-hooks';

import {
  Form, Input, Button, Card, Alert,
} from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import styles from '../style.module.scss';

export default function PagePasswordRecovery() {
  const [displayMessage, setDisplayMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  const [{ loading }, executePost] = useAxios(
    {
      url: 'http://localhost:8000/api/auth/recover-password',
      method: 'POST',
    },
    { manual: true },
  );
  const onClose = () => {
    setSubmitted(false);
  };
  const onFinish = async (values) => {
    await executePost({
      data: values,
    })
      .then(() => {
        setSubmitted(true);
        setSuccessfullySubmitted(true);
      })
      .catch(() => {
        setSubmitted(true);
        setDisplayMessage('The email does not exist');
      });
  };
  return (
    <div>
      <div>
        {successfullySubmitted
          ? (
            <Alert
              message="Recovery Link sent"
              description="Password recovery link has been sent to your email. Please check your inbox."
              type="success"
              showIcon
            />
          )
          : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center', padding: '10px' }}>
                <a href="http://localhost:8000/admin/signin">
                  <ArrowLeftOutlined />
                </a>
                <a href="http://localhost:8000/admin/signin" style={{ textDecoration: 'none', color: 'black', fontSize: '16px', marginLeft: '10px' }}>Back to sign in</a>
              </div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Card title="Forgot Password" style={{ marginTop: '30px' }}>
                  <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    className={styles.form_forgot_password}
                    onFinish={onFinish}
                  >
                    <p style={{ width: '100%' }}>Please put your email here so that we can send you a password recovery link.</p>
                    <Form.Item
                      name="email"
                      type="email"
                      rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                      <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    {submitted
                      ? <Alert message={displayMessage} type="error" style={{ width: '100%', color: 'red' }} closable onClose={onClose} />
                      : null}
                    <Form.Item>
                      <Button
                        type="primary"
                        shape="round"
                        size="large"
                        htmlType="submit"
                        style={{ width: 150, marginTop: '10px' }}
                        loading={loading}
                      >
                        Send Email
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
