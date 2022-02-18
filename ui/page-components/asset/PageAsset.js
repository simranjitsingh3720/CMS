import { useState } from 'react';
import useAxios from 'axios-hooks';
import { List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AssetCard from './AssetCard';
import AssetDrawer from './AssetDrawer';
import ActionBar from '../../components/layout/ActionBar';

function PageAsset() {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [{ data }, refetch] = useAxios({
    method: 'GET',
    url: 'http://localhost:8000/api/asset',
    params: {
      q: searchValue,
    },
  });

  const showDrawer = () => {
    setVisible(true);
  };

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
    },
    buttons: [{
      name: 'Add Asset',
      icon: <PlusOutlined />,
      onClick: showDrawer,
    },
    ],
  };

  return (
    <>
      <ActionBar actions={actions} />
      <AssetDrawer
        flag
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        data={[]}
      />
      <List
        style={{ margin: '16px 32px' }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={data && (data.list || [])}
        renderItem={(item) => (
          <List.Item>
            <AssetCard key={item.id} data={item} refetch={refetch} />
          </List.Item>
        )}
      />
    </>
  );
}

export default PageAsset;
