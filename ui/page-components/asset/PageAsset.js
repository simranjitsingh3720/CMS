import { useState, useContext } from 'react';
import { List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AssetCard from './AssetCard';
import AssetDrawer from './AssetDrawer';
import ActionBar from '../../components/layout/ActionBar';
import { useRequest } from '../../helpers/request-helper';
import Tutorial from '../../components/layout/Tutorial/index';
import SessionContext from '../../context/SessionContext';

function PageAsset() {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { session } = useContext(SessionContext);

  const steps = [
    {
      target: '.first-step',
      content: 'Add your assets from here',
      disableBeacon: 'true',

    },
    {
      target: '.second-step',
      content: 'Search your assets here',
      disableBeacon: 'true',
    },
    {
      target: '.third-step',
      content: 'Edit your asset from here',
      disableBeacon: 'true',
    },
    {
      target: '.fourth-step',
      content: 'Delete your asset from here',
      disableBeacon: 'true',
    },
  ];

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
    <>
      {session && session.user.flag.asset && <Tutorial steps={steps} tutorialKey="asset" />}
      <div style={{ padding: '16px' }}>
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
              <AssetCard
                key={item.id}
                data={item}
                refetch={refetch}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default PageAsset;
