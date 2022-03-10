import { useState, useEffect } from 'react';
import { List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AssetCard from './AssetCard';
import AssetDrawer from './AssetDrawer';
import ActionBar from '../../components/layout/ActionBar';
import { useRequest } from '../../helpers/request-helper';

function PageAsset() {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [{ data }, refetch] = useRequest({
    method: 'GET',
    url: '/asset',
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

  useEffect(() => {
    refetch();
  }, []);

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
