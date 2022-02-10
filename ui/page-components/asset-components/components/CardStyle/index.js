import { Card } from 'antd';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useEffect } from 'react';

const { Meta } = Card;

function CardStyle(props) {
// console.log("--------",e)
  useEffect(() => {

  }, []);
  const handleClick = (e) => {
    axios.delete(`http://localhost:8000/api/asset/${e.id}`)
      .then(() => alert(`item name : ${e.name} was deleted...!!`));
  };
  return (
    <Card
      hoverable
      className="Card-style"
      cover={<img alt="example" style={{ width: '100%', height: '200px', borderStartEndRadius: '15px', borderStartStartRadius: '15px', marginBottom: '10px' }} src={props.data.url} />}
    >
      <Meta title={props.data.name} description={props.data.description} />
      <div className="delete" onClick={() => handleClick(props.data)}>
        <DeleteOutlined />
      </div>
    </Card>
  );
}
export default CardStyle;
