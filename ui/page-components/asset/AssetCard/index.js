import {
  Button, message, Modal, Popover,
} from 'antd';
import React, { useState } from 'react';
import {
  ExclamationCircleOutlined,
  MoreOutlined,
  PictureOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import AssetModal from '../AssetModal';
import styles from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import CardWrapper from '../../../components/CardWrapper';

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
      async onOk() {
        await handleDelete();
        if (deleteError) {
          message.error('Item not deleted');
        } else {
          message.success('Item Deleted');
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

  const onKeyPressHandler = () => {
    console.log('HELLO');
  };
  const handleOk = () => {
    setIsPreviewModalVisible(false);
  };

  const handleCancel = () => {
    setIsPreviewModalVisible(false);
  };

  const handleOkEdit = () => {
    setIsModalVisible(false);
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
        {(data && data.type === 'image')
          ? (
            <div
              style={{
                backgroundImage: `url(${data.url})`,
                backgroundSize: 'cover',
                height: '200px',
              }}
              onClick={showAssetPreviewModal}
              onKeyPress={onKeyPressHandler}
              role="button"
            />
          )
          : (
            <video style={{ height: '200px', width: '100%' }} src={data.url} onClick={showAssetPreviewModal}>
              Your browser does not support the video tag.
            </video>

          ) }

        <div className={styles.asset_action}>
          <div className="flex-container">
            {data.type === 'image'
              ? <PictureOutlined style={{ fontSize: '18px', marginRight: '5px' }} />
              : <PlayCircleOutlined style={{ fontSize: '18px', marginRight: '5px' }} />}
            <h3 style={{ margin: '0 ' }}>{data.name}</h3>
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
        handleOk={handleOkEdit}
        handleCancel={handleCancelEdit}
        data={data}
      />

      {isPreviewModalVisible ? (
        <Modal
          visible={isPreviewModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={1200}
          style={{ marginTop: '-40px' }}
        >
          {(data && data.type === 'image')
            ? (
              <div
                style={{ backgroundImage: `url(${data.url})`, backgroundSize: 'cover', height: '80vh', width: '100%' }}
              />
            )
            : (
              <video
                style={{ height: '80vh', width: '100%' }}
                src={data.url}
                controls
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            ) }
        </Modal>
      ) : null}
    </>
  );
}
export default AssetCard;
