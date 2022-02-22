import { Card, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import style from './style.module.scss';

function FieldCard({ fields, setIsEditSchemaDrawer, setFieldData }) {
  const handleEditSchemaFieldsDrawer = () => {
    setFieldData(fields);
    setIsEditSchemaDrawer(true);
  };

  return (
    <Card>
      <div className={style.Field_card}>
        <div>
          <p>{fields.name}</p>
          <p>{fields.appearanceType}</p>
          <p>{fields.type}</p>

        </div>
        <div>
          <Button className={style.button} onClick={handleEditSchemaFieldsDrawer}>
            <EditOutlined />
          </Button>
          <Space wrap>
            <Button danger className={style.button}>
              <DeleteOutlined />
            </Button>
          </Space>
        </div>
      </div>
    </Card>

  );
}

export default FieldCard;
