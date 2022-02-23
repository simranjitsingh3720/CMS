import { useEffect, useState } from 'react';
import { Table } from 'antd';
import ActionBar from '../../components/layout/ActionBar';
import { useRequest } from '../../helpers/request-helper';

function PageUser() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);

  const [{}, refetch] = useRequest({
    url: '/user',
    params: {
      q: searchValue,
    },
  });
  useEffect(() => {
    refetch().then((res) => {
      setData(res.data.list);
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
      <Table columns={columns} dataSource={data} style={{ margin: '16px 32px' }} />
    </>
  );
}
export default PageUser;
