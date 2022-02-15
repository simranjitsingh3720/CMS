import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import confirm from 'antd/lib/modal/confirm';
import SchemaCard from './SchemaCard';
import SchemaDrawer from './SchemaDrawer';
import ActionBar from '../../../components/ActionBar';

function ListSchema() {
  const { push } = useRouter();
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
      name: 'New Schema',
      icon: <PlusOutlined />,
      onClick: showDrawer,
    }],
  };

  const showSchema = (slug) => {
    push('/admin/datastore/content-builder/[schemaId]', `/admin/datastore/content-builder/${slug}`);
  };

  const [{ data, loading, error }, fetchAllSchema] = useAxios(
    {
      method: 'GET',
      url: 'http://localhost:8000/api/schema',
      params: {
        q: searchValue,
      },
    },
  );

  const [{ data: deletedData, loading: deleteLoading, error: deleteError }, schemaDelete] = useAxios(
    {
      method: 'DELETE',
    },
    { manual: true },
  );

  const deleteSchema = (schemaSlug) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        schemaDelete({
          url: `http://localhost:8000/api/schema/${schemaSlug}`,
        });
        console.log('deleted');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const showLoading = () => {
    if (loading) {
      return <h1>LOADING....</h1>;
    }
    return null;
  };

  useEffect(() => {
    if (deletedData) {
      fetchAllSchema();
    }
  }, [deletedData]);

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
              id={schema.id}
              schemaName={schema.title}
              showSchema={showSchema}
              schemaSlug={schema.slug}
              deleteSchema={deleteSchema}
            />
          ))
}
      </div>
    </div>
  );
}

export default ListSchema;
