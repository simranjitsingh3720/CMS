import React, { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Card, Tooltip, Modal } from 'antd';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import styles from './style.module.scss';
import 'antd/dist/antd.css';

const { Meta } = Card;
const { confirm } = Modal;

function PageCard({ searchValue }) {
  const [ssImage, setSsImage] = useState(null);

  const { push } = useRouter();

  useEffect(() => {
    setSsImage(localStorage.getItem('image'));
  }, []);

  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:8000/api/page',
    method: 'GET',
    params: {
      q: searchValue,
    },
  });

  const handleEdit = (newSlug) => {
    push('/admin/page-manager/builder/[pageID]', `/admin/page-manager/builder/${newSlug}`);
  };

  const handleView = (newSlug) => {
    window.open(`/${newSlug}`, '_blank');
  };

  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    handleDeletePage] = useAxios(
    {
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );

  function showConfirm(slugForDelete) {
    confirm({
      title: 'Do you Want to delete this page?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        handleDeletePage({
          url: `http://localhost:8000/api/page/${slugForDelete}`,
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // const handleDelete = (slugForDelete) =>{
  //   handleDeletePage({
  //     url:`http://localhost:8000/api/page/${slugForDelete}`,
  //   })
  // }
  useEffect(() => {
    refetch();
  }, [deleteData]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error!</p>;

  return (
    <div>
      <div className={styles.card_component}>
        {
         ((data && data.list) || []).map((page) => (
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
                   <span style={{ fontWeight: 'bold' }}>Title:</span>
                   {page.name}
                 </p>
                  )}
               description={(
                 <p className={styles.card_description}>
                   <span style={{ fontWeight: 'bold' }}>Slug:</span>
                   /
                   {page.slug}
                 </p>
                  )}
             />
           </Card>
         ))
        }
      </div>
    </div>
  );
}

export default PageCard;
