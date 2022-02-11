import { DeleteOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
import style from './style.module.scss';

function SchemaCard({ schemaName, deleteSchema, showSchema, id }) {
  return (
    <Card>
      <div className={style.schema_card}>
        <div>
          <h1>{schemaName}</h1>
          <p>
            {`Slug : ${schemaName}`}
          </p>
        </div>
        <div>
          <Button type="primary" className={style.button} onClick={() => showSchema(id)}>View Schema</Button>
          <Button danger onClick={deleteSchema} className={style.button}>
            <DeleteOutlined />
          </Button>
        </div>
      </div>
    </Card>

  );
}

export default SchemaCard;
