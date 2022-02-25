import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

export default function getColumns(tableSchema, handleEditContent, handleDeleteContent) {
  let columns = [];

  columns = ((tableSchema && tableSchema.schema) || []).map((field) => ({
    title: field.name,
    dataIndex: field.name,
    key: field.id,
    render: '',
  }));

  columns = [...columns, {
    title: 'Actions',
    dataIndex: 'Actions',
    key: 'actions',
    render: (actions) => (
      <div>
        <Button onClick={() => handleEditContent(actions)}>
          <EditOutlined />
        </Button>
        <Space wrap>
          <Button danger onClick={() => handleDeleteContent(actions)}>
            <DeleteOutlined />
          </Button>
        </Space>
      </div>
    ),
  }];

  return columns;
}
