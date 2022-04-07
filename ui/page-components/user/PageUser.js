import { useEffect, useState } from 'react';
import { message, Table } from 'antd';
import ActionBar from '../../components/layout/ActionBar';
import { useRequest } from '../../helpers/request-helper';

function PageUser() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);

  const [{}, refetch] = useRequest({
    url: '/user',
    params: {
      q: searchValue.toLowerCase().trim(),
    },
  });
  useEffect(() => {
    refetch().then((res) => {
      setData(res.data.list);
    }).catch((err) => {
      message.error(err.response.data.message || err.response.data.messages[0]);
    });
  }, [searchValue]);

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
      placeholder: 'Enter user name',

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
    <div style={{ padding: '16px' }}>
      <ActionBar actions={actions} />
      <Table columns={columns} dataSource={data} style={{ marginTop: '16px', marginBottom: '16px' }} />
    </div>
  );
}
export default PageUser;
