import { Card, Button, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import style from './style.module.scss';

function FieldCard({
  fields, setIsEditable, setFieldsId,
  setIsEditSchemaModal, setFieldData, deleteField, id,
}) {
  const handleEditSchemaFieldsModal = (fieldID) => {
    setFieldData(fields);
    setIsEditable(true);
    setFieldsId(fieldID);
    setIsEditSchemaModal(true);
  };

  return (
    <>
      {/* <FieldTutorial /> */}
      <Card className={style.card_wrapper} style={{ padding: '12px !important' }}>
        <div className={style.Field_card}>
          <div className={style.Fields}>
            <div style={{ fontWeight: 'bold' }}>{fields.name}</div>
            <div>{fields.type}</div>
          </div>
          <div>
            <Tooltip title="Edit field">
              <Button
                id="edit_structure"
                className={style.button}
                onClick={() => handleEditSchemaFieldsModal(fields.fieldId)}
              >
                <EditOutlined />
              </Button>
            </Tooltip>
            <Space wrap>
              <Tooltip title="Delete field">

                <Button
                  danger
                  id="delete_structure"
                  className={style.button}
                  onClick={() => deleteField(fields.fieldId)}
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </Space>
          </div>
        </div>
      </Card>
    </>
  );
}

export default FieldCard;
