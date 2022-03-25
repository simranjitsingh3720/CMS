import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import styles from './style.module.scss';

export default function getColumns(tableSchema, handleEditContent, handleDeleteContent) {
  let columns = [];

  columns = ((tableSchema && tableSchema.schema) || []).map((field, index) => {
    console.log('TABLE SCHEMA', tableSchema.schema[index]);

    if (tableSchema.schema[index].type === 'Assets') {
      return {
        title: field.name,
        dataIndex: field.id,
        key: field.id,
        render: (actions) => (
          <div>
            {actions ? (
              <div>
                {JSON.stringify(actions)}
              </div>
            ) : 'No asset content'}
          </div>
        ),
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
