import { Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

function PageSignup() {
  const router = useRouter();

  const url = 'http://localhost:8000/api/auth/signup';
  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      return message.error('Passwords do not match!!!');
    }
    await Axios.post(url, values)
      .then(() => {
        router.push('/admin');
      });
  };

  const onFinishFailed = () => {
    message.error('Some Error!!');
  };
  return (
    <div className={styles.signupForm}>
      <h1 className={styles.header}>Sign Up Form</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 32,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Cannot be empty',
            },
          ]}
        >
          <Input placeholder="First Name" className={styles.siteForm} />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Cannot be empty',
            },
          ]}
        >
          <Input placeholder="Last Name" className={styles.siteForm} />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Cannot be empty',
            },
          ]}
        >
          <Input type="email" placeholder="Email" className={styles.siteForm} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Cannot be empty',
            },
          ]}
        >
          <Input.Password placeholder="Password" className={styles.siteForm} />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Cannot be empty',
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" className={styles.siteForm} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 32,
          }}
        >
          <Button type="primary" htmlType="submit" className={styles.signupFormButton}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PageSignup;
