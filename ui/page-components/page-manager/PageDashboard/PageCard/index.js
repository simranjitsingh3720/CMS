import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Card, Empty, Tooltip, Divider } from 'antd';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import PageEditModal from './PageEditModal';
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

  const showModal = (data) => {
    setVisible(true);
    setPageData(data);
  };

  useEffect(() => {
    setSsImage(localStorage.getItem('image'));
  }, []);

  const [{ data }, refetch] = useRequest({
    url: '/page',
    method: 'GET',
    params: {
      q: searchValue.toLowerCase(),
    },
  });

  const handleEdit = (newSlug) => {
    if (newSlug) {
      push(
        '/admin/page-manager/builder/[pageID]',
        `/admin/page-manager/builder/${newSlug}`,
      );
    }
    push('/admin/page-manager/builder');
  };

  const handleView = (newSlug) => {
    window.open(`/${newSlug}`, '_blank');
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>

      <div className="card_component_container">
        { data && data.list.length <= 0 ? (
          <div style={{ width: '100%' }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={(
                <span>
                  No Page Found
                </span>
    )}
            />
          </div>
        )
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
                  <EyeOutlined key="view" onClick={() => { handleView(page.slug); }} style={{ fontSize: '16px' }} id="fifth-step" />
                </Tooltip>
                <Divider type="vertical" style={{ height: '22px', color: 'rgb(236, 233, 233)' }} />
                <Tooltip title="Edit Page">
                  <EditOutlined key="edit" onClick={() => { showModal(page); }} style={{ fontSize: '16px' }} id="sixth-step" />
                </Tooltip>
              </div>

            </CardWrapper>

          ))}

      </div>
      <div />
      <PageEditModal
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
