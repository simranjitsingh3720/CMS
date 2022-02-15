import { DeleteOutlined } from '@ant-design/icons';
import { Card, Button, Space } from 'antd';
import style from './style.module.scss';

function SchemaCard({ schemaName, deleteSchema, showSchema, id, schemaSlug }) {
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
          <Space wrap>
            {/* <Button onClick={showConfirm}>Confirm</Button> */}
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
