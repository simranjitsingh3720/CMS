import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined, ExclamationCircleOutlined, ShareAltOutlined } from '@ant-design/icons';
import { message, Modal, Empty, Button } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import ActionBar from '../../../../components/layout/ActionBar';
import StructureModal from './StructureModal';
import { useRequest } from '../../../../helpers/request-helper';
import DragableList from './DragDrop/DragableList';
import ShareFormModal from './ShareFormModal';

const { confirm } = Modal;

function ShowSchema() {
  const router = useRouter();
  const { schemaSlug } = router.query;
  const [isSchemaModal, setIsSchemaModal] = useState(false);
  const [editSchemaModal, setEditSchemaModal] = useState(false);
  const [fieldData, setFieldData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [fieldsId, setFieldsId] = useState('');
  const [fields, setFields] = useState([]);
  const [reFetchSchema, setReFetchSchema] = useState(false);
  const [isFieldReordering, setIsFieldReordering] = useState(false);
  const [showShareFormModal, setshowShareFormModal] = useState(false);

  const showSchemaModal = () => {
    setIsEditable(false);
    setIsSchemaModal(true);
  };

  const shareFormModal = () => {
    setshowShareFormModal(true);
  };
  const closeShareFormModal = () => {
    setshowShareFormModal(false);
  };

  const showEditSchemaModal = () => {
    setIsEditable(true);
    setIsSchemaModal(false);
  };

  const closeSchemaModal = () => {
    setIsSchemaModal(false);
  };

  const closeEditSchemaModal = () => {
    setEditSchemaModal(false);
  };

  const [{}, fieldDelete] = useRequest(
    {
      method: 'DELETE',

    },
    { manual: true },
  );

  const [{ data }, getSchema] = useRequest(
    {
      method: 'GET',
      url: `/schema/${schemaSlug}`,
    },
    { manual: true },
  );

  const [{ },
    executeFieldsReordering,
  ] = useRequest(
    {
      url: `/schema/${schemaSlug}/field/`,
      method: 'PATCH',

    },
    { manual: true },
  );

  const deleteField = (id) => {
    confirm({
      title: 'Do you Want to delete this Field',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: <div>It may contains some sensitive data.</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        fieldDelete({
          url: `/schema/${schemaSlug}/field/${id}`,
        }).then(() => {
          message.success('Field deleted successfully');
          setReFetchSchema(true);
        }).catch((err) => {
          message.error(err.response.data.message
          || err.response.data.messages[0]);
        });
      },
      onCancel() {
      },
    });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFields((sortAbleItems) => arrayMoveImmutable(sortAbleItems, oldIndex, newIndex));
    setIsFieldReordering(true);
  };

  useEffect(() => {
    if (schemaSlug) {
      getSchema().then((res) => {
        setReFetchSchema(false);
        setFields(res.data.schema);
      });
    }
  }, [reFetchSchema]);

  useEffect(() => {
    if (fields.length > 0) {
      executeFieldsReordering({
        data: {
          schema: fields,
        },
      }).then(() => {
        setIsFieldReordering(false);
      });
    }
  }, [isFieldReordering]);

  const actions = {
    buttons: [{
      name: 'Add new Field',
      icon: <PlusOutlined />,
      onClick: showSchemaModal,
    }, {
      name: 'Share',
      icon: <ShareAltOutlined />,
      onClick: shareFormModal,
    }],
  };

  return (
    <div>
      {fields.length !== 0
        ? <ActionBar actions={actions} />
        : null }
      <div>
        {showShareFormModal ? (
          <div>
            <ShareFormModal
              showShareFormModal={shareFormModal}
              closeShareFormModal={closeShareFormModal}
              loading
              formId={data.id}
              title={data.title}
            />
          </div>
        ) : null}
        {isSchemaModal
          ? (
            <div>
              <StructureModal
                showSchemaModal={showSchemaModal}
                closeSchemaModal={closeSchemaModal}
                getSchema={getSchema}
                data={data}
                fieldsId={fieldsId}
                setReFetchSchema={setReFetchSchema}
              />
            </div>
          )
          : null}
      </div>
      <div>
        {editSchemaModal
          ? (
            <StructureModal
              showSchemaModal={showEditSchemaModal}
              closeSchemaModal={closeEditSchemaModal}
              getSchema={getSchema}
              isEditable={isEditable}
              fieldsId={fieldsId}
              fieldData={fieldData}
              data={data}
              setReFetchSchema={setReFetchSchema}
            />
          )
          : null}

      </div>
      <div>
        { (data && data.schema.length <= 0) ? (
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translate(100%,-50%)',
          }}
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={(
                <span>
                  Oops!! No Fields Found.
                  <br />
                  <br />
                  <Button type="primary" shape="round" onClick={showSchemaModal}>
                    <PlusOutlined />
                    Add New Fields
                  </Button>
                </span>
                  )}
            />
          </div>
        )
          : (
            <DragableList
              useDragHandle
              fieldActions={{
                setEditSchemaModal,
                closeSchemaModal,
                setFieldsId,
                setIsEditable,
                setFieldData,
                deleteField,
              }}
              items={fields}
              onSortEnd={onSortEnd}
            />
          )}
      </div>
    </div>
  );
}

export default ShowSchema;
