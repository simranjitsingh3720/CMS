import axios from 'axios';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { message } from 'antd';
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
  const onSignUpClick = async () => {
    await router.push('/admin/signup');
  };
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.overlay_container}>
          <div className={styles.overlay}>
            <div className={styles.overlay_panel}>
              <h1 className={styles.h1}>Hello Machas!!</h1>
              <p className={styles.p}>Enter Your Details and start Exploring</p>
              <button type="submit" className={styles.ghost} id="signUp" onClick={onSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
        <div className={styles.sign_in_container}>
          <form
            action=""
            onSubmit={onFinish}
            className={styles.form}
          >
            <h1 className={styles.h1}>Sign In</h1>
            <input type="email" name="email" id="email" placeholder="Email" className={styles.input} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" name="password" id="password" placeholder="Password" className={styles.input} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className={styles.button} onClick={handleSubmit}>Sign In</button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default PageSignin;
