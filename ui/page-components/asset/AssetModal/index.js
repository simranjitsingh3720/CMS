import { Modal } from 'antd';
import AssetCreateForm from '../AssetCreateForm';
import AssetEditForm from '../AssetEditForm';

function AssetModal({
  flag, isModalVisible, handleOk, handleCancel, setIsModalVisible, refetch, data,
}) {
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      title={flag ? 'Add Asset' : 'Edit Asset'}
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
      visible={isModalVisible}
    >
      {flag ? <AssetCreateForm CloseModal={onModalClose} refetch={refetch} />
        : <AssetEditForm onModalClose={onModalClose} refetch={refetch} data={data} />}
    </Modal>
  );
}
export default AssetModal;
