import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {
  message, Alert, Form, Input, Button, Card,
} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useRequest } from '../../../ui/helpers/request-helper';
import styles from './style.module.scss';
import Header from '../../../ui/page-components/auth/PageForgotPassword/Header';

export async function getServerSideProps() {
  return {
    props: {
      notDisplay: true,
    },
  };
}

function Post() {
  const [success, setSuccess] = useState(false);
  const [apiHit, setApiHit] = useState(false);
  const [msg, setMsg] = useState('');
  const [{ loading }, executePost] = useRequest(
    {
      url: '/auth/change-password',
      method: 'POST',
    },
    { manual: true },
  );
  const router = useRouter();
  const { link } = router.query;
  const data2 = { token: link };
  // eslint-disable-next-line no-empty-pattern
  const [{}, executePost2] = useRequest({
    url: '/auth/check-change-password-token',
    method: 'POST',
  }, {
    manual: true,
  });

  async function updateData() {
    await executePost2({
      data: data2,
    }).then(() => {
      setApiHit(true);
      setSuccess(true);
    }).catch((err) => {
      setApiHit(true);
      setSuccess(false);
      setMsg(err.response.data.message || err.response.data.messages[0]);
    });
  }

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function SubmitDetails(values) {
    const data = {
      ...values,
      token: link,
    };
    executePost({
      data,
    }).then(() => {
      message.success('Password Successfully updated! 🎉');
      router.push('/admin/signin');
    })
      .catch(() => message.error('Some problem!'));
    return null;
  }

  return (
    <div>
      {
      (apiHit === false) ? null
        : (
          <div>
            <Header />
            <div className={styles.body_container}>
              {(apiHit && success)
                ? (
                  <Card title="Password Change" className={styles.card_container}>
                    <Form
                      name="normal_login"
                      initialValues={{ remember: true }}
                      // eslint-disable-next-line react/jsx-no-bind
                      onFinish={SubmitDetails}
                      className={styles.form_reset_password}
                    >
                      <Form.Item
                        name="password"
                        type="password"
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
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                      </Form.Item>
                      <Form.Item
                        name="confirmPassword"
                        type="confirmPassword"
                        rules={[{ required: true, message: 'Field should not be empty' },
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
                          prefix={(
                            <LockOutlined
                              className="site-form-item-icon"

                            />
                          )}
                          placeholder="Confirm Password"
                        />
                      </Form.Item>
                      <Form.Item style={{ textAlign: 'center' }}>
                        <Button
                          type="primary"
                          shape="round"
                          size="large"
                          htmlType="submit"
                          style={{ width: 200 }}
                          loading={loading}
                        >
                          Change
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                ) : (
                  <div>
                    <Alert
                      message="Error"
                      description={msg}
                      type="error"
                      showIcon
                    />
                  </div>
                )}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Post;
