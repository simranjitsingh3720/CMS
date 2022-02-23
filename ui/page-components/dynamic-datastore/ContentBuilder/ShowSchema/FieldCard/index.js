import { Card, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined, FileExcelOutlined } from '@ant-design/icons';
import style from './style.module.scss';

function FieldCard({ fields, setIsEditSchemaDrawer, setFieldData, deleteField }) {
  const handleEditSchemaFieldsDrawer = () => {
    setFieldData(fields);
    setIsEditSchemaDrawer(true);
  };

  return (
    <Card>
      <div className={style.Field_card}>
        <div className={style.Fields}>
          <div style={{ fontWeight: 'bold' }}>{fields.name}</div>
          <div>{fields.type}</div>
          <div>{fields.appearanceType}</div>

        </div>
        <div>
          <Button className={style.button} onClick={handleEditSchemaFieldsDrawer}>
            <EditOutlined />
          </Button>
          <Space wrap>
            <Button danger className={style.button} onClick={deleteField}>
              <DeleteOutlined />
            </Button>
          </Space>
        </div>
      </div>
    </Card>

  );
}

export default FieldCard;
