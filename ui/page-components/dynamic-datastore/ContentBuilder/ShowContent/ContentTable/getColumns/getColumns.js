import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { useRequest } from '../../../../../../helpers/request-helper';
import styles from './style.module.scss';

export default function getColumns(tableSchema, handleEditContent, handleDeleteContent) {
  let columns = [];

  columns = ((tableSchema && tableSchema.schema) || []).map((field, index) => {
    // console.log('tableSchema');
    if (tableSchema.schema[index].type === 'Assets') {
      return {
        title: field.name,
        dataIndex: field.id,
        key: field.id,
        render: (actions) =>
          // console.log('actions: ===', actions);
          (
            <div>
              {JSON.stringify(actions)}
              {/* lu */}
              {actions ? (
                actions.fileList ? (
                  actions.fileList.map((action) => (
                    <div>
                      <a href={action.readUrl} target="_blank" rel="noreferrer">{action.name}</a>
                    </div>
                  ))
                )
                  : (
                    actions.map((action) => (
                      <div>
                        <a href={action.readUrl} target="_blank" rel="noreferrer">{action.name}</a>
                      </div>
                    ))
                  )

              ) : 'No asset content'}
            </div>
          )

        ,
      };
    }

    return {
      title: field.name,
      dataIndex: field.id,
      key: field.id,
      render: '',
    };
  });

  columns = [...columns, {
    title: 'Actions',
    dataIndex: 'Actions',
    key: 'actions',
    render: (actions) => (
      <Space>
        <Tooltip title="edit content">
          <Button id="edit-content" className={styles.actionContentButton} onClick={() => handleEditContent(actions)}>
            <EditOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="delete content">

          <Button id="delete-content" className={styles.actionContentButton} danger onClick={() => handleDeleteContent(actions)}>
            <DeleteOutlined />
          </Button>
        </Tooltip>

      </Space>

    ),
  }];

  return columns;
}
