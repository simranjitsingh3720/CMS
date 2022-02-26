import React, { useState } from 'react';
import useAxios from 'axios-hooks';

import {
  Form, Input, Button, Card, Alert,
} from 'antd';
import { MailOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import Header from './Header';

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
      <Header />
      <div className={style.body_container}>
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
            <Card title="Forgot Password">
              <Form
                name="normal_login"
                initialValues={{}}
                onFinish={onFinish}
              >
                <p style={{ width: '100%' }}>Please put your email here so that we can send you a password recovery link.</p>
                <Form.Item
                  name="email"
                  type="email"
                  rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                  <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" style={{ height: '50px' }} />
                </Form.Item>
                {submitted
                  ? <Alert message={displayMessage} type="error" closable onClose={onClose} />
                  : null}
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    htmlType="submit"
                    style={{ width: 150 }}
                    loading={loading}
                  >
                    Send Email
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          )}
      </div>
    </div>
  );
}
