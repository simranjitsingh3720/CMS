import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import ActionBar from '../../components/ActionBar';

function PageUser() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/user', {
      params: {
        q: searchValue,
      },
    })
      .then((res) => {
        setData(res.data.list);
      }).catch((err) => {

      });
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

  return (
    <>
      <ActionBar actions={actions} />
      <Table columns={columns} dataSource={data} style={{ marginTop: '20px' }} />
    </>
  );
}
export default PageUser;
