import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
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
      placeholder: 'Enter Search Asset',

    },
    buttons: [{
      name: 'Add new Asset',
      icon: <PlusOutlined />,
      onClick: showModal,
    },
    ],
  };

  const handleOk = () => {
    setIsModalVisible(false);
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
          handleOk={handleOk}
          handleCancel={handleCancel}
          data={[]}
        />
        <div className="card_component_container">
          {((data && data.list) || []).map((item) => (
            <AssetCard key={item.id} data={item} refetch={refetch} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageAsset;
