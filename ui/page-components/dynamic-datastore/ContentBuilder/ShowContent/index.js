import React from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import { PlusOutlined } from '@ant-design/icons';
import ActionBar from '../../../../components/layout/ActionBar';

function ShowContent() {
  const router = useRouter();
  const { schemaSlug } = router.query;
  const [{ data, loading, error }, getSchema] = useAxios(
    {
      method: 'GET',
      url: `http://localhost:8000/api/content/${schemaSlug}`,
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
    <>
      <ActionBar actions={actions} />
      {JSON.stringify(data)}
    </>
  );
}

export default ShowContent;
