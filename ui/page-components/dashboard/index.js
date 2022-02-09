import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card, Avatar } from 'antd';
import Link from 'next/link';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Item from 'antd/lib/list/Item';

const { Meta } = Card;

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });

  const { push } = useRouter();

  useEffect(() => {
    axios.get('http://localhost:8000/api/page').then((res) => {
      setPages(res.data.list);
    });
  }, []);

  const handleClick = (newSlug) => {
    push('/page-builder/[pageID]', `page-builder/${newSlug}`);
  };

  const handlePreview = (newSlug) => {
    push('/[pageView]', `/${newSlug}`);
  };

  const slugs = pages.map((page) => (
    <li
      key={page.slug}
      style={{
        display: 'flex', justifyContent: 'space-between', width: '50vw', border: '1px solid black', padding: '10px', margin: '5px', borderRadius: '10px',
      }}
    >
      <span>
        {page.name}
      </span>
      <Button onClick={() => { handleClick(page.slug); }} style={{ cursor: 'pointer' }} type="primary">Edit</Button>
      <Button onClick={() => { handlePreview(page.slug); }} style={{ cursor: 'pointer' }} type="primary">Preview</Button>
    </li>
  ));

  const handleCreatePage = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/createPage', pageDetails)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Error => ', err);
      });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="page"
          value={pageDetails.name}
          onChange={(e) => setPageDetails({ ...pageDetails, name: e.target.value })}
          style={{ padding: '5px 10px', fontSize: '18px' }}
          placeholder="Enter name of page"
        />

        <input
          type="text"
          name="slug"
          value={pageDetails.slug}
          onChange={(e) => setPageDetails({ ...pageDetails, slug: e.target.value })}
          style={{ padding: '5px 10px', fontSize: '18px' }}
          placeholder="Enter name of slug"
        />

        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }} onClick={handleCreatePage}>Create New Page</button>
      </form>

      <ul>
        {slugs}
      </ul>
      {pages.map((item, i) => (
        <div key={i}>
          <Card
            style={{ width: 300 }}
            cover={(
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
        )}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item.name}
              description={[<span>Slug: </span>, <span>{item.slug}</span>]}
            />
          </Card>
        </div>
      ))}

      <div />
    </div>
  );
}
