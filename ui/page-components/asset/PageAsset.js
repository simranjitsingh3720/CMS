import { useState } from 'react';
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
      {/* INITIAL DUMMY CARD====== */}
      {/* <Card
        style={{ width: 280, height: 330, padding: '0px 15px', paddingTop: '15px', borderRadius: '8px' }}
        cover={(
          <Asset
            data={data}
          />
    )}
        className={styles.asset_card}
        actions={[
          <Tooltip title="Edit Asset">
            <EditOutlined key="edit" onClick={showModal} style={{ border: '0px' }} />

          </Tooltip>,
          <Tooltip title="Delete Asset">
            <DeleteOutlined key="delete" onClick={showConfirm} style={{ border: '0px' }} />

          </Tooltip>,
        ]}
      >
        <Meta
          title={data.name}
          description={data.description}
        />
      </Card> */}

      {/* ======= */}

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
