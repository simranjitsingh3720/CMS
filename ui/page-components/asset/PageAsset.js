import { useState } from 'react';
import { List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Joyride from 'react-joyride';
import AssetCard from './AssetCard';
import AssetDrawer from './AssetDrawer';
import ActionBar from '../../components/layout/ActionBar';
import { useRequest } from '../../helpers/request-helper';

function PageAsset() {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const isUserNew = true;

  const steps = [
    {
      target: '.first-step',
      content: 'This is my awesome feature!',
    },
    {
      target: '.seconsd-step',
      content: 'This another awesome feature!',
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
      name: <span className="first-step">Add Asset</span>,
      icon: <PlusOutlined />,
      onClick: showDrawer,
    },
    ],
  };

  return (
    <>
      <Joyride
        steps={steps}
      />
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
