import React from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import { PlusOutlined } from '@ant-design/icons';
import ActionBar from '../../../../components/ActionBar';

function ShowContent() {
  const router = useRouter();
  const { schemaId } = router.query;
  const [{ data, loading, error }, getSchema] = useAxios(
    {
      method: 'GET',
      url: `http://localhost:8000/api/content/${schemaId}`,
    },
  );

  const addNewContent = () => {};

  const actions = {
    buttons: [{
      name: 'Add new content',
      icon: <PlusOutlined />,
      onClick: addNewContent,
    }],
  };

  return (
    <div>
      <div>
        <ActionBar actions={actions} />
      </div>
      {JSON.stringify(data)}
    </div>
  );
}

export default ShowContent;
