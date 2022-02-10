import { Card, Popconfirm, message } from 'antd';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useEffect } from 'react';
import Styles from './style.module.scss';

const { Meta } = Card;

function AssetCard({ data }) {
  useEffect(() => {

  }, []);
  const handleClick = (dat) => {
    axios.delete(`http://localhost:8000/api/asset/${dat.id}`);
  };
  function confirm(e) {
    console.log(e);
    message.success('Item Deleted');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }
  return (
    <Card
      hoverable
      className={Styles.Card_style}
      cover={<img alt="example" style={{ width: '100%', height: '200px', borderStartEndRadius: '15px', borderStartStartRadius: '15px', marginBottom: '10px' }} src={data.url} />}
    >
      <Meta title={data.name} description={data.description} />
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
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
