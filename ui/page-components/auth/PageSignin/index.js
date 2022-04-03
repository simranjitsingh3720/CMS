import React, { useContext } from 'react';
import {
  message, Form, Input, Button, Row, Col, Typography, Checkbox,
} from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from '../style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import SessionContext from '../../../context/SessionContext';

const { Title, Paragraph } = Typography;

function PageSignin() {
  const router = useRouter();
  const { refetch } = useContext(SessionContext);
  const [{ loading }, executePost] = useRequest(
    {
      url: '/auth/signin',
      method: 'POST',
    },
    { manual: true },
  );

  const SubmitDetails = (values) => {
    executePost({
      data: values,
    }).then(() => {
      router.push('/admin');
      refetch();
      message.success('Welcome to Cogoport CMS 🎉');
    })
      .catch((error) => {
        message.error(error.response.data.messages[0]);
      });
  };
  const onSignUpClick = async () => {
    await router.push('/admin/signup');
  };

  return (
    <Row>
      <Col className={styles.overlay} span={12} style={{ backgroundColor: 'red', height: '100vh' }}>
        <Typography style={{ textAlign: 'center' }}>
          <Title style={{ color: 'white' }}>Hello Friends!</Title>
          <Paragraph style={{ color: 'white' }}>Everything you need to build a website without coding.</Paragraph>
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
          onFinish={SubmitDetails}
        >
          <Title>Sign In</Title>
          <Form.Item
            className={styles.form_item}
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              {
                type: 'email',
                message: 'Invalid email',
              },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            className={styles.form_item}
            name="password"
            rules={[{ required: true, message: 'Password cannot be empty.' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <div className={styles.form_extra_item}>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>
                Remember me for a month
              </Checkbox>
            </Form.Item>
            <Link href="/admin/forgot-password">
              Forgot password?
            </Link>
          </div>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              shape="round"
              size="large"
              htmlType="submit"
              style={{ width: 200, marginTop: '20px' }}
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
