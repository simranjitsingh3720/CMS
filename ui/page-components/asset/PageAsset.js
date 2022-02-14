import { useState } from 'react';
import useAxios from 'axios-hooks';
import { Drawer, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AssetCard from './AssetCard';
import AssetForm from './AssetForm';
import ActionBar from '../../components/ActionBar';

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

  const onDrawerClose = () => {
    setVisible(false);
  };

  return (
    <>
      <ActionBar actions={actions} />
      <div style={{ marginBottom: '35px' }}>
        <Drawer title="Add Asset" placement="right" onClose={onDrawerClose} visible={visible}>
          <AssetForm CloseDrawer={onDrawerClose} refetch={refetch} />
        </Drawer>
      </div>
      <List
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
