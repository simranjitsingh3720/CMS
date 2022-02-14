import {
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Card, message, Tooltip, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import styles from './style.module.scss';
import 'antd/dist/antd.css';

const { Meta } = Card;

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
    // push('/[pageView]', `/${newSlug}`);
    window.open(`/${newSlug}`, '_blank');
  };

  const [{data:deleteData, loading:deleteLoading, error:deleteError}, handleDeletePage] = useAxios(
    {
      method:'DELETE'
    },
    {
      manual:true
    }
  )

  const handleDelete = (slugForDelete) =>{
    handleDeletePage({
      url:`http://localhost:8000/api/page/${slugForDelete}`,
    });
    message.warning("Page deleted Successfully");
  }
  useEffect(() => {
    refetch()
  }, [deleteData])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <div className={styles.card_component}>
        {
         data.list.map((page, index) => (
           <Card
             key={index}
             style={{ width: 260, margin: 15 }}
             cover={(

               <div
                 className={styles.card_image}
                style={{backgroundImage:`url(${ssImage})`,backgroundSize:'cover'}}
                 alt="Card View"
               />

              )}
             actions={[
               <Tooltip title="View Page">
                 <EyeOutlined key="view" onClick={() => { handleView(page.slug); }} />
               </Tooltip>,
               <Tooltip title="Edit Page">
                 <FormOutlined key="edit" onClick={() => { handleEdit(page.slug); }} />
               </Tooltip>,
               <Popconfirm title="Are you sure delete this Page?"
                onConfirm={() => handleDelete(page.slug)}
                 okText="Yes" cancelText="No">
                <Tooltip title="Delete Page">
                  <DeleteOutlined key="delete"/>
                </Tooltip>
               </Popconfirm>
             ]}
           >
            
             <Meta
               title={(
                 <p className={styles.card_title}>
                   <span style={{ fontWeight: 'bold' }}>Title:</span>
                   {' '}
                   {page.name}
                 </p>
                  )}
               description={(
                 <p className={styles.card_description}>
                   <span style={{ fontWeight: 'bold' }}>Slug:</span>
                   {' '}
                   /
                   {page.slug}

                 </p>
)}
             />
            
           </Card>
         ))
}
      </div>
    </div>,
  );
}

export default PageCard;
