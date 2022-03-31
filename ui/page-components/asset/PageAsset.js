import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import AssetCard from './AssetCard';
import AssetModal from './AssetModal';
import ActionBar from '../../components/layout/ActionBar';
import { useRequest } from '../../helpers/request-helper';
import AssetTutorial from './AssetTutorial';

function PageAsset() {
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [{ data }, refetch] = useRequest({
    method: 'GET',
    url: '/asset',
    params: {
      q: searchValue.toLowerCase(),
    },
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
      placeholder: 'Search asset by name',

    },
    buttons: [{
      name: 'Add new Asset',
      icon: <PlusOutlined />,
      onClick: showModal,
    },
    ],
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <AssetTutorial />
      <div style={{ padding: '16px' }}>
        <ActionBar actions={actions} />

        <AssetModal
          flag
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          refetch={refetch}
          handleCancel={handleCancel}
          data={[]}
        />

        <div className="card_component_container">
          { data && data.list.length <= 0 ? (
            <div style={{ width: '100%' }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={(
                  <span>
                    No Asset Found
                  </span>
    )}
              />
            </div>
          )
            : ((data && data.list) || []).map((item) => (
              <AssetCard key={item.id} data={item} refetch={refetch} />
            )) }
        </div>
      </div>
    </div>
  );
}

export default PageAsset;
