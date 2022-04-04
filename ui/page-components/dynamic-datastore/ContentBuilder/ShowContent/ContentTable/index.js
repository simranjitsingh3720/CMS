import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Table,
  Modal,
  message,
} from 'antd';
import React, { useEffect } from 'react';
import moment from 'moment';
import getColumns from './getColumns/getColumns';
import ContentTutorial from '../../ContentTutorial';

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

  useEffect(() => {
    getContent();
  }, []);

  const handleDeleteContent = (content) => {
    confirm({
      title: 'Are you sure to delete the content? ',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: <div>It may contain some sensitive information.</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteContent({
          url: `/content/${tableSchema.list && tableSchema.list[0].schemaSlug}/${content.id}`,
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
  const switchFieldsId = ((tableSchema && tableSchema.list) || []).filter((field) => field.appearanceType === 'Switch');

  const dateAndTimeFieldsId = ((tableSchema && tableSchema.list) || []).filter((field) => field.appearanceType === 'Date and Time');

  const dateFieldsId = ((tableSchema && tableSchema.list) || []).filter((field) => field.appearanceType === 'Date');

  const booleanRadioFieldsId = ((tableSchema && tableSchema.list) || []).filter((field) => field.appearanceType === 'Boolean radio');

  if (data) {
    finalData = data.list.map((content) => {
      const updatedContent = { ...content.data };

      if (switchFieldsId.length > 0) {
        switchFieldsId.forEach((field) => {
          if (updatedContent[field.fieldId] !== undefined) {
            if (updatedContent[field.fieldId] === 'true') {
              updatedContent[field.fieldId] = field.Truelabel;
              // updatedContent[field.fieldId] = field.trueLabel;
            } else {
              updatedContent[field.fieldId] = field.Falselabel;
              // updatedContent[field.fieldId] = field.falseLabel;
            }
          }
        });
      }

      if (booleanRadioFieldsId.length > 0) {
        booleanRadioFieldsId.forEach((field) => {
          if (updatedContent[field.fieldId] !== undefined) {
            if (updatedContent[field.fieldId] !== '') {
              if (updatedContent[field.fieldId] === 'true') {
                updatedContent[field.fieldId] = field.Truelabel;
                // updatedContent[field.fieldId] = field.trueLabel;
              } else {
                updatedContent[field.fieldId] = field.Falselabel;
                // updatedContent[field.fieldId] = field.falseLabel;
              }
            }
          }
        });
      }

      if (dateAndTimeFieldsId.length > 0) {
        dateAndTimeFieldsId.forEach((field) => {
          if (updatedContent[field.fieldId] !== undefined
             && updatedContent[field.fieldId] !== null) {
            const dateFormat = 'YYYY/MM/DD HH:mm:ss';
            const testDateUtc = moment.utc(updatedContent[field.fieldId]);
            const localDate = testDateUtc.local();
            updatedContent[field.fieldId] = localDate.format(dateFormat);
          } else {
            updatedContent[field.fieldId] = '';
          }
        });
      }

      if (dateFieldsId.length > 0) {
        dateFieldsId.forEach((field) => {
          if (updatedContent[field.fieldId] !== undefined
            && updatedContent[field.fieldId] !== null) {
            const dateFormat = 'YYYY/MM/DD ';
            const testDateUtc = moment.utc(updatedContent[field.fieldId]);
            const localDate = testDateUtc.local();
            updatedContent[field.fieldId] = localDate.format(dateFormat);
          } else {
            updatedContent[field.fieldId] = '';
          }
        });
      }

      return {
        ...updatedContent,
        Actions: { ...content.data, id: content.contentId },
      };
    });
  }
  return (
    <div>
      <ContentTutorial />
      <Table
        columns={columns}
        dataSource={finalData}
        pagination={finalData.length > 10 ? { pageSize: 10 } : false}
        scroll={{ y: 700 }}
      />

    </div>
  );
}
