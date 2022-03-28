import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import {
  Button, Empty, message, Spin, Popover, List,
} from 'antd';
import NewContentModal from './NewContentModal';
import ActionBar from '../../../../components/layout/ActionBar';
import ContentTable from './ContentTable';
import { useRequest } from '../../../../helpers/request-helper';

function ShowContent({ schema, setDefaultKey }) {
  const router = useRouter();
  const [isContentModal, setIsContentModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editableData, setEditableData] = useState([]);
  const [showFields, setShowFields] = useState(schema);
  const { schemaSlug } = router.query;

  useEffect(() => {
    const data = [...schema.schema];

    setShowFields((prev) => ({ ...prev, schema: data }));
  }, []);

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

  const handleShowFields = (e, field, index) => {
    const newFieldss = [...showFields.schema];

    newFieldss.splice(index, 0, field);

    if (e.target.checked) {
      setShowFields((prev) => ({
        ...prev, schema: [...newFieldss],
      }));
    } else {
      const newFields = showFields.schema.filter((ele) => ele.id !== field.id);
      setShowFields((prev) => ({
        ...prev, schema: [...newFields],
      }));
    }
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
        {(schema && schema.schema.length !== 0 && data && data.list.length > 0)
          ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <ActionBar actions={actions} />
              </div>
              <div>
                <Popover
                  content={
            schema.schema.map((field, index) => (
              <List value={field.name} key={field.id}>
                <input type="checkbox" onClick={(e) => { handleShowFields(e, field, index); }} id={field.id} defaultChecked />
                {' '}
                <span style={{ marginLeft: '10px' }}>{field.name}</span>
              </List>
            ))
          }
                  title="Select Column to Show"
                  trigger="click"
                >
                  <Button>
                    Select Columns
                    {' '}
                    <DownOutlined />
                  </Button>
                </Popover>
              </div>
            </div>
          ) : null }
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
          isContentModal={isContentModal}
        />
      ) : null }

      {schema.schema.length > 0 && data && data.list.length > 0
        ? (
          <ContentTable
            tableSchema={showFields || []}
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
            {schema.schema.length <= 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={(
                  <span>
                    Oops!! No Schema Found.
                    <br />
                    Add Schema in the structure tab
                    <br />
                    <br />
                    <Button type="primary" shape="round" onClick={handleChangeTab}>
                      Go to Structure
                    </Button>
                  </span>
                  )}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={(
                  <span>
                    Oops!! No Content Found.
                    <br />
                    <br />
                    <Button type="primary" shape="round" onClick={addNewContent}>
                      <PlusOutlined />
                      Add new Content
                    </Button>
                  </span>
                  )}
              />
            )}
          </div>
        )}
    </div>
  );
}

export default ShowContent;
