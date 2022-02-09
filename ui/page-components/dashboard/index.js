import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  Drawer, Form, Input,
} from 'antd';

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const [visible, setVisible] = useState(false);

  const [pageDetails, setPageDetails] = useState({ name: '', slug: '' });

  const { push } = useRouter();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

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
    // e.preventDefault();
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
      {/* <form>
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
      </form> */}

      <ul>
        {slugs}
      </ul>
      <div />
      <Button type="primary" onClick={showDrawer}>
        New Page
      </Button>
      <Drawer title="Add New Page" placement="right" onClose={onClose} visible={visible}>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
            name="name"
            label="Name"
            value={pageDetails.name}
            onChange={(e) => setPageDetails({ ...pageDetails, name: e.target.value })}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Slug"
            value={pageDetails.slug}
            onChange={(e) => setPageDetails({ ...pageDetails, slug: e.target.value })}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" onClick={handleCreatePage}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
