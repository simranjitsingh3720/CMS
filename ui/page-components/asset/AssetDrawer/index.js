import { Drawer, Modal } from 'antd';
import AssetCreateForm from '../AssetCreateForm';
import AssetEditForm from '../AssetEditForm';

function AssetDrawer({
  flag, visible, setVisible, refetch, data,
}) {
  const onDrawerClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      title={flag ? 'Add Asset' : 'Edit Asset'}
      footer={null}
      onClose={onDrawerClose}
      visible={visible}
    >
      {flag ? <AssetCreateForm CloseDrawer={onDrawerClose} refetch={refetch} />
        : <AssetEditForm onDrawerClose={onDrawerClose} refetch={refetch} data={data} />}
    </Modal>
  );
}
export default AssetDrawer;
