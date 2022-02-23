import React from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import ActionBar from '../../../../components/layout/ActionBar';
import { useRequest } from '../../../../helpers/request-helper';

function ShowContent() {
  const router = useRouter();
  const { schemaSlug } = router.query;

  const [{ data, loading, error }, getSchema] = useRequest(
    {
      method: 'GET',
      url: `/content/${schemaSlug}`,
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
