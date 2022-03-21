import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Table,
  Modal,
  message,
  Button,
  Empty,
} from 'antd';
import React from 'react';
import moment from 'moment';
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
      content: <div>It may contains some sensitive information.</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteContent({
          url: `/content/${tableSchema.slug}/${content.id}`,
        }).then(() => {
          message.success('Deleted Successfully !');
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

  const switchFieldsId = ((tableSchema && tableSchema.schema) || []).filter((field) => field.appearanceType === 'Switch');

  const dateAndTimeFieldsId = ((tableSchema && tableSchema.schema) || []).filter((field) => field.appearanceType === 'Date and Time');

  const dateFieldsId = ((tableSchema && tableSchema.schema) || []).filter((field) => field.appearanceType === 'Date');

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

      if (dateAndTimeFieldsId.length > 0) {
        dateAndTimeFieldsId.forEach((field) => {
          if (updatedContent[field.id] !== null) {
            const dateFormat = 'YYYY/MM/DD HH:mm:ss';
            const testDateUtc = moment.utc(updatedContent[field.id]);
            const localDate = testDateUtc.local();
            updatedContent[field.id] = localDate.format(dateFormat);
          }
        });
      }
      if (dateFieldsId.length > 0) {
        dateFieldsId.forEach((field) => {
          if (updatedContent[field.id] !== null) {
            const dateFormat = 'YYYY/MM/DD ';
            const testDateUtc = moment.utc(updatedContent[field.id]);
            const localDate = testDateUtc.local();
            updatedContent[field.id] = localDate.format(dateFormat);
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
      <Table
        columns={columns}
        dataSource={finalData}
        scroll={{ x: 1300 }}
      />
    </div>
  );
}
