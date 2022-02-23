import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Button, Space, Empty } from 'antd';
import ActionBar from '../../../../components/ActionBar';
import StructureDrawer from './StructureDrawer';
import FieldCard from './FieldCard';

const { confirm } = Modal;

function ShowSchema() {
  const router = useRouter();
  const { schemaSlug } = router.query;
  const [isSchemaDrawer, setIsSchemaDrawer] = useState(false);
  const [editSchemaDrawer, setEditSchemaDrawer] = useState(false);
  const [fieldData, setFieldData] = useState({});
  const showSchemaDrawer = () => {
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
  const deleteField = () => {
    confirm({
      title: 'Do you Want to delete this Field',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      // content: '',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
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
  const [{ data, loading, error }, getSchema] = useAxios(
    {
      method: 'GET',
      url: `http://localhost:8000/api/schema/${schemaSlug}`,
    },
    { manual: true },
  );

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
              fieldData={fieldData}
            />
          )
          : null}

      </div>
      {data && JSON.stringify(data.schema)}
      <div style={{ marginLeft: '50px', marginRight: '50px' }}>
        { data && data.schema == null ? <div><Empty style={{ marginTop: '83px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>

          : ((data && data.schema) || []).map((fields) => (

            <FieldCard
              setIsEditSchemaDrawer={setEditSchemaDrawer}
              onClose={closeSchemaDrawer}
              key={fields.id}
              id={fields.id}
              fields={fields}
              setFieldData={setFieldData}
              deleteField={deleteField}
            />

          ))}
      </div>
    </div>
  );
}

export default ShowSchema;
