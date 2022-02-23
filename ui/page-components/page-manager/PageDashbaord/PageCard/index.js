import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Card, Empty, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
<<<<<<< HEAD
import 'antd/dist/antd.css';
import PageEditDrawer from './PageEditDrawer';
=======
import { useRequest } from '../../../../helpers/request-helper';
>>>>>>> 0816001906e0576e0e5fff2f55eb03d19171da1f

const { Meta } = Card;

function PageCard({ searchValue }) {
  const [ssImage, setSsImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [pageData, setPageData] = useState('');

  const { push } = useRouter();

  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = (data) => {
    console.log(data);
    setVisible(true);
    setPageData(data);
  };

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

<<<<<<< HEAD
=======
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

>>>>>>> 0816001906e0576e0e5fff2f55eb03d19171da1f
  useEffect(() => {
    refetch();
  }, []);

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
                  <EditOutlined key="edit" onClick={() => { showDrawer(page); }} />
                </Tooltip>,
              ]}
            >

              <Meta
                title={(
                  <p className={styles.card_title}>
                    <span onClick={() => { handleEdit(page.slug); }}>
                      <span style={{ fontWeight: 'bold' }}>Title: </span>
                      {page.name}
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
      <div />
      <PageEditDrawer
        onFormClose={onClose}
        visible={visible}
        setVisible={setVisible}
        data={pageData}
      />
      <div />
    </div>
  );
}

export default PageCard;
