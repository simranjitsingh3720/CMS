import { useState } from 'react';
import useAxios from 'axios-hooks';
import { List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AssetCard from './AssetCard';
import ActionBar from '../../components/ActionBar';
import AssetDrawer from './AssetDrawer';

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
    <div style={{ marginLeft: '20px' }}>
      <ActionBar actions={actions} />
      <AssetDrawer
        flag
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        data={[]}
        style={{ marginBottom: '35px' }}
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data && (data.list || [])}
        renderItem={(item) => (
          <List.Item>
            <AssetCard key={item.id} data={item} refetch={refetch} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default PageAsset;
