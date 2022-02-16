import {
  Card, Button, message, Modal,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import useAxios from 'axios-hooks';
import { useState } from 'react';
import Asset from './Asset';
import AssetDrawer from '../AssetDrawer';
import styles from './styles.module.scss';

const { Meta } = Card;
const { confirm } = Modal;

function AssetCard({ data, refetch }) {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const [{ deleteError }, handleDelete] = useAxios(
    {
      method: 'DELETE',
      url: `/api/asset/${data.id}`,
    },
    { manual: true },
  );

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        await handleDelete();
        if (deleteError) {
          message.error('Item not deleted');
        } else {
          message.success('Item Deleted');
          await refetch();
        }
      },
    });
  };

  const showModal = () => {
    setVisibleDrawer(true);
  };

  return (
    <>
      <Card
        style={{ width: 280, padding: '0px 15px', paddingTop: '15px', borderRadius: '8px' }}
        cover={(
          <Asset
            data={data}
          />
    )}
        className={styles.asset_card}
        actions={[
          <Button onClick={showModal} style={{ border: '0px' }}>
            <EditOutlined key="edit" />

          </Button>,
          <Button onClick={showConfirm} style={{ border: '0px' }}>
            <DeleteOutlined key="delete" />

          </Button>,
        ]}
      >
        <Meta
          title={data.name}
          description={data.description}
        />
      </Card>
      <AssetDrawer
        flag={false}
        visible={visibleDrawer}
        setVisible={setVisibleDrawer}
        refetch={refetch}
        data={data}
      />
    </>
  );
}
export default AssetCard;
