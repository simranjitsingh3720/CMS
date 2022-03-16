import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Table,
  Modal,
  message,
  Button,
  Empty,
} from 'antd';
import React from 'react';
import getColumns from './getColumns/getColumns';
import styles from './style.module.scss';

const { confirm } = Modal;

export default function ContentTable({
  tableSchema, data,
  showContentModal, setIsEditable, getEditableData,
  deleteContent, getContent,
}) {
  const handleEditContent = (content) => {
    getEditableData(content);
    showContentModal(true);
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
        }).then(() => {
          getContent();
        }).catch((err) => {
          message.error(err.response.data.message || err.response.data.messages[0]);
        });
      },
      onCancel() {
        console.log('CANCELLED');
      },
    });
  };

  const columns = getColumns(tableSchema, handleEditContent, handleDeleteContent);
  let finalData = [];

  const switchFieldsId = ((tableSchema && tableSchema.schema) || []).filter((field) => field.appearanceType === 'switch');

  if (data) {
    finalData = data.list.map((content) => {
      const updatedContent = { ...content.data };
      if (switchFieldsId.length > 0) {
        switchFieldsId.forEach((field) => {
          if (updatedContent[field.id] !== undefined) {
            if (updatedContent[field.id]) {
              updatedContent[field.id] = field.Truelabel;
            } else {
              updatedContent[field.id] = field.Falselabel;
            }
          }
        });
      }

      return {
        ...updatedContent,
        Actions: { ...content.data, id: content.id },
      };
    });
  }
  return (
    <div>
      {columns.length >= 2 ? (
        <Table
          columns={columns}
          dataSource={finalData}
          scroll={{ x: 1300 }}
        />
      ) : (
        <div className={styles.add_button_container}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <Button type="primary" shape="round">
            <PlusOutlined />
            Go to Structure
          </Button>
        </div>
      )}
    </div>
  );
}
