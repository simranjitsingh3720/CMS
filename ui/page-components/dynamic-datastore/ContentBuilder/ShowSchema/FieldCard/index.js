import { Card, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import style from './style.module.scss';

function FieldCard({
  fields, setIsEditable, setFieldsId,
  setIsEditSchemaDrawer, setFieldData, deleteField, id,
}) {
  const handleEditSchemaFieldsDrawer = (fieldID) => {
    setFieldData(fields);
    setIsEditable(true);
    setFieldsId(fieldID);
    setIsEditSchemaDrawer(true);
  };
  return (
    <Card className={style.card_wrapper} style={{ padding: '12px !important' }}>
      <div className={style.Field_card}>
        <div className={style.Fields}>
          <div style={{ fontWeight: 'bold' }}>{fields.name}</div>
          <div>{fields.type}</div>
          <div>{fields.appearanceType}</div>

        </div>
        <div>
          <Button
            className={style.button}
            onClick={() => handleEditSchemaFieldsDrawer(fields.id)}

          >
            <EditOutlined />
          </Button>
          <Space wrap>
            <Button
              danger
              className={style.button}
              onClick={() => deleteField(id)}
            >
              <DeleteOutlined />
            </Button>
          </Space>
        </div>
      </div>
    </Card>

  );
}

export default FieldCard;
