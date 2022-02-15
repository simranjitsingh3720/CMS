import {
  Card, Button, message, Modal,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useState } from 'react';
import Asset from '../Asset';
import AssetEdit from '../AssetEdit';

const { Meta } = Card;
const { confirm } = Modal;

function AssetCard({ data, refetch }) {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.delete(`http://localhost:8000/api/asset/${data.id}`)
          .then(() => {
            message.success('Item Deleted');
            refetch();
          })
          .catch(() => message.error('Item Not Deleted'));
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
        className="Asset-card"
        cover={(<Asset data={data} />
    )}
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
          style={{ padding: '0px' }}
        />
      </Card>
      <AssetEdit
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
