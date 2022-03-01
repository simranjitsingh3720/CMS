import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Table,
  Modal,
  Empty,
} from 'antd';
import React from 'react';
import getColumns from './getColumns/getColumns';
import style from './style.module.scss';

const { confirm } = Modal;

export default function ContentTable({
  tableSchema, data,
  showContentDrawer, setIsEditable, getEditableData,
  deleteContent, getContent,
}) {
  const handleEditContent = (content) => {
    getEditableData(content);
    showContentDrawer(true);
    setIsEditable(true);
  };

  const handleDeleteContent = (content) => {
    confirm({
      title: 'Are you sure to delete the content? ',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: <div style={{ color: 'red' }}>It may contains some sensitive information.</div>,
      onOk() {
        deleteContent({
          url: `/content/${tableSchema.slug}/${content.id}`,
        }).then((res) => {
          getContent();
        });
      },
      onCancel() {

      },
    });
  };

  const columns = getColumns(tableSchema, handleEditContent, handleDeleteContent);
  let finalData = [];

  if (data) {
    finalData = data.list.map((content) => ({
      ...content.data,
      Actions: { ...content.data, id: content.id },
    }));
  }

  return (
    <div>
      {columns.length >= 2 ? <Table columns={columns} dataSource={finalData} /> : (
        <div>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={(
              <span>
                No Content Found
              </span>
    )}
          />
        </div>
      )}
    </div>
  );
}
