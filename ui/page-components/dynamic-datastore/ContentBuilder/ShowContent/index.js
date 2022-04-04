import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import {
  Button, Empty, Spin, Popover, List,
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
  const [checked, setChecked] = useState(false);
  const [defaultChecked, setDefaultChecked] = useState(false);
  const { schemaSlug } = router.query;

  useEffect(() => {
    const data = [...schema.list];
    setShowFields((prev) => ({ ...prev, list: data }));
    setChecked(true);
    setDefaultChecked(false);
  }, [schema]);

  const [{ data, loading }, getContent] = useRequest(
    {
      method: 'GET',
      url: `/content/${schemaSlug}`,
    },
  );

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
    if (index !== 0) {
      setDefaultChecked(true);
      const newFieldss = [...showFields.list];
      newFieldss.splice(index, 0, field);
      if (e.target.checked) {
        setShowFields((prev) => ({
          ...prev, list: [...newFieldss],
        }));
      } else {
        const newFields = showFields.list.filter((ele) => ele.id !== field.id);
        setShowFields((prev) => ({
          ...prev, list: [...newFields],
        }));
      }
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
        {(schema && schema.list.length !== 0 && data && data.list.length > 0)
          ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <ActionBar actions={actions} />
              </div>
              <div>
                <Popover
                  content={
            schema.list.map((field, index) => (
              <List value={field.name} key={field.id}>
                {(checked && defaultChecked)
                  ? <input type="checkbox" onClick={(e) => { handleShowFields(e, field, index); }} id={field.id} defaultChecked disabled={index === 0} />
                  : <input type="checkbox" onClick={(e) => { handleShowFields(e, field, index); }} id={field.id} checked disabled={index === 0} />}
                {' '}
                <span style={{ marginLeft: '10px' }}>{field.name}</span>
              </List>
            ))
          }
                  title="Select Column to Show"
                  trigger="click"
                >
                  <Button className="select">
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

      {schema.list.length > 0 && data && data.list.length > 0
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
            {schema.list.length <= 0 ? (
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
