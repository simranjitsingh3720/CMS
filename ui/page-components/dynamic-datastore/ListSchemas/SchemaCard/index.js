import { MoreOutlined } from '@ant-design/icons';
import {
  Button, Popover,
} from 'antd';
import styles from './style.module.scss';
import CardWrapper from '../../../../components/CardWrapper';

function SchemaCard({
  schemaName, schemaDesc, deleteSchema, showSchema, schemaSlug, totatlFields, schemaId,
}) {
  const handleClick = () => {
    deleteSchema(schemaSlug, schemaId);
  };

  const content = (
    <div>
      <Button type="text" onClick={handleClick}>Delete Schema</Button>
    </div>
  );

  return (
    <CardWrapper id="fourth-step">

      <div
        className={styles.card_body}
        onClick={() => showSchema(schemaSlug)}
        role="button"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className={styles.card_heading}>
            {schemaName}
          </h2>
          <h4 className={styles.card_colorGray}>
            /
            {schemaSlug}
          </h4>
        </div>
        <h4 className={`${styles.card_colorGray} ${styles.card_fields}`}>
          {totatlFields}
          {' Fields'}
        </h4>
        <p className={styles.card_para}>
          {schemaDesc}
        </p>
      </div>
      <div className={styles.card_footer}>
        <div />
        <Popover
          placement="bottomLeft"
          content={content}
          trigger="hover"
        >
          <button
            type="button"
            className={styles.card_button}
          >
            <MoreOutlined className="fifth-step" />
          </button>
        </Popover>
      </div>

    </CardWrapper>
  );
}

export default SchemaCard;
