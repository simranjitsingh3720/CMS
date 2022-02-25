import { Card, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined, FileExcelOutlined } from '@ant-design/icons';
import style from './style.module.scss';

function FieldCard({
  fields, setIsEditable, setFieldsName, setIsEditSchemaDrawer, setFieldData, deleteField, fieldSlug,
}) {
  const handleEditSchemaFieldsDrawer = (fieldID) => {
    setFieldData(fields);
    setIsEditable(true);
    setFieldsName(fieldID);
    setIsEditSchemaDrawer(true);
  };

  // console.log(fields);

  return (
    <Card>
      <div className={style.Field_card}>
        <div className={style.Fields}>
          <div style={{ fontWeight: 'bold' }}>{fields.name}</div>
          <div>{fields.type}</div>
          <div>{fields.appearanceType}</div>

        </div>
        <div>
          <Button
            className={style.button}
            onClick={() => handleEditSchemaFieldsDrawer(fields.name)}

          >
            <EditOutlined />
          </Button>
          <Space wrap>
            <Button
              danger
              className={style.button}
             // onClick={deleteField}
              onClick={() => deleteField(fieldSlug)}
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
