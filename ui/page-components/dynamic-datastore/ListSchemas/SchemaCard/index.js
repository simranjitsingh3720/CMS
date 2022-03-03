import { DeleteOutlined, TableOutlined } from '@ant-design/icons';
import {
  Card, Col, Row, Button, Space, Tooltip,
} from 'antd';
import styles from './style.module.scss';

function SchemaCard({ schemaName, schemaDesc, deleteSchema, showSchema, schemaSlug }) {
  return (
    <div>
      {/* <div className={styles.schema_card}>
        <div style={{ display: 'flex' }}>
          <div style={{ fontWeight: 'bold', marginRight: '10px' }}>
            Name:
            {schemaName}
          </div>
          <div>
            {`Slug: ${schemaSlug}`}
          </div>
        </div>
        <div>
          <Button type="primary" className={styles.button} onClick={() => showSchema(schemaSlug)}>View Table</Button>
          <Tooltip title="Delete Schema">
            <DeleteOutlined
              style={{ color: 'red' }}
              onClick={() => deleteSchema(schemaSlug)}
              className={styles.button}
            />
          </Tooltip>
        </div>
      </div> */}

      <div className={styles.card}>
        <div className={styles.card_header}>
          <TableOutlined />
          <h3>Table</h3>
        </div>
        <div className={styles.card_body}>
          <p>
            <span>Schema Name:</span>
            {schemaName}
          </p>
          <p>
            <span>Slug Name:</span>
            {schemaSlug}
          </p>
          <p>
            <span>Total Fields:</span>
            {0}
          </p>
          <p>
            <span>Description:</span>
            {schemaDesc}
          </p>
        </div>
        <div className={styles.card_action}>
          <Button type="primary" onClick={() => showSchema(schemaSlug)}>View Table</Button>

          <Tooltip title="Delete Schema">
            <DeleteOutlined
              style={{ color: 'red' }}
              onClick={() => deleteSchema(schemaSlug)}
              className={styles.button}
            />
          </Tooltip>
        </div>

      </div>

    </div>

  );
}

export default SchemaCard;
