import { Card, Popconfirm, message } from 'antd';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Styles from '../style.module.scss';

const { Meta } = Card;

function AssetCard({ data }) {
  const handleConfirm = () => {
    axios.delete(`http://localhost:8000/api/asset/${data.id}`);
    message.success('Item Deleted');
  };

  const handleCancel = () => {
    message.error('Click on No');
  };
  return (
    <Card
      hoverable
      className={Styles.Card_style}
      cover={<img alt="example" style={{ height: '200px', marginBottom: '10px' }} src={data.url} />}
    >
      <Meta title={data.name} description={data.description} />
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <div className={Styles.delete}>
          <DeleteOutlined />
        </div>
      </Popconfirm>
    </Card>
  );
}
export default AssetCard;
