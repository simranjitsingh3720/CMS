import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import { PlusOutlined } from '@ant-design/icons';
import ActionBar from '../../../../components/ActionBar';
import StructureDrawer from './StructureDrawer';
import FieldCard from './FieldCard';

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
      {/* {data && JSON.stringify(data.schema)} */}
      {
         ((data && data.schema) || []).map((fields) => (
           <FieldCard
             setIsEditSchemaDrawer={setEditSchemaDrawer}
             onClose={closeSchemaDrawer}
             key={fields.id}
             id={fields.id}
             fields={fields}
             setFieldData={setFieldData}
           />
         ))
         }
    </div>
  );
}

export default ShowSchema;
