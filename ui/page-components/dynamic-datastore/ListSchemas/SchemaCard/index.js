import { DeleteOutlined, TableOutlined } from '@ant-design/icons';
import {
  Card, Col, Row, Button, Space, Tooltip,
} from 'antd';
import styles from './style.module.scss';

function SchemaCard({
  schemaName, schemaDesc, deleteSchema, showSchema, schemaSlug, totatlFields,
}) {
  return (
    <div className={styles.card_container}>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <TableOutlined className={styles.tableIcon} />
          <h4 className={styles.card_colorGray}>
            /
            {schemaSlug}
          </h4>
        </div>
        <div className={styles.card_body}>
          <h2 className={styles.card_heading}>
            {schemaName}
          </h2>
          <h4 className={`${styles.card_colorGray} ${styles.card_fields}`}>
            {totatlFields}
            {' Fields'}
          </h4>
          <p>
            {schemaDesc}
          </p>
        </div>
        <div className={styles.card_action}>
          <div>
            <Button type="primary" onClick={() => showSchema(schemaSlug)} id="third-step">View Table</Button>

          </div>
          <div>
            <Tooltip title="Delete Schema">
              <DeleteOutlined
                id="fourth-step"
                style={{ color: 'red' }}
                onClick={() => deleteSchema(schemaSlug)}
                className={styles.button}
              />
            </Tooltip>
          </div>
        </div>
      </div>

    </div>

  );
}

export default SchemaCard;
