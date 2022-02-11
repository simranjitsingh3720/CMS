import {
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Card, Avatar, message, Image, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

const { Meta } = Card;

function PageCard(props) {
  const [pages, setPages] = useState([]);
  const [ssImage, setSsImage] = useState(null);

  const { push } = useRouter();

  useEffect(() => {
    setSsImage(localStorage.getItem('image'));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/page').then((res) => {
      setPages(res.data.list);
    });
  }, [props.handleCreatePage]);

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

  return (
    <div className={styles.card_component}>
      {pages.map((page, index) => (
        <Card
          key={index}
          style={{ width: 260, margin: 15 }}
          cover={(
            <Image

              src={ssImage}
              // src="https://assets-global.website-files.com/5e57ba59552cf400c593fd16/5e7fbdeb3efd72446c9d54b7_5e7fbc1243a59ded3e14959c_placeholder.jpeg"
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
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={page.name}
            description={[<span>Slug: </span>, <span>
              /
              {page.slug}

                                               </span>]}
          />
        </Card>
      ))}
    </div>
  );
}

export default PageCard;
