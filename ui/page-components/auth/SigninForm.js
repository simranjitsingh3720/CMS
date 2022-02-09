// import { useState } from 'react';
// import Axios from 'axios';
// import ReactDOM from 'react-dom';
import {
  Form, Input, Button, Checkbox,
} from 'antd';
import styles from '../../../styles/signinForm.module.scss';

function Demo() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email id!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Demo;

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
