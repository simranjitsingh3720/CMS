import { Modal } from 'antd';
import AssetCreateForm from '../AssetCreateForm';
import AssetEditForm from '../AssetEditForm';

function AssetModal({
  flag, isModalVisible, handleCancel, setIsModalVisible, refetch, data,
}) {
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      title={flag ? 'Add a new asset' : `Edit ${data.name}`}
      footer={null}
      onCancel={handleCancel}
      visible={isModalVisible}
    >
      {flag ? <AssetCreateForm closeModal={onModalClose} refetch={refetch} />
        : <AssetEditForm closeModal={onModalClose} refetch={refetch} data={data} />}
    </Modal>
  );
}
export default AssetModal;
