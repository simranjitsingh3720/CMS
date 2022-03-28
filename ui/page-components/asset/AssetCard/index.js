import {
  Button, message, Modal, Popover,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import {
  ExclamationCircleOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import AssetModal from '../AssetModal';
import styles from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import CardWrapper from '../../../components/CardWrapper';
import { CardPreview, CardTitle, Preview } from './Asset/Preview';

const { confirm } = Modal;

function AssetCard({ data, refetch }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);

  const [{ deleteError }, handleDelete] = useRequest(
    {
      method: 'DELETE',
      url: `/asset/${data.id}`,
    },
    { manual: true },
  );

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      content: <div>It may contains some sensitive data.</div>,
      async onOk() {
        await handleDelete();
        if (deleteError) {
          message.error(deleteError.response.data.messages[0]
             || deleteError.response.data.messages);
        } else {
          message.success('Asset Deleted');
          await refetch();
        }
      },
    });
  };

  const showEditModal = () => {
    setIsModalVisible(true);
  };

  const showAssetPreviewModal = () => {
    setIsPreviewModalVisible(true);
  };

  const handleCancel = () => {
    setIsPreviewModalVisible(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisible(false);
  };

  const content = (
    <div>
      <Button
        type="text"
        onClick={showEditModal}
        key="edit"
        className="third-step"
      >
        Rename Asset
      </Button>
      <br />
      <Button
        type="text"
        onClick={showConfirm}
        key="delete"
        className="fourth-step"
      >
        Delete Asset

      </Button>
    </div>
  );

  return (
    <>
      <CardWrapper>
        <CardPreview data={data} showAssetPreviewModal={showAssetPreviewModal} />

        <div className={styles.asset_action}>
          <div className="flex-container">
            <CardTitle data={data} />
            {' '}
            <Text style={{ wordBreak: 'break-word' }}>{data.name}</Text>
          </div>
          <Popover content={content} placement="bottomLeft">
            <button
              type="button"
              className={styles.card_button}
            >
              <MoreOutlined />
            </button>
          </Popover>

        </div>
      </CardWrapper>
      <AssetModal
        flag={false}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        refetch={refetch}
        // handleOk={handleOkEdit}
        handleCancel={handleCancelEdit}
        data={data}
      />

      {isPreviewModalVisible ? (
        <Modal
          visible={isPreviewModalVisible}
          // onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={1200}
          style={{ marginTop: '-40px' }}
        >
          <Preview data={data} />
        </Modal>
      ) : null}
    </>
  );
}
export default AssetCard;
