import { Card } from 'antd';

const { Meta } = Card;
import {
  DeleteOutlined
} from '@ant-design/icons';
import axios from "axios";
import { useEffect } from 'react';

function CardStyle(e){
// console.log("--------",e)
useEffect(()=>{

},[])
const handleClick=(e)=>{
axios.delete(`http://localhost:8000/api/asset/${e.id}`)
.then(()=>alert("item name : "+e.name+" was deleted...!!"))
}
  return (
    <Card
    hoverable
    className='Card-style'
    cover={<img alt="example"  style={{ width:"100%",height:"200px",borderStartEndRadius:"15px",borderStartStartRadius:"15px",marginBottom:"10px"}} src={e.data1.url} />}
  >
    <Meta title={e.data1.name} description={e.data1.description} />
    <div className='delete' onClick={()=>handleClick(e.data1)}>
    <DeleteOutlined/></div>
  </Card>
  );

}
export default CardStyle;