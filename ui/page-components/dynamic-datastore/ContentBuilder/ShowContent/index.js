import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import NewContentDrawer from './NewContentDrawer';
import ActionBar from '../../../../components/layout/ActionBar';
import ContentTable from './ContentTable';
import { useRequest } from '../../../../helpers/request-helper';

function ShowContent({ schema }) {
  const router = useRouter();
  const [isContentDrawer, setIsContentDrawer] = useState(false);
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

  const showContentDrawer = () => {
    setIsContentDrawer(true);
  };

  const closeContentDrawer = () => {
    setIsContentDrawer(false);
  };

  const addNewContent = () => {
    setIsEditable(false);
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

      {loading ? <Spin size="large" /> : null}
      {error ? <h1>{error}</h1> : null}
      {isContentDrawer ? (
        <NewContentDrawer
          closeContentDrawer={closeContentDrawer}
          schemaDetails={schema || []}
          getContent={getContent}
          isEditable={isEditable}
          editableData={editableData}
          showContentDrawer={showContentDrawer}
        />
      ) : null }

      <ContentTable
        tableSchema={schema || []}
        data={data}
        showContentDrawer={showContentDrawer}
        closeContentDrawer={closeContentDrawer}
        setIsEditable={setIsEditable}
        getEditableData={getEditableData}
        deleteContent={deleteContent}
        getContent={getContent}

      />
    </div>
  );
}

export default ShowContent;
