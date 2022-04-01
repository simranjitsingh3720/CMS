import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import styles from './style.module.scss';

export default function getColumns(tableSchema, handleEditContent, handleDeleteContent) {
  let columns = [];

  console.log('TABLE SCHEMA  ', tableSchema);

  columns = ((tableSchema && tableSchema.list) || []).map((field, index) => {
    if (tableSchema.list[index].type === 'Assets') {
      return {
        title: field.name,
        dataIndex: field.fieldId,
        key: field.fieldId,
        render: (actions) => (
          <div>
            {actions ? <a href={actions.readUrl} target="_blank" rel="noreferrer">{actions.name}</a> : 'No asset content'}
          </div>
        ),
      };
    }

    return {
      title: field.name,
      dataIndex: field.fieldId,
      key: field.fieldId,
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
