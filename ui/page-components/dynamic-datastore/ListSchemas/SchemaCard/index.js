import { EllipsisOutlined, TableOutlined } from '@ant-design/icons';
import {
  Button, Popover,
} from 'antd';
import { useState } from 'react';
import styles from './style.module.scss';
import CardWrapper from '../../../../components/CardWrapper';

function SchemaCard({
  schemaName, schemaDesc, deleteSchema, showSchema, schemaSlug, totatlFields,
}) {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    deleteSchema(schemaSlug);
    setVisible(false);
  };

  const handleVisible = () => {
    setVisible(!visible);
  };
  // const text = <span>Options</span>;
  const content = (
    <div>
      <Button type="text" onClick={handleClick}>Delete Schema</Button>
    </div>
  );

  return (
    <>
      <CardWrapper id="fourth-step">
        <div className={styles.card_header}>
          <TableOutlined className={styles.tableIcon} />
          <Popover
            placement="bottomLeft"
            content={content}
            trigger="hover"
            // visible={visible}
          >
            <button
              type="button"
              className={styles.card_button}
            >
              <EllipsisOutlined className="fifth-step" />

            </button>

          </Popover>
        </div>
        <div
          className={styles.card_body}
          onClick={() => showSchema(schemaSlug)}
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

      </CardWrapper>

      {/* <div className={styles.card_container}>
        <div className={styles.card}>
          <div className={styles.card_header}>
            <TableOutlined className={styles.tableIcon} />
            <Popover
              placement="bottomLeft"
              title={text}
              content={content}
              trigger="click"
              visible={visible}
            >
              <EllipsisOutlined onClick={handleVisible} />
            </Popover>
          </div>
          <div
            className={styles.card_body}
            onClick={() => showSchema(schemaSlug)}
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
        </div>
      </div> */}
    </>
  );
}

export default SchemaCard;
