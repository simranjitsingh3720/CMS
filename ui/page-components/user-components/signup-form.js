import { useState } from 'react';
import Axios from 'axios';

export default function Postform() {
  const url = 'http://localhost:8000/api/auth/signup';
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();
    Axios.post(url, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        console.log(res.data);
        console.log('====');
      });
  };

  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
    // eslint-disable-next-line no-console
    // console.log('submitted');
  };
  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <input type="text" placeholder="first name" onChange={(e) => handle(e)} id="firstName" value={data.first_name} />
        <input type="text" placeholder="last name" onChange={(e) => handle(e)} id="lastName" value={data.last_name} />
        <input type="email" placeholder="email" onChange={(e) => handle(e)} id="email" value={data.email} />
        <input type="password" placeholder="password" onChange={(e) => handle(e)} id="password" value={data.password} />
        <input type="submit" placeholder="Click" onChange={(e) => handle(e)} id="submit" />
      </form>
    </div>
  );
}
