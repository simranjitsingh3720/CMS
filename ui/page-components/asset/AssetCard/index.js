import { Card } from 'antd';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useEffect } from 'react';
import Styles from './style.module.scss';

const { Meta } = Card;

function AssetCard({ data }) {
// console.log("--------",e)
  useEffect(() => {

  }, []);
  const handleClick = (dat) => {
    axios.delete(`http://localhost:8000/api/asset/${dat.id}`);
  };
  return (
    <Card
      hoverable
      className={Styles.Card_style}
      cover={<img alt="example" style={{ width: '100%', height: '200px', borderStartEndRadius: '15px', borderStartStartRadius: '15px', marginBottom: '10px' }} src={data.url} />}
    >
      <Meta title={data.name} description={data.description} />
      <div className={Styles.delete} onClick={() => handleClick(data)}>
        <DeleteOutlined />
      </div>
    </Card>
  );
}
export default AssetCard;
