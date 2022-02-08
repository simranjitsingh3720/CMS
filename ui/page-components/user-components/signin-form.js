import {
  Formik, Field, Form,
} from 'formik';
import { useState } from 'react';
import Axios from 'axios';
// import styles from './signin-form.module.css';

// interface Values {
//     username: string;
//     password: string;
// }

function SigninForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:8000/api/auth/signin', {
      email: name,
      password,
    })
      .then((er) => {
        console.log(er);
        alert('sucessfully signed in');
      })
      .catch((er) => console.log(er));
  };

  return (
    <div className="signin_box" style={{ margin: 'auto' }}>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
      >
        <Form>
          <h1>SignIn Here</h1>
          <label htmlFor="username">Username</label>
          <div className="mb-3">
            <Field className="form-control" value={name} onChange={(e) => setName(e.target.value)} type="email" name="username" placeholder="Email" />
          </div>
          <label htmlFor="password">Password</label>
          <div className="mb-3">
            <Field className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Password" type="password" />
          </div>

          <button type="submit" className="btn btn-primary" onClick={(e) => handleClick(e)}>signin</button>
        </Form>
      </Formik>
    </div>
  );
}
export default SigninForm;
