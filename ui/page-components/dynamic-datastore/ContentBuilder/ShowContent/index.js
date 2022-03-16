import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, message, Spin } from 'antd';
import NewContentModal from './NewContentModal';
import ActionBar from '../../../../components/layout/ActionBar';
import ContentTable from './ContentTable';
import { useRequest } from '../../../../helpers/request-helper';

function ShowContent({ schema, setDefaultKey, defaultKey }) {
  const router = useRouter();
  const [isContentModal, setIsContentModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [editableData, setEditableData] = useState([]);
  const { schemaSlug } = router.query;

  const [{ data, loading, error }, getContent] = useRequest(
    {
      method: 'GET',
      url: `/content/${schemaSlug}`,
    },
  );

  if (error) {
    message.error(error.response.data.message || error.response.data.messages[0]);
  }

  const [{}, deleteContent] = useRequest(
    {
      method: 'DELETE',
    },
    { manual: true },
  );

  const getEditableData = (content) => {
    setEditableData(content);
  };

  const showContentModal = () => {
    setIsContentModal(true);
  };

  const closeContentModal = () => {
    setIsContentModal(false);
  };

  const addNewContent = () => {
    setIsEditable(false);
    showContentModal();
  };

  const actions = {
    buttons: [
      {
        name: 'Add new content',
        icon: <PlusOutlined />,
        onClick: addNewContent,
      },
    ],
  };

  const handleChangeTab = () => {
    setDefaultKey('2');
  };
  return (
    <div>
      <div>
        {(schema && schema.schema.length !== 0)
          ? <ActionBar actions={actions} /> : null }
      </div>

      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : null}
      {isContentModal ? (
        <NewContentModal
          closeContentModal={closeContentModal}
          schemaDetails={schema || []}
          getContent={getContent}
          isEditable={isEditable}
          editableData={editableData}
          showContentModal={showContentModal}
        />
      ) : null }

      {schema.schema.length > 0
        ? (
          <ContentTable
            tableSchema={schema || []}
            data={data}
            setDefaultKey={setDefaultKey}
            showContentModal={showContentModal}
            closeContentModal={closeContentModal}
            setIsEditable={setIsEditable}
            getEditableData={getEditableData}
            deleteContent={deleteContent}
            getContent={getContent}
          />
        )
        : (
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translate(100%,-50%)',
          }}
          >
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            <Button type="primary" shape="round" onClick={handleChangeTab}>
              Go to Structure
            </Button>
          </div>
        )}
    </div>
  );
}

export default ShowContent;
