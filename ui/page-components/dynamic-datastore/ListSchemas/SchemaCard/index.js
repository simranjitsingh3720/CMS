import { DeleteOutlined } from '@ant-design/icons';
import { Card, Button, Space, Tooltip } from 'antd';
import styles from './style.module.scss';

function SchemaCard({ schemaName, deleteSchema, showSchema, schemaSlug }) {
  return (
    <Card>
      <div className={styles.schema_card}>
        <div>
          <h1>{schemaName}</h1>
          <p>
            {`Slug : ${schemaSlug}`}
          </p>
        </div>
        <div>
          <Button type="primary" className={styles.button} id="third-step" onClick={() => showSchema(schemaSlug)}>View Schema</Button>
          <Tooltip title="Delete Schema">
            <DeleteOutlined
              style={{ color: 'red' }}
              onClick={() => deleteSchema(schemaSlug)}
              className={styles.button}
              id="fourth-step"
            />
          </Tooltip>
        </div>
      </div>
    </Card>

  );
}

export default SchemaCard;
