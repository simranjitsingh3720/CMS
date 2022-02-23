import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import React, { useState, useEffect } from 'react';
import {
  message, Form, Input, Button,
} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

function Post() {
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState('');
  const [confirmMsg, setConfirmMsg] = useState('');
  const [{ loading }, executePost] = useAxios(
    {
      url: 'http://localhost:8000/api/auth/changePassword',
      method: 'POST',
    },
    { manual: true },
  );
  const router = useRouter();
  const { link } = router.query;
  const data2 = { token: link };
  const [{ loading2 }, executePost2] = useAxios({
    url: 'http://localhost:8000/api/auth/tokenHandler',
    method: 'POST',
  }, {
    manual: true,
  });

  // function updateData() {
  //   executePost2({
  //     data: {
  //       data2,
  //     },
  //   }).then((res) => {
  //     setSuccess(true);
  //   }).catch((err) => {
  //     setSuccess(false);
  //     setMessage(err.response.data.message);
  //   });
  // }
  function updateData() {
    executePost2({
      data: data2,
    }).then(() => {
      setSuccess(true);
    }).catch((err) => {
      setSuccess(false);
      setMsg(err.response.data.message);
    });
  }

  useEffect(() => {
    updateData();
  }, []);

  function SubmitDetails(values) {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      // return message.error('Confirmation mismatched!!!');
      return setConfirmMsg('Confirmation mismatched');
    }
    setConfirmMsg('');
    const data = {
      ...values,
      token: link,
    };
    console.log('data ', data);
    executePost({
      data,
    }).then(() => {
      message.success('Password Successfully updated! 🎉');

      router.push('/admin');
    })
      .catch(() => message.error('Some problem!'));
    return null;
  }

  return (
    <div>
      {success
        ? (
          <div style={{ width: '600px', margin: 'auto', boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)' }}>
            <h1 style={{ textAlign: 'center' }}>Password Change</h1>
            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={SubmitDetails}
              className={styles.form_reset_password}
            >
              <Form.Item
                name="password"
                type="password"
                rules={[{ min: 5, message: 'Field should contain atleast 5 characters.' }]}
              >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                type="confirmPassword"
              >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
              </Form.Item>
              <span style={{ width: '90%', color: 'red' }}>{confirmMsg}</span>
              <Form.Item>
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
          </div>
        ) : <h1 style={{ textAlign: 'center', marginTop: '150px', fontWeight: 800, fontSize: '30px' }}>{msg}</h1>}
    </div>
  );
}

export default Post;
