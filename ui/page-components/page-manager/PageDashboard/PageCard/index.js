import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Card, Empty, Tooltip, Divider } from 'antd';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import PageEditDrawer from './PageEditDrawer';
import { useRequest } from '../../../../helpers/request-helper';
import CardWrapper from '../../../../components/CardWrapper';

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
      q: searchValue.toLowerCase(),
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
    refetch();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>

      <div className={styles.card_componentW}>
        { data && data.list.length <= 0 ? <div style={{ width: '100%' }}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
          : ((data && data.list) || []).map((page) => (
            <CardWrapper>
              <div
                className={styles.card_image}
                style={{ backgroundImage: `url(${ssImage})`, backgroundSize: 'cover' }}
              />

              <Meta
                title={(
                  <p className="card_title">
                    <span onClick={() => { handleEdit(page.slug); }}>
                      <span style={{ fontWeight: 'bold' }}>Title: </span>
                      {page.name}
                    </span>
                  </p>
                   )}
                description={(
                  <p className="card_description">
                    <span style={{ fontWeight: 'bold' }}>Slug: </span>
                    /
                    {page.slug}
                  </p>
                   )}
              />

              <div className="card_action">
                <Tooltip title="View Page">
                  <EyeOutlined key="view" onClick={() => { handleView(page.slug); }} style={{ fontSize: '16px' }} />
                </Tooltip>
                <Divider type="vertical" style={{ height: '22px', color: 'rgb(236, 233, 233)' }} />
                <Tooltip title="Edit Page">
                  <EditOutlined key="edit" onClick={() => { showDrawer(page); }} style={{ fontSize: '16px' }} />
                </Tooltip>
              </div>

            </CardWrapper>

          ))}

      </div>
      <div />
      <PageEditDrawer
        onFormClose={onClose}
        visible={visible}
        setVisible={setVisible}
        pageData={pageData}
        fetch={refetch}
      />
      <div />
    </>
  );
}

export default PageCard;
