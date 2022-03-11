import { useState } from 'react';
import { List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AssetCard from './AssetCard';
import AssetDrawer from './AssetDrawer';
import ActionBar from '../../components/layout/ActionBar';
import { useRequest } from '../../helpers/request-helper';
import AssetTutorial from './AssetTutorial';

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

  return (
    <div>
      <AssetTutorial />
      <div style={{ padding: '16px' }}>
        <ActionBar actions={actions} />
        <AssetDrawer
          flag
          visible={visible}
          setVisible={setVisible}
          refetch={refetch}
          data={[]}
        />
        <div className="card_componentW">
          {((data && data.list) || []).map((item) => (
            <AssetCard key={item.id} data={item} refetch={refetch} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageAsset;
