import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import { PlusOutlined } from '@ant-design/icons';
import ActionBar from '../../../../components/ActionBar';
import StructureDrawer from './StructureDrawer';

function ShowSchema() {
  const router = useRouter();
  const { schemaSlug } = router.query;
  const [isSchemaDrawer, setIsSchemaDrawer] = useState(false);
  const showSchemaDrawer = () => {
    setIsSchemaDrawer(true);
  };

  const closeSchemaDrawer = () => {
    setIsSchemaDrawer(false);
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

  if (data) {
    console.log(data);
  }

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
              setIsSchemaDrawer={setIsSchemaDrawer}
            />
          )
          : null}

      </div>
      {JSON.stringify(data)}
    </div>
  );
}

export default ShowSchema;
