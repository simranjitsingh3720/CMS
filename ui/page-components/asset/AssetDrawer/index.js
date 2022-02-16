import { Drawer } from 'antd';
import AssetCreateForm from '../AssetCreateForm';
import AssetEditForm from '../AssetEditForm';

function AssetDrawer({
  flag, visible, setVisible, refetch, data,
}) {
  const onDrawerClose = () => {
    setVisible(false);
  };

  return (
    <Drawer title={flag ? 'Add Asset' : 'Edit Asset'} placement="right" onClose={onDrawerClose} visible={visible}>
      {flag ? <AssetCreateForm CloseDrawer={onDrawerClose} refetch={refetch} />
        : <AssetEditForm onDrawerClose={onDrawerClose} refetch={refetch} data={data} />}
    </Drawer>
  );
}
export default AssetDrawer;
