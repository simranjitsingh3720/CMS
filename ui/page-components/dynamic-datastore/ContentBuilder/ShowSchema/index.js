import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal, Empty } from 'antd';
import ActionBar from '../../../../components/layout/ActionBar';
import StructureDrawer from './StructureDrawer';
import FieldCard from './FieldCard';
import { useRequest } from '../../../../helpers/request-helper';

const { confirm } = Modal;

function ShowSchema() {
  const router = useRouter();
  const { schemaSlug } = router.query;
  const [isSchemaDrawer, setIsSchemaDrawer] = useState(false);
  const [editSchemaDrawer, setEditSchemaDrawer] = useState(false);
  const [fieldData, setFieldData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [fieldsId, setFieldsId] = useState('');

  const showSchemaDrawer = () => {
    setIsEditable(false);
    setIsSchemaDrawer(true);
  };

  const closeSchemaDrawer = () => {
    setIsSchemaDrawer(false);
  };

  const showEditSchemaDrawer = () => {
    setEditSchemaDrawer(true);
  };

  const closeEditSchemaDrawer = () => {
    setEditSchemaDrawer(false);
  };

  const [{
    data: deletedData,
    loading: deleteLoading,
    error: deleteError,
  }, fieldDelete] = useRequest(
    {
      method: 'DELETE',

    },
    { manual: true },
  );

  const [{ data, loading, error }, getSchema] = useRequest(
    {
      method: 'GET',
      url: `/schema/${schemaSlug}`,
    },
    { manual: true },
  );

  const deleteField = (id) => {
    confirm({
      title: 'Do you Want to delete this Field',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      onOk() {
        fieldDelete({
          url: `/schema/${schemaSlug}/field/${id}`,
        }).then((res) => {
          if (res.data.message) {
            message.error(res.data.message);
          } else {
            message.success('Field deleted successfully');
            getSchema();
          }
        });
      },
      onCancel() {
      },
    });
  };

  const actions = {
    buttons: [{
      name: 'Add new Field',
      icon: <PlusOutlined />,
      onClick: showSchemaDrawer,
    }],
  };

  useEffect(() => {
    if (schemaSlug) {
      getSchema();
    }
  }, [schemaSlug]);

  return (
    <div>
      <div>
        <ActionBar actions={actions} />
      </div>
      <div>
        {isSchemaDrawer
          ? (
            <StructureDrawer
              closeSchemaDrawer={closeSchemaDrawer}
              getSchema={getSchema}
              data={data}
              fieldsId={fieldsId}
            />
          )
          : null}

      </div>
      <div>
        {editSchemaDrawer
          ? (
            <StructureDrawer
              closeSchemaDrawer={closeEditSchemaDrawer}
              getSchema={getSchema}
              isEditable={isEditable}
              fieldsId={fieldsId}
              fieldData={fieldData}
              data={data}
            />
          )
          : null}

      </div>
      <div style={{ marginLeft: '50px', marginRight: '50px' }}>
        { (data && data.schema.length <= 0) ? (
          <div>
            <Empty
              style={{ marginTop: '83px' }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={(
                <span>
                  Add fields to store content
                </span>
    )}
            />
          </div>
        )

          : ((data && data.schema) || []).map((fields) => (

            <FieldCard
              setIsEditSchemaDrawer={setEditSchemaDrawer}
              onClose={closeSchemaDrawer}
              key={fields.id}
              id={fields.id}
              fields={fields}
              fieldSlug={fields.id}
              setFieldsId={setFieldsId}
              setIsEditable={setIsEditable}
              setFieldData={setFieldData}
              deleteField={deleteField}
              className="first-step"
            />

          ))}
      </div>
    </div>
  );
}

export default ShowSchema;
