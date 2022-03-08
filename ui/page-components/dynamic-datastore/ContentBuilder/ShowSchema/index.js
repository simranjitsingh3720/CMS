import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal, Empty } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import ActionBar from '../../../../components/layout/ActionBar';
import StructureDrawer from './StructureDrawer';
// import FieldCard from './FieldCard';
import { useRequest } from '../../../../helpers/request-helper';
import DragableList from './DragDrop/DragableList';

const { confirm } = Modal;

function ShowSchema() {
  const router = useRouter();
  const { schemaSlug } = router.query;
  const [isSchemaDrawer, setIsSchemaDrawer] = useState(false);
  const [editSchemaDrawer, setEditSchemaDrawer] = useState(false);
  const [fieldData, setFieldData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [fieldsId, setFieldsId] = useState('');
  const [fields, setFields] = useState([]);
  const [reFetchSchema, setReFetchSchema] = useState(false);
  const [isFieldReordering, setIsFieldReordering] = useState(false);

  const showSchemaDrawer = () => {
    setIsEditable(false);
    setIsSchemaDrawer(true);
  };

  const closeSchemaDrawer = () => {
    setIsSchemaDrawer(false);
  };

  const showEditSchemaDrawer = () => {
    setEditSchemaDrawer(true);
  };

  const closeEditSchemaDrawer = () => {
    setEditSchemaDrawer(false);
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
      onOk() {
        fieldDelete({
          url: `/schema/${schemaSlug}/field/${id}`,
        }).then((res) => {
          if (res.data.message) {
            message.error(res.data.message);
          } else {
            message.success('Field deleted successfully');
            setReFetchSchema(true);
          }
        });
      },
      onCancel() {
      },
    });
  };

  const actions = {
    buttons: [{
      name: 'Add new Field',
      icon: <PlusOutlined />,
      onClick: showSchemaDrawer,
    }],
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
      console.log('field reordring');
      executeFieldsReordering({
        data: {
          schema: fields,
        },
      }).then((res) => {
        console.log('refetched ', res);
        setIsFieldReordering(false);
        // setReFetchSchema(true);
      });
    }
  }, [isFieldReordering]);

  return (
    <div>
      <div>
        <ActionBar actions={actions} />
      </div>
      <div>
        {isSchemaDrawer
          ? (
            <StructureDrawer
              closeSchemaDrawer={closeSchemaDrawer}
              getSchema={getSchema}
              data={data}
              fieldsId={fieldsId}
              setReFetchSchema={setReFetchSchema}
            />
          )
          : null}

      </div>
      <div>
        {editSchemaDrawer
          ? (
            <StructureDrawer
              closeSchemaDrawer={closeEditSchemaDrawer}
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
      <div style={{ marginLeft: '50px', marginRight: '50px' }}>
        { (data && data.schema.length <= 0) ? (
          <div>
            <Empty
              style={{ marginTop: '83px' }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={(
                <span>
                  Add fields to store content
                </span>
    )}
            />
          </div>
        )

          : (
            <>
              {JSON.stringify(data && data.schema)}
              <DragableList
                useDragHandle
                fieldActions={{
                  setEditSchemaDrawer,
                  closeSchemaDrawer,
                  setFieldsId,
                  setIsEditable,
                  setFieldData,
                  deleteField,
                }}
                items={fields}
                onSortEnd={onSortEnd}

              />
            </>
          )}
      </div>
    </div>
  );
}

export default ShowSchema;
