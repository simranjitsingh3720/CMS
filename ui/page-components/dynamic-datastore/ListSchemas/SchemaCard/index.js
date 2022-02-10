import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
import style from './style.module.scss';

export default function SchemaCard({ SchemaName, deleteSchema, showSchema }) {
  return (
    <Card>
      <div className={style.schema_card}>
        <div>
          <h1>{SchemaName}</h1>
        </div>
        <div>
          <Button type="primary" className={style.button} onClick={showSchema}><EyeOutlined /></Button>
          <Button danger onClick={deleteSchema} className={style.button}>
            <DeleteOutlined />
          </Button>
        </div>
      </div>
    </Card>

  );
}
