import React, { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Card, message, Modal, Empty, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import { useRequest } from '../../../../helpers/request-helper';

const { Meta } = Card;
const { confirm } = Modal;

function PageCard({ searchValue }) {
  const [ssImage, setSsImage] = useState(null);

  const { push } = useRouter();

  useEffect(() => {
    setSsImage(localStorage.getItem('image'));
  }, []);

  const [{ data, loading, error }, refetch] = useRequest({
    url: '/page',
    method: 'GET',
    params: {
      q: searchValue,
    },
  });

  const handleEdit = (newSlug) => {
    if (newSlug) {
      push('/admin/page-manager/builder/[pageID]', `/admin/page-manager/builder/${newSlug}`);
    }
    push('/admin/page-manager/builder');
  };

  const handleView = (newSlug) => {
    window.open(`/${newSlug}`, '_blank');
  };

  const [{ data: homeData }, executeHandleHome] = useRequest(
    {
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  function handleHome(newSlug) {
    executeHandleHome({
      url: `/updateHome/${newSlug}`,
    }).then(() => {
      message.success('Home Updated Successfully', 5);
    })
      .catch((err) => {
        console.log('Error => ', err);
      });
  }

  // useEffect(() => {
  //   refetch();
  // }, [homeData]);

  const [{ data: deleteData }, handleDeletePage] = useRequest(
    {
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );

  function showConfirm(slugForDelete) {
    console.log(slugForDelete);
    if (slugForDelete === '') {
      Modal.error({
        title: 'Home Page cannot be deleted...',
        okText: 'OK',
        okType: 'danger',
      });
    } else {
      confirm({
        title: 'Are you sure to delete this page?',
        icon: <ExclamationCircleOutlined />,
        content: <p className={styles.modal_content}>After Deleting this Page you won't be able to use this slug</p>,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          handleDeletePage({
            url: `/page/${slugForDelete}`,
          });
          message.success('Page Deleted Successfully!');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }

  useEffect(() => {
    refetch();
  }, [deleteData, homeData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <div className={styles.card_component}>
        { data && data.list.length <= 0 ? <div style={{ width: '100%' }}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
          : ((data && data.list) || []).map((page) => (
            <Card
              key={page.id}
              style={{ width: 260, margin: 15 }}
              cover={(
                <div
                  className={styles.card_image}
                  style={{ backgroundImage: `url(${ssImage})`, backgroundSize: 'cover' }}
                />

              )}
              actions={[
                <Tooltip title="View Page">
                  <EyeOutlined key="view" onClick={() => { handleView(page.slug); }} />
                </Tooltip>,
                <Tooltip title="Edit Page">
                  <FormOutlined key="edit" onClick={() => { handleEdit(page.slug); }} />
                </Tooltip>,
                <Tooltip title="Delete Page">
                  <DeleteOutlined key="delete" onClick={() => showConfirm(page.slug)} />
                </Tooltip>,

              ]}
            >
              <Meta
                title={(
                  <p className={styles.card_title}>
                    <span>
                      <span style={{ fontWeight: 'bold' }}>Title: </span>
                      {page.name}
                    </span>
                    <span>
                      {page.slug === ''
                        ? (
                          <Tooltip title="Home Page">

                            <HomeOutlined key="home" style={{ color: 'red' }} />
                          </Tooltip>
                        )
                        : (
                          <Tooltip title="Make This Page Home">
                            <HomeOutlined key="home" style={{ color: 'lightGrey' }} onClick={() => { handleHome(page.slug); }} />

                          </Tooltip>
                        )}
                    </span>
                  </p>
                  )}
                description={(
                  <p className={styles.card_description}>
                    <span style={{ fontWeight: 'bold' }}>Slug: </span>
                    /
                    {page.slug}
                  </p>
                  )}
              />
            </Card>
          ))}
      </div>
    </div>
  );
}

export default PageCard;
