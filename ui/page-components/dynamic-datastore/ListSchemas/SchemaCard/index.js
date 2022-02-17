import { DeleteOutlined } from '@ant-design/icons';
import { Card, Button, Space } from 'antd';
import style from './style.module.scss';

function SchemaCard({ schemaName, deleteSchema, showSchema, schemaSlug }) {
  return (
    <Card>
      <div className={style.schema_card}>
        <div>
          <h1>{schemaName}</h1>
          <p>
            {`Slug : ${schemaSlug}`}
          </p>
        </div>
        <div>
          <Button type="primary" className={style.button} onClick={() => showSchema(schemaSlug)}>View Schema</Button>
          <Space wrap>
            <Button danger onClick={() => deleteSchema(schemaSlug)} className={style.button}>
              <DeleteOutlined />
            </Button>
          </Space>
        </div>
      </div>
    </Card>

  );
}

export default SchemaCard;
