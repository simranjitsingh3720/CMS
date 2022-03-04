import {
  Card, message, Modal, Tooltip,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Asset from './Asset';
import AssetDrawer from '../AssetDrawer';
import styles from './styles.module.scss';
import { useRequest } from '../../../helpers/request-helper';

const { Meta } = Card;
const { confirm } = Modal;

function AssetCard({ data, refetch }) {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

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

  const showModal = () => {
    setVisibleDrawer(true);
  };

  return (
    <>
      <Card
        style={{ width: 280, height: 330, padding: '0px 15px', paddingTop: '15px', borderRadius: '8px' }}
        cover={(
          <Asset
            data={data}
          />
    )}
        className={styles.asset_card}

        // eslint-disable-next-line react/jsx-props-no-multi-spaces
        actions={[
          <Tooltip title="Edit Asset">
            <EditOutlined
              key="edit"
              className="third-step"
              onClick={showModal}
              style={{ border: '0px' }}
            />

          </Tooltip>,
          <Tooltip title="Delete Asset">
            <DeleteOutlined
              key="delete"
              className="fourth-step"
              onClick={showConfirm}
              style={{ border: '0px' }}
            />

          </Tooltip>,
        ]}
      >
        <Meta
          title={data.name}
          description={data.description}
        />
      </Card>
      <AssetDrawer
        flag={false}
        visible={visibleDrawer}
        setVisible={setVisibleDrawer}
        refetch={refetch}
        data={data}
      />
    </>
  );
}
export default AssetCard;
