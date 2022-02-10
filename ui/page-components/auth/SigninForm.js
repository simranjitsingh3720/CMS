import React, { useState } from 'react';
// import Axios from 'axios';
// import ReactDOM from 'react-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import styles from '../../../styles/signinForm.module.scss';

async function signinUser(credentials) {
  return fetch('http://localhost:8000/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json());
}
const success = () => {
  message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
};
function signinForm({ setToken }) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await signinUser({
      email,
      password,
    });
    if (token) {
      push('/admin');
    } else {
      alert('sdvf');
    }
  };

  // const { push } = useRouter();
  // const handleClick = () => {
  //   push('/admin');
  // };

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
      <Form onSubmit={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className={styles.siteForm} />} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
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
          <Button type="primary" htmlType="submit" className={styles.signinFormButton}>
            SIGN IN
          </Button>
          <a href="" className={styles.signinFormForgot}>
            Forgot your password or email ?
          </a>
          <br />
          <a href="/admin/signup">signup now!</a>
        </Form.Item>
      </Form>
    </Form>
  );
}

export default signinForm;

// export function SigninForm() {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');

//   const handleClick = (e) => {
//     e.preventDefault();
//     Axios.post('http://localhost:8000/api/auth/signin', {
//       email: name,
//       password,
//     })
//       .then((er) => {
//         console.log(er);
//       })
//       .catch((er) => console.log(er));
//   };

//   return (
//   // <div className="signin_box" style={{ margin: 'auto' }}>
//     <div className={styles.signin_box} styles={{ margin: 'auto' }}>

//       <Formik
//         initialValues={{
//           email: '',
//           password: '',
//         }}
//       >
//         <Form className={styles.id}>
//           <h1 className={styles.header}>SignIn Here</h1>
//           <div className={styles.mb}>
//             <Field type="email" placeholder="email" className={styles.formControl} value={name} onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div className={styles.mb}>
//             <Field type="password" placeholder="password" className={styles.formControl} value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" />
//           </div>
//           <Button type="submit" className={styles.btn} onClick={success}>Submit</Button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }
// export default SigninForm;
