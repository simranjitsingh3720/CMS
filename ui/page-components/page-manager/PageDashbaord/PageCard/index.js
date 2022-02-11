import {
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Card, Avatar, message, Image, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import styles from './style.module.scss';
import 'antd/dist/antd.css';

const { Meta } = Card;

function PageCard({ handleCreatePage, searchValue }) {
  // const [pages, setPages] = useState([]);
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

  useEffect(() => {

    refetch();
  }, [handleCreatePage]);

  const handleEdit = (newSlug) => {
    push('/admin/page-manager/builder/[pageID]', `/admin/page-manager/builder/${newSlug}`);
  };

  const handleView = (newSlug) => {
    push('/[pageView]', `/${newSlug}`);
  };

  const handleDelete = (newSlug) => {
    axios.delete(`http://localhost:8000/api/page/${newSlug}`);
    message.warning('Page Deleted Successfully', 5);
  };

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
               <Tooltip title="Delete Page">
                 <DeleteOutlined key="delete" onClick={() => { handleDelete(page.slug); }} />
               </Tooltip>,
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
