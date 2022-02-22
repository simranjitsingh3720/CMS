import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import confirm from 'antd/lib/modal/confirm';
import { Spin, Empty } from 'antd';
import SchemaCard from './SchemaCard';
import SchemaDrawer from './SchemaDrawer';
import ActionBar from '../../../components/layout/ActionBar';
import styles from './style.module.scss';

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

  const [{ data, loading, error }, fetchAllSchema] = useAxios(
    {
      method: 'GET',
      url: 'http://localhost:8000/api/schema',
      params: {
        q: searchValue,
      },
    },
  );

  const [{
    data: deletedData,
    loading: deleteLoading,
    error: deleteError,
  }, schemaDelete] = useAxios(
    {
      method: 'DELETE',

    },
    { manual: true },
  );

  useEffect(() => {
    fetchAllSchema();
  }, [deletedData]);

  const showSchema = (schemaSlug) => {
    push('/admin/datastore/content-builder/[schemaId]', `/admin/datastore/content-builder/${schemaSlug}`);
  };

  const deleteSchema = (schemaSlug) => {
    confirm({
      title: 'Are you sure to delete this table? ',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: <div style={{ color: 'red' }}>It may contains some sensitive data.</div>,
      onOk() {
        schemaDelete({
          url: `http://localhost:8000/api/schema/${schemaSlug}`,
        });
      },
      onCancel() {

      },
    });
  };

  const showLoading = () => {
    if (loading) {
      return <Spin size="large" />;
    }
    return null;
  };

  useEffect(() => {
    if (deletedData) {
      fetchAllSchema();
    }
  }, [deletedData]);

  return (
    <div className={styles.listSchema_wrapper}>
      <ActionBar actions={actions} />
      <div>
        {isDrawer
          ? <SchemaDrawer closeDrawer={closeDrawer} setIsDrawer={setIsDrawer} />
          : null}

      </div>

      <div style={{ textAlign: 'center' }}>
        {showLoading()}
      </div>
      <div style={{ margin: '16px 32px' }}>
        { data && data.list.length <= 0 ? <div><Empty style={{ marginTop: '83px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>

          : ((data && data.list) || []).map((schema) => (
            <SchemaCard
              key={schema.id}
              id={schema.id}
              schemaSlug={schema.slug}
              schemaName={schema.title}
              showSchema={showSchema}
              deleteSchema={deleteSchema}
            />
          ))}
      </div>
    </div>
  );
}

export default ListSchema;
