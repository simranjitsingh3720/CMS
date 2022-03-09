import { Card, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import style from './style.module.scss';
import Tutorial from '../../../../../components/layout/Tutorial';
import SessionContext from '../../../../../context/SessionContext';

function FieldCard({
  fields, setIsEditable, setFieldsId,
  setIsEditSchemaDrawer, setFieldData, deleteField, id, steps,
}) {
  const handleEditSchemaFieldsDrawer = (fieldID) => {
    setFieldData(fields);
    setIsEditable(true);
    setFieldsId(fieldID);
    setIsEditSchemaDrawer(true);
  };
  const { session } = useContext(SessionContext);

  // const steps = [
  //   {
  //     target: '#edit_structure',
  //     content: 'Edit your structure here',
  //     disableBeacon: 'true',
  //   },
  //   {
  //     target: '#delete_structure',
  //     content: 'Delete your structure here',
  //     disableBeacon: 'true',
  //   },

  // ];
  return (
    <>
      {session
        && session.user.flag.datastore_structure
        && <Tutorial steps={steps} tutorialKey="datastore_structure" />}

      <Card className={style.card_wrapper} style={{ padding: '12px !important' }}>
        <div className={style.Field_card}>
          <div className={style.Fields}>
            <div style={{ fontWeight: 'bold' }}>{fields.name}</div>
            <div>{fields.type}</div>
            <div>{fields.appearanceType}</div>

          </div>
          <div>
            <Button
              id="edit_structure"
              className={style.button}
              onClick={() => handleEditSchemaFieldsDrawer(fields.id)}
            >
              <EditOutlined />
            </Button>
            <Space wrap>
              <Button
                danger
                id="delete_structure"
                className={style.button}
                onClick={() => deleteField(id)}
              >
                <DeleteOutlined />
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </>
  );
}

export default FieldCard;
