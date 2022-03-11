import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import confirm from 'antd/lib/modal/confirm';
import { Spin, Empty, message } from 'antd';
import SchemaCard from './SchemaCard';
import ActionBar from '../../../components/layout/ActionBar';
import styles from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import SchemaModal from './SchemaModal';
import SchemaTutorial from './SchemaTutorial';

function ListSchema() {
  const { push } = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setIsModalVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
      placeholder: 'Enter Search Table',
    },
    buttons: [{
      name: 'Create new table',
      icon: <PlusOutlined />,
      onClick: showModal,

    }],
  };

  const [{ data, loading, error }, fetchAllSchema] = useRequest(
    {
      method: 'GET',
      url: '/schema',
      params: {
        q: searchValue.toLowerCase(),
      },
    },
  );

  const [{
    data: deletedData,
    loading: deleteLoading,
    error: deleteError,
  }, schemaDelete] = useRequest(
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
          url: `/schema/${schemaSlug}`,
        }).then((res) => {
          if (res.data.message) {
            message.error(res.data.message);
          } else {
            message.success('Deleted Successfully');
          }
        }).catch((err) => {
          message.error(err);
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
    <>
      <SchemaTutorial />

      <div style={{ padding: '16px' }}>
        <ActionBar actions={actions} />
        <div>
          {isModalVisible
            ? (
              <SchemaModal
                showModal={showModal}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                confirmLoading={confirmLoading}
                handleCancel={handleCancel}
                handleOk={handleOk}
                fetchAllSchema={fetchAllSchema}
              />
            )
            : null}

        </div>

        <div style={{ textAlign: 'center' }}>
          {showLoading()}
        </div>
        { data && data.list.length <= 0 ? (
          <div>
            <Empty
              style={{ marginTop: '83px' }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={(
                <span>
                  No Schema Found
                </span>
    )}
            />
          </div>
        ) : null}
        <div className={styles.card_wrapper}>
          {((data && data.list) || []).map((schema) => (
            <SchemaCard
              key={schema.id}
              id={schema.id}
              schemaSlug={schema.slug}
              schemaName={schema.title}
              schemaDesc={schema.description}
              showSchema={showSchema}
              deleteSchema={deleteSchema}
              totatlFields={schema.schema.length || 0}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListSchema;
