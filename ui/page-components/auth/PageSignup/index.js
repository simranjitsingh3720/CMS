import { message } from 'antd';
import Axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

function PageSignup() {
  const router = useRouter();
  const url = 'http://localhost:8000/api/auth/signup';
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [values, setValues] = useState(initialValues);
  const onFinish = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      return message.error('Passwords do not match!!!');
    }
    console.log(values);
    await Axios.post(url, {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    })
      .then(() => {
        router.push('/admin');
      }).catch((error) => {
        console.log(error);
      });
    return null;
  };
  const onSignInClick = async () => {
    await router.push('/admin/signin');
  };
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.sign_up_container}>
          <form
            action=""
            onSubmit={onFinish}
            className={styles.form}
          >
            <h1 className={styles.h1}>Create Account</h1>
            <input type="text" name="firstName" id="firstName" placeholder="First Name" className={styles.input} onChange={(e) => setValues({ ...values, [e.target.id]: e.target.value })} required />
            <input type="text" name="lastName" id="lastName" placeholder="Last Name" className={styles.input} onChange={(e) => setValues({ ...values, [e.target.id]: e.target.value })} required />
            <input type="email" name="email" id="email" placeholder="Email" className={styles.input} onChange={(e) => setValues({ ...values, [e.target.id]: e.target.value })} required />
            <input type="password" name="password" id="password" placeholder="Password" className={styles.input} onChange={(e) => setValues({ ...values, [e.target.id]: e.target.value })} required />
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" className={styles.input} onChange={(e) => setValues({ ...values, [e.target.id]: e.target.value })} required />
            <button type="submit" className={styles.button}>SignUp</button>
          </form>
        </div>

        <div className={styles.overlay_container}>
          <div className={styles.overlay}>
            <div className={styles.overlay_panel}>
              <h1 className={styles.h1}>Welcome Back!</h1>
              <p className={styles.p}>To keep connected with us please login</p>
              <button type="submit" className={styles.ghost} id="signIn" onClick={onSignInClick}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSignup;
