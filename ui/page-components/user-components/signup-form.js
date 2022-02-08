import { useState } from 'react';
import Axios from 'axios';
// or 'antd/dist/antd.less'
// import {
//   Form, Input, Button, Checkbox,
// } from 'antd';
// import 'antd/dist/antd.css';

export default function Postform() {
  const url = 'http://localhost:8000/api/auth/signup';
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const submit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      return console.log('Passwords not matched');
    }
    Axios.post(url, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        console.log(res.data);
      });
  };

  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    console.log(newData);
    setData(newData);

    // eslint-disable-next-line no-console
    // console.log('submitted');
  };
  return (

    <div>
      <form onSubmit={(e) => submit(e)}>
        <input type="text" placeholder="first name" onChange={(e) => handle(e)} id="firstName" value={data.firstName} />
        <input type="text" placeholder="last name" onChange={(e) => handle(e)} id="lastName" value={data.lastName} />
        <input type="email" placeholder="email" onChange={(e) => handle(e)} id="email" value={data.email} />
        <input type="password" placeholder="password" onChange={(e) => handle(e)} id="password" value={data.password} />
        <input type="password" placeholder="Confirm password" onChange={(e) => handle(e)} value={data.confirmPassword} id="confirmPassword" />
        <input type="submit" placeholder="Click" onChange={(e) => handle(e)} id="submit" />
      </form>
    </div>
  );
}
