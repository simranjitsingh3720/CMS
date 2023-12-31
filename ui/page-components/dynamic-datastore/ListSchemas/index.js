import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import confirm from 'antd/lib/modal/confirm';
import { Spin, Empty, message } from 'antd';
import SchemaCard from './SchemaCard';
import ActionBar from '../../../components/layout/ActionBar';
import { useRequest } from '../../../helpers/request-helper';
import SchemaModal from './SchemaModal';
import SchemaTutorial from './SchemaTutorial';

function ListSchema() {
  const { push } = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const actions = {
    searchBar: {
      searchValue,
      setSearchValue,
      placeholder: 'Search data table by name',
    },
    buttons: [{
      name: 'Add New Data Table',
      icon: <PlusOutlined />,
      onClick: showModal,
    }],
  };

  const [{ data, loading }, fetchAllSchema] = useRequest(
    {
      method: 'GET',
      url: '/schema',
      params: {
        q: searchValue.toLowerCase().trim(),
      },
    },
  );

  const [{ data: deletedData }, schemaDelete] = useRequest(
    { method: 'DELETE' },
    { manual: true },
  );

  useEffect(() => {
    fetchAllSchema();
  }, [deletedData]);

  const showSchema = (schemaSlug) => {
    push('/admin/datastore/content-builder/[schemaId]', `/admin/datastore/content-builder/${schemaSlug}`);
  };

  const deleteSchema = (schemaSlug, schemaId) => {
    confirm({
      title: 'Are you sure to delete this table? ',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: <div>It may contains some sensitive data.</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        schemaDelete({
          url: `/schema/${schemaSlug}`,
          params: {
            schemaId,
          },
        }).then(() => {
          message.success('Deleted Successfully');
        }).catch((err) => {
          if (err.response.data.code === 404) {
            console.log('HELLLLLLLLLLLLLLL');
          }
          message.error(err.response.data.message || err.response.data.messages[0]);
        });
      },
      onCancel() {
        console.log('Cancelled');
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
                handleCancel={handleCancel}
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
        <div className="card_component_container">
          {((data && data.list) || []).map((schema) => (
            <SchemaCard
              key={schema.id}
              schemaId={schema.id}
              schemaSlug={schema.slug}
              schemaName={schema.title}
              schemaDesc={schema.description}
              showSchema={showSchema}
              deleteSchema={deleteSchema}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListSchema;
