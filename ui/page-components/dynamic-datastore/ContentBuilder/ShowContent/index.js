import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import NewContentModal from './NewContentModal';
import ActionBar from '../../../../components/layout/ActionBar';
import ContentTable from './ContentTable';
import { useRequest } from '../../../../helpers/request-helper';

function ShowContent({ schema }) {
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

  const [{ data: deletedData }, deleteContent] = useRequest(
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

      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : null}
      {error ? <h1>{error}</h1> : null}
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

      <ContentTable
        tableSchema={schema || []}
        data={data}
        showContentModal={showContentModal}
        closeContentModal={closeContentModal}
        setIsEditable={setIsEditable}
        getEditableData={getEditableData}
        deleteContent={deleteContent}
        getContent={getContent}

      />
    </div>
  );
}

export default ShowContent;
