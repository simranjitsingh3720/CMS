import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import { PlusOutlined } from '@ant-design/icons';
// import ActionBar from '../../../../components/ActionBar';
import NewContentDrawer from './NewContentDrawer';
import ActionBar from '../../../../components/layout/ActionBar';

function ShowContent({ schema }) {
  const router = useRouter();
  const [isContentDrawer, setIsContentDrawer] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { schemaSlug } = router.query;

  const [{ data, loading, error }] = useAxios({
    method: 'GET',
    url: `http://localhost:8000/api/content/${schemaSlug}`,
  });

  const showContentDrawer = () => {
    setIsContentDrawer(true);
  };
  const closeContentDrawer = () => {
    setIsContentDrawer(false);
  };

  const addNewContent = () => {
    showContentDrawer();
  };

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
    },
    buttons: [
      {
        name: 'Add new content',
        icon: <PlusOutlined />,
        onClick: addNewContent,
      },
    ],
  };

  return (
    <div>
      <div>
        <ActionBar actions={actions} />
      </div>

      {loading ? <h1>LOADING</h1> : null}
      {error ? <h1>{error}</h1> : null}
      {isContentDrawer ? (
        <NewContentDrawer
          closeContentDrawer={closeContentDrawer}
          schemaDetails={schema}
        />
      ) : null }
      {JSON.stringify(data)}
    </div>
  );
}

export default ShowContent;
