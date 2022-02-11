import { Card, Popconfirm, message } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const { Meta } = Card;

function AssetCard({ data }) {
  const handleConfirm = () => {
    axios.delete(`http://localhost:8000/api/asset/${data.id}`)
      .then(() => message.success('Item Deleted'))
      .catch(() => message.error('Item Not Deleted'));
  };

  const handleCancel = () => {
    message.error('Click on No');
  };
  return (
    <Card
      style={{ width: 280, padding: '0px 15px', paddingTop: '15px', borderRadius: '8px' }}
      cover={(
        <img
          style={{ height: '200px' }}
          alt="example"
          src={data.url}
        />
    )}
      actions={[
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined key="delete" />
        </Popconfirm>,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={data.name}
        description={data.description}
        style={{ padding: '0px' }}
      />
    </Card>
  );
}
export default AssetCard;
