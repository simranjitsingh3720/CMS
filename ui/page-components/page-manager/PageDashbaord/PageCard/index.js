import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Card, Empty, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import PageEditDrawer from './PageEditDrawer';
import { useRequest } from '../../../../helpers/request-helper';

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

  useEffect(() => {
    console.log('load card');
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
        refetch={refetch}
      />
      <div />
    </div>
  );
}

export default PageCard;
