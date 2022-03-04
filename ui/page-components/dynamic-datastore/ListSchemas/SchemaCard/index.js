import { DeleteOutlined } from '@ant-design/icons';
import { Card, Button, Space, Tooltip } from 'antd';
import styles from './style.module.scss';

function SchemaCard({ schemaName, deleteSchema, showSchema, schemaSlug }) {
  return (
    <Card>
      <div className={styles.schema_card}>
        <div style={{ display: 'flex' }}>
          <div style={{ fontWeight: 'bold', marginRight: '10px' }}>
            Name:
            {' '}
            {schemaName}
          </div>
          <div>
            {`Slug: ${schemaSlug}`}
          </div>
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
