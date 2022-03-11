import {
  Button, message, Modal, Popover,
} from 'antd';
import React, { useState, useRef } from 'react';
import {
  ExclamationCircleOutlined,
  MoreOutlined,
  PictureOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import AssetDrawer from '../AssetDrawer';
import styles from './style.module.scss';
import { useRequest } from '../../../helpers/request-helper';
import CardWrapper from '../../../components/CardWrapper';

const { confirm } = Modal;

function AssetCard({ data, refetch }) {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(null);
  const refPlayVideo = useRef(null);
  const [{ deleteError }, handleDelete] = useRequest(
    {
      method: 'DELETE',
      url: `/asset/${data.id}`,
    },
    { manual: true },
  );

  const showConfirm = () => {
    setVisible(false);
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

  const showModal = () => {
    setVisibleDrawer(true);
  };

  const showModalPic = () => {
    // refPlayVideo.current.internalPlayer.pauseVideo();
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const handleTest = () => {
  //   refPlayVideo.current.internalPlayer.pauseVideo();
  // };

  const content = (
    <div>
      <Button
        type="text"
        onClick={showModal}
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
              onClick={showModalPic}
            />
          )
          : (
            <video style={{ height: '200px', width: '100%' }} src={data.url} onClick={showModalPic}>
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
      <AssetDrawer
        flag={false}
        visible={visibleDrawer}
        setVisible={setVisibleDrawer}
        refetch={refetch}
        data={data}
      />

      <Modal
        visible={isModalVisible}
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
              style={{ height: '100%', width: '100%' }}
              src={data.url}
              controls
              autoPlay

              // loop
              onClick={showModalPic}
              // ref={refPlayVideo}
            >
              Your browser does not support the video tag.
            </video>
          ) }

        {/* <button type="button" onClick={handleTest}>TEST CLick</button> */}
      </Modal>
    </>
  );
}
export default AssetCard;
