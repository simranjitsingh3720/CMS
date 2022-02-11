import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import { PlusOutlined } from '@ant-design/icons';
import SchemaCard from './SchemaCard';
import SchemaDrawer from './SchemaDrawer';
import ActionBar from '../../../components/ActionBar';

function ListSchema() {
  const [searchValue, setSearchValue] = useState('');
  const [isDrawer, setIsDrawer] = useState(false);

  const showDrawer = () => {
    setIsDrawer(true);
  };
  const closeDrawer = () => {
    setIsDrawer(false);
  };

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
    },
    buttons: [{
      name: 'New page',
      icon: <PlusOutlined />,
      onClick: showDrawer,
    }],
  };

  const showSchema = () => {
  };
  const deleteSchema = () => {
  };

  const [{ data, loading }] = useAxios(
    {
      method: 'GET',
      url: 'http://localhost:8000/api/schema',
      params: {
        q: searchValue,
      },
    },
  );

  const showLoading = () => {
    if (loading) {
      return <h1>LOADING....</h1>;
    }
    return null;
  };

  return (
    <div>
      <ActionBar actions={actions} />
      <div>
        {isDrawer
          ? <SchemaDrawer closeDrawer={closeDrawer} setIsDrawer={setIsDrawer} />
          : null}

      </div>
      {showLoading()}
      <div>
        {
          ((data && data.list) || []).map((schema) => (
            <SchemaCard
              key={schema.id}
              schemaName={schema.slug}
              showSchema={showSchema}
              deleteSchema={deleteSchema}
            />
          ))
}
      </div>
    </div>
  );
}

export default ListSchema;
