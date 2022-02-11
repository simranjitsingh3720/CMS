import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import ActionBar from '../components/ActionBar/ActionBar';

function PageUser() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  // const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (searchValue === '') {
      axios.get('http://localhost:8000/api/auth')

        .then((res) => {
          // setFlag(true);
          setData(res.data.list);
        });
    } else {
      axios.get(`http://localhost:8000/api/auth/findByName/${searchValue}`)

        .then((res) => {
          if (res.data.asset.length > 0) {
            // setFlag(true);
            console.log(data);
            // setData(res.data.);
          // } else setFlag(false);
          }
        });
    }
  }, [searchValue]);

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
    },
  };
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

  ];

  useEffect(() => {
    axios.get('/api/auth')
      .then((res) => {
        setData(res.data.list);
      });
  }, []);

  return (
    <>
      <ActionBar actions={actions} />
      <Table columns={columns} dataSource={data} style={{ marginTop: '20px' }} />
    </>
  );
}
export default PageUser;
