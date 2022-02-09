import {
  Formik, Field, Form,
} from 'formik';
import { useState } from 'react';
import Axios from 'axios';

export function SigninForm() {
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
        <Form className="id">
          <h1 className="header">SignIn Here</h1>
          <div className="mb">
            <Field type="email" placeholder="email" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb">
            <Field type="password" placeholder="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" />
          </div>

          <button type="submit" className="btn" onClick={(e) => handleClick(e)}>signin</button>
        </Form>
      </Formik>
    </div>
  );
}
export default SigninForm;
