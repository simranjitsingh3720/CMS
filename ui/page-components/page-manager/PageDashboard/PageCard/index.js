/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import {
  MoreOutlined,
} from '@ant-design/icons';
import {
  Empty, Popover, Button,
} from 'antd';
import { useRouter } from 'next/router';
import Text from 'antd/lib/typography/Text';
import styles from './style.module.scss';
import PageEditModal from './PageEditModal';
import { useRequest } from '../../../../helpers/request-helper';
import CardWrapper from '../../../../components/CardWrapper';

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

  const contentT = (page) => (
    <div>
      <Button
        type="text"
        onClick={() => { showModal(page); }}
        key="edit"
        className="third-step"
      >
        Edit Page
      </Button>
      <br />
      <Button
        type="text"
        onClick={() => { handleView(page.slug); }}
        key="delete"
        className="fourth-step"
      >
        View Page
      </Button>
    </div>
  );

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
                onClick={() => { handleEdit(page.slug); }}
                role="button"
              >
                <div
                  className={styles.card_image}
                  style={{ backgroundImage: `url(${ssImage})`, backgroundSize: 'cover' }}
                />
              </div>

              <div className={styles.page_action}>
                <div>
                  <Text style={{ margin: '0 ' }}>
                    Title:
                    {' '}
                    {page.name}
                  </Text>
                  <br />
                  <Text style={{ color: 'gray', margin: '0' }}>
                    Slug: /
                    {page.slug}
                  </Text>
                </div>
                <Popover content={contentT(page)} placement="bottomLeft">
                  <button
                    type="button"
                    className={styles.page_button}
                  >
                    <MoreOutlined />
                  </button>
                </Popover>

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
